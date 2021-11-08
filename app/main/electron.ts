/**
 * @description Electron主入口
 */

import path from 'path';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';

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
  });

  const settingWindow = new BrowserWindow({
    width: 720,
    height: 240,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
  });
  if (isDev()) {
    mainWindow.loadURL(`http://127.0.0.1:7001`);
    settingWindow.loadURL(`http://127.0.0.1:7001/setting.html`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    settingWindow.loadURL(`file//${path.join(__dirname, '../dist/setting.html')}`);
  }
  mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
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
