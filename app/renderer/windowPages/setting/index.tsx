import React, { useEffect, useState } from 'react';
import './index.less';
import MyButton from '@common/components/MyButton';
import { ipcRenderer } from 'electron';
import { useReadGlobalConfigFile, useUpdateGlobalConfigFile } from '@src/hooks/useGlobalConfigActionHooks';
import { read } from 'original-fs';
import { getAppPath } from '@src/common/utils/appPath';

function Setting() {
  const [resumeSavePath, setResumeSavePath] = useState('');
  const readGlobalConfigFile = useReadGlobalConfigFile();
  const updateGlobalConfigFile = useUpdateGlobalConfigFile();

  useEffect(() => {
    readGlobalConfigFile().then((config: { [key: string]: any }) => {
      if (config?.resumeSavePath) {
        setResumeSavePath(config?.resumeSavePath);
      } else {
        getAppPath().then((appPath: string) => {
          const savePath = `${appPath}resumeCache`;
          setResumeSavePath(savePath);
          updateGlobalConfigFile('resumeSavePath', savePath);
        });
      }
    });
  }, []);

  const onChangePath = () => {
    ipcRenderer.send('open-save-resume-path', '');
    ipcRenderer.on('reply-save-resume-path', (event, arg: string[]) => {
      if (arg) {
        if (arg.length > 0) {
          setResumeSavePath(arg[0]);
          updateGlobalConfigFile('resumeSavePath', arg[0]);
        }
      } else {
        console.log('自定义存储路径失败');
      }
    });
  };

  const onSave = () => {};
  return (
    <div styleName="container">
      <p styleName="label">修改简历数据储存路径</p>
      <div styleName="input">
        <div styleName="value">{resumeSavePath || '当前存储路径为：'}</div>
        <div styleName="update-btn" onClick={onChangePath}>
          更改路径
        </div>
      </div>
    </div>
  );
}

export default Setting;
