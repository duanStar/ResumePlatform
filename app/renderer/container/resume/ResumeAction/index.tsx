import React, { useEffect, useState } from 'react';
import './index.less';
import { useHistory, useParams } from 'react-router';
import ROUTER, { ROUTER_KEY } from '@common/constants/router';
import MyButton from '@common/components/MyButton';
import { toPrintPdf } from '@common/utils/htmlToPdf';
import { useSelector } from 'react-redux';
import { useReadGlobalConfigFile, useUpdateGlobalConfigFile } from '@src/hooks/useGlobalConfigActionHooks';
import { getUserStoreDataPath } from '@src/common/utils/appPath';
import MyModal from '@src/common/components/MyModal';
import { createUID } from '@src/common/utils';
import fileAction from '@src/common/utils/file';
import { intToDateString } from '@src/common/utils/time';
import { compilePath } from '@src/common/utils/router';
import useClickAway from '@src/hooks/useClickAway';

function ResumeAction() {
  const { ref, componentVisible, setComponentVisible } = useClickAway(false);
  const history = useHistory();
  const base: TSResume.Base = useSelector((state: any) => state.resumeModel.base);
  const work: TSResume.Work = useSelector((state: any) => state.resumeModel.work);
  const resume = useSelector((state: any) => state.resumeModel);
  const routerParams =
    useParams<{
      fromPath: string;
      templateId: string;
      templateIndex: string;
    }>();

  const readGlobalConfigFile = useReadGlobalConfigFile();
  const updateGlobalConfigFile = useUpdateGlobalConfigFile();
  // 返回首页
  const onBack = () => {
    if (routerParams?.fromPath === ROUTER_KEY.root) {
      history.push(compilePath(ROUTER.root));
    } else if (routerParams?.fromPath === ROUTER_KEY.templateList) {
      history.push(compilePath(ROUTER.templateList));
    } else {
      console.log('here');
    }
  };
  // 导出PDF
  const exportPdf = () => {
    toPrintPdf(`${base?.username}+${base?.school}+${work?.job}`);
    readGlobalConfigFile().then((config: { [key: string]: any }) => {
      if (config?.resumeSavePath) {
        saveResumeJson(config?.resumeSavePath);
      } else {
        getUserStoreDataPath().then((appPath: string) => {
          const savePath = `${appPath}resumeCache`;
          saveResumeJson(savePath);
          updateGlobalConfigFile('resumeSavePath', savePath);
        });
      }
    });
    setComponentVisible(false);
  };

  const saveResumeJson = (path: string) => {
    const date = intToDateString(new Date().valueOf(), '_');
    const prefix = `${date}_${base?.username}_${base?.school}_${work?.job}_${createUID()}.json`;
    if (fileAction.exits(path)) {
      fileAction?.write(`${path}/${prefix}`, JSON.stringify(resume), 'utf-8');
    } else {
      fileAction
        ?.mkdirDir(path)
        .then(() => {
          fileAction.write(`${path}/${prefix}`, JSON.stringify(resume), 'utf-8');
        })
        .catch(() => {
          console.log('创建文件夹失败');
        });
    }
  };

  return (
    <div styleName="actions">
      <div styleName="back" onClick={onBack}>
        返回
      </div>
      <MyButton
        size="middle"
        className="export-btn"
        onClick={(e: React.MouseEvent) => {
          e.nativeEvent.stopPropagation();
          e.stopPropagation();
          setComponentVisible(true);
        }}
      >
        导出PDF
      </MyButton>
      {componentVisible && (
        <MyModal.Confirm
          eleRef={ref}
          title="确定要打印简历吗？"
          description="请确保信息的正确，目前仅支持单页打印哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: () => setComponentVisible(false),
            },
            submitBtn: {
              isShow: true,
              callback: exportPdf,
            },
          }}
        />
      )}
    </div>
  );
}

export default ResumeAction;
