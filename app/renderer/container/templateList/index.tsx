import React from 'react';
import './index.less';
import Header from './Header';
import Navigation from './Navigation';
import StaticResume from './StaticResume';
import MyRectSize from '@common/components/MyRectSize';

function TemplateList() {
  const HEADER_HEIGHT = 76; // 距离头部距离
  const height = document.body.clientHeight;
  return (
    <div styleName="container">
      <Header />
      <div styleName="content">
        <MyRectSize>
          <MyRectSize.Left>
            <Navigation />
          </MyRectSize.Left>
          <MyRectSize.Right>
            <StaticResume />
          </MyRectSize.Right>
        </MyRectSize>
      </div>
    </div>
  );
}
export default TemplateList;
