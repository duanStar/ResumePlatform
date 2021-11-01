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
