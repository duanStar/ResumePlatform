/**
 * @description 编辑简历-工具条模块
 */
import React, { useEffect, useState } from 'react';
import './index.less';
import MyScrollBox from '@common/components/MyScrollBox';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import { onAddToolbar, onDeleteToolbar } from './utils';
import { useDispatch } from 'react-redux';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/messager';

function ResumeToolbar() {
  const height = document.body.clientHeight;
  const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>([]);
  const [unAddToolbarList, setUnAddToolbarList] = useState<TSResume.SliderItem[]>([]);
  const dispatch = useDispatch();

  const changeResumeToolbarKeys = (moduleKeys: string[]) => {
    if (moduleKeys.length > 0) {
      dispatch({
        type: 'templateModel/setStore',
        payload: {
          key: 'resumeToolbarKeys',
          values: moduleKeys,
        },
      });
    }
  };

  const onAddSliderAction = (moduleBar: TSResume.SliderItem) => {
    const nextAddToolbarList = onAddToolbar(addToolbarList, moduleBar);
    setAddToolbarList(nextAddToolbarList);
    const nextUnAddToolbarList = onDeleteToolbar(unAddToolbarList, moduleBar);
    setUnAddToolbarList(nextUnAddToolbarList);
    changeResumeToolbarKeys(nextAddToolbarList.map((item) => item.key));
  };

  const onDeleteSliderAction = (moduleBar: TSResume.SliderItem) => {
    const nextUnAddToolbarList = onAddToolbar(unAddToolbarList, moduleBar);
    setUnAddToolbarList(nextUnAddToolbarList);
    const nextAddToolbarList = onDeleteToolbar(addToolbarList, moduleBar);
    setAddToolbarList(nextAddToolbarList);
    changeResumeToolbarKeys(nextAddToolbarList.map((item) => item.key));
  };

  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      let _addToolbarList: TSResume.SliderItem[] = [];
      let _unAddToolbarList: TSResume.SliderItem[] = [];
      RESUME_TOOLBAR_LIST.forEach((item) => {
        if (item.require) {
          _addToolbarList.push(item);
        } else {
          _unAddToolbarList.push(item);
        }
      });
      setAddToolbarList(_addToolbarList);
      setUnAddToolbarList(_unAddToolbarList);
      changeResumeToolbarKeys(_addToolbarList.map((item) => item.key));
    }
  }, []);
  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        <div styleName="module">
          <div styleName="title">
            <span styleName="line" />
            已添加模块
          </div>
          <div styleName="content">
            {addToolbarList.map((toolbar: TSResume.SliderItem) => {
              return (
                <div
                  styleName="box"
                  key={toolbar.key}
                  onClick={() => {
                    Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, {
                      form_name: toolbar.key,
                    });
                  }}
                >
                  <div styleName="info">
                    <i styleName="icon" />
                    <div styleName="text">
                      <div styleName="name">{toolbar.name}</div>
                      <div styleName="summary">{toolbar.summary}</div>
                    </div>
                    {toolbar.require && <div styleName="tips">必选项</div>}
                    {!toolbar.require && (
                      <div styleName="action">
                        <i styleName="edit" onClick={(e: React.MouseEvent) => {}} />
                        <i
                          styleName="delete"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation && e.stopPropagation();
                            onDeleteSliderAction(toolbar);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {!!unAddToolbarList.length && (
          <div styleName="module">
            <div styleName="title">
              <span styleName="line" />
              未添加模块
            </div>
            <div styleName="content">
              {unAddToolbarList.map((toolbar: TSResume.SliderItem) => {
                return (
                  <div styleName="box" key={toolbar.key} onClick={() => onAddSliderAction(toolbar)}>
                    <div
                      styleName="info"
                      onClick={() => {
                        onAddSliderAction(toolbar);
                      }}
                    >
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{toolbar.name}</div>
                        <div styleName="summary">{toolbar.summary}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </MyScrollBox>
    </div>
  );
}

export default ResumeToolbar;
