import React from 'react';
import './index.less';
import classNames from 'classnames';
import { Position } from '@src/common/components/MyModal/types';

const MyMaskHoc =
  (WrappedComponent: React.ComponentType<any>) => (hocProps: { position?: Position; backgroundColor?: string }) => {
    return class extends React.Component {
      getProps() {
        return {
          ...this.props,
        };
      }
      render() {
        const position = hocProps ? hocProps?.position : 'center';
        const backgroundColor = hocProps ? hocProps?.backgroundColor : 'rgba(0, 0, 0, 0.78)';
        return (
          <div styleName="vis-mask" style={{ backgroundColor: backgroundColor }}>
            <div
              styleName={classNames({
                top: position === 'top',
                center: position === 'center',
                bottom: position === 'bottom',
              })}
            >
              <WrappedComponent {...this.getProps()} />
            </div>
          </div>
        );
      }
    };
  };

export default MyMaskHoc;
