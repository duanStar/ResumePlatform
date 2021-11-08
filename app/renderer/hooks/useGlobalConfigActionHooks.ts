import path from 'path';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';

/**
 * @description 读取全局配置文件的内容
 */
export function useReadGlobalConfigFile() {
  return () => {
    return new Promise((resolve: (values: { [key: string]: any }) => void, reject: (values: Error) => void) => {
      getAppPath().then((appPath: string) => {
        const jsonPath = path.join(appPath, 'appConfig/global.config.json');
        fileAction
          .hasFile(jsonPath)
          .then(async () => {
            const config = await fileAction.read(jsonPath, 'utf-8');
            resolve(JSON.parse(config));
          })
          .catch(() => {
            reject(new Error('appConfig does not exist !'));
          });
      });
    });
  };
}

/**
 * @description 读取配置文件的内容
 * @param {string} updateKey 键
 * @param {any} updateValues 值
 * @param {function} callback 回调函数
 */
export function useUpdateGlobalConfigFile() {
  const readGlobalConfigFile = useReadGlobalConfigFile();
  return (updateKey: string, updateValues: any, callback?: () => void) => {
    getAppPath().then((appPath: string) => {
      const jsonPath = path.join(appPath, 'appConfig/global.config.json');
      readGlobalConfigFile().then((config: { [key: string]: any }) => {
        const nextGlobalConfig = {
          ...config,
          [`${updateKey}`]: updateValues,
        };
        fileAction.canWrite(jsonPath).then(() => {
          fileAction.write(jsonPath, JSON.stringify(nextGlobalConfig), 'utf-8').then(() => {
            callback && callback();
          });
        });
      });
    });
  };
}
