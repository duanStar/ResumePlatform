import { ipcRenderer } from 'electron';

export function getAppPath() {
  return new Promise((resolve: (val: string) => void, reject: (val: Error) => void) => {
    ipcRenderer.send('get-root-path', '');
    ipcRenderer.on('reply-root-path', (event, arg: string) => {
      if (arg) {
        resolve(arg);
      } else {
        reject(new Error('项目路径错误'));
      }
    });
  });
}

/**
 * @description 获取应用 useData 路径
 * @returns {Promise<string>}
 */
export function getUserStoreDataPath(): Promise<string> {
  return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {
    ipcRenderer.send('Electron:get-userData-path', '');
    ipcRenderer.on('Electron:reply-userData-path', (event, arg: string) => {
      if (arg) {
        resolve(arg);
      } else {
        reject(new Error('项目路径错误'));
      }
    });
  });
}
