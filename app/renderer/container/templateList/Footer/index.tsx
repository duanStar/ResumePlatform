import React from 'react';
import './index.less';
import MyButton from '@common/components/MyButton';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { compilePath } from '@src/common/utils/router';
import ROUTER, { ROUTER_KEY } from '@src/common/constants/router';

function Footer() {
  const history = useHistory();
  const selectTemplate = useSelector((state: any) => state.templateModel.selectTemplate);

  const onMadeResume = () => {
    history.push(
      compilePath(ROUTER.resume, {
        fromPath: ROUTER_KEY.templateList,
        templateId: selectTemplate?.templateId,
        templateIndex: selectTemplate?.templateIndex,
      })
    );
  };
  return (
    <div styleName="footer">
      <MyButton size="middle" className="use-btn" onClick={onMadeResume}>
        以此模版前往制作简历
      </MyButton>
    </div>
  );
}

export default Footer;
