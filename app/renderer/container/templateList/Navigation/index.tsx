import React from 'react';
import './index.less';
import UseIcon from '@assets/icon/use.png';
import TemplateCoverOne from '@assets/template/template1.jpg';
import TemplateCoverTwo from '@assets/template/template2.jpg';
import MyScrollBox from '@common/components/MyScrollBox';
import MyButton from '@common/components/MyButton';
import { useDispatch, useSelector } from 'react-redux';

function Navigation() {
  const height = document.body.clientHeight;
  const dispatch = useDispatch();
  const templateList: TSTemplate.Item[] = useSelector((state: any) => state.templateModel.templateList);
  const selectTemplate: TSTemplate.Item = useSelector((state: any) => state.templateModel.selectTemplate);

  const onChangeTemplate = (template: TSTemplate.Item) => {
    dispatch({
      type: 'templateModel/setStore',
      payload: {
        key: 'selectTemplate',
        values: template,
      },
    });
  };

  return (
    <div styleName="navigation">
      <MyScrollBox maxHeight={height - 60 - 32}>
        {templateList &&
          templateList.length > 0 &&
          templateList.map((template) => {
            return (
              <div styleName="template" key={template?.templateId}>
                <img styleName="cover" src={template?.templateCover} />
                <div styleName="mask">
                  {selectTemplate?.templateId === template?.templateId && <img styleName="use" src={UseIcon} />}
                  {selectTemplate?.templateId !== template?.templateId && (
                    <MyButton
                      size="middle"
                      className="view-btn"
                      onClick={() => {
                        onChangeTemplate(template);
                      }}
                    >
                      预览模版
                    </MyButton>
                  )}
                </div>
              </div>
            );
          })}
      </MyScrollBox>
    </div>
  );
}

export default Navigation;
