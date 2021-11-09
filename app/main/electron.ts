/**
 * @description Electron主入口
 */

import path from 'path';
import { app, BrowserWindow, ipcMain, dialog, Menu, globalShortcut } from 'electron';
import customMenu from './customMenu';

export interface MyBrowserWindow extends BrowserWindow {
  uid?: string;
}

function isDev() {
  return process.env.NODE_ENV === 'development';
}
const ROOT_PATH = path.join(app.getAppPath(), '../');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
    show: false,
  });

  const settingWindow: MyBrowserWindow = new BrowserWindow({
    width: 720,
    height: 240,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
    show: false,
    frame: false,
  });
  settingWindow.uid = 'settingWindow';

  ipcMain.on('Electron:SettingWindow-hide-event', () => {
    // https://www.electronjs.org/docs/api/browser-window#winisvisible
    if (settingWindow.isVisible()) {
      settingWindow.hide();
    }
  });
  ipcMain.on('Electron:SettingWindow-min-event', () => {
    // https://www.electronjs.org/docs/api/browser-window#winisminimized
    if (settingWindow.isVisible()) {
      settingWindow.minimize();
    }
  });

  if (isDev()) {
    mainWindow.loadURL(`http://127.0.0.1:7001`);
    settingWindow.loadURL(`http://127.0.0.1:7001/setting.html`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    settingWindow.loadURL(`file//${path.join(__dirname, '../dist/setting.html')}`);
  }
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.on('close', () => {
    settingWindow.close();
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  const menu = Menu.buildFromTemplate(customMenu);
  Menu.setApplicationMenu(menu);
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('get-root-path', (event, arg) => {
  event.reply('reply-root-path', ROOT_PATH);
});

ipcMain.on('open-save-resume-path', (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((result) => {
      event.reply('reply-save-resume-path', result.filePaths);
    })
    .catch((err) => {
      event.reply('reply-save-resume-path', err);
    });
});
