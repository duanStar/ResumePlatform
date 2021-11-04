/**
 * @desc 头像
 * @author pengdaokuan
 */
import React from 'react';
import './index.less';
import AvatarImage from '@assets/avatar.jpg';
import useUpdateResumeHook from '@src/container/resume/ResumeContent/useUpdateResumeHook';
import { useSelector } from 'react-redux';
import ImageUpload from '@src/common/components/MyUpload/ImageUpload';
import UploadIcon from '@assets/icon/upload.png';

function Avatar() {
  const updateResumeHook = useUpdateResumeHook();
  const base: TSResume.Base = useSelector((state: any) => state.resumeModel.base);
  const onUpdateUserAvatar = (avatarUrl: string) => {
    updateResumeHook<string>('base/avatar', avatarUrl);
  };

  return (
    <div styleName="box">
      {!base?.avatar && (
        <ImageUpload
          icon={UploadIcon}
          accept="image/*"
          multiple={false}
          onAfterChange={(files: TSUpload.File[]) => {
            onUpdateUserAvatar(files[0]?.base64URL);
          }}
        />
      )}
      {base?.avatar && (
        <div styleName="avatar">
          <img src={AvatarImage} />
        </div>
      )}
    </div>
  );
}

export default Avatar;
