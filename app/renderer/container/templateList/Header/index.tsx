import React from 'react';
import './index.less';
import { useHistory } from 'react-router-dom';
import { compilePath } from '@src/common/utils/router';

function Header() {
  const history = useHistory();
  const goBack = () => history.push(compilePath('/'));
  return (
    <div styleName="header">
      <div styleName="back" onClick={goBack}>
        返回
      </div>
      <p styleName="title">简历模版仓库</p>
    </div>
  );
}
export default Header;
