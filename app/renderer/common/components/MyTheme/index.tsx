import React from 'react';
import './index.less';
import useThemeActionHooks from '@src/hooks/useThemeActionHooks';
import { useSelector } from 'react-redux';

function MyTheme() {
  const themeList = useSelector((state: any) => state.themeModel.themeList);
  const [currentTheme, setCurrentTheme] = useThemeActionHooks.useGetCurrentTheme();
  return (
    <div styleName="box">
      {themeList.length > 0 &&
        [...themeList].map((t: TSTheme.Item, index: number) => {
          return (
            <span
              key={index}
              style={{ backgroundColor: t.backgroundColor }}
              styleName={`${currentTheme.id === t.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentTheme && setCurrentTheme(t);
              }}
            />
          );
        })}
    </div>
  );
}

export default MyTheme;
