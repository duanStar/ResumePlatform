import React, { useEffect, useState } from 'react';
import './index.less';
// 👇 引入简历模版
import * as UseTemplateList from './UseTemplate';
import MyScrollBox from '@common/components/MyScrollBox';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/messager';
import Personal from './UseForm/Personal';
import { RESUME_TOOLBAR_MAPS } from '@src/common/constants/resume';
import Skill from './UseForm/Skill';
import Certificate from './UseForm/Certificate';
import Contact from './UseForm/Contact';
import Education from './UseForm/Education';
import Work from './UseForm/Work';

function ResumeContent() {
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.body.clientHeight;

  const [formName, setFormName] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
    return () => {
      document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
    };
  }, []);

  const onReceive = (e: any) => {
    Messager.receive(e, (data: any) => {
      setShowFormModal(true);
      setFormName(data?.form_name);
    });
  };
  const onClose = () => {
    setShowFormModal(false);
    setFormName('');
  };

  return (
    <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
      <UseTemplateList.TemplateOne />
      {showFormModal && (
        <div>
          {formName === RESUME_TOOLBAR_MAPS.personal && <Personal onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.skill && <Skill onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.certificate && <Certificate onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.contact && <Contact onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.education && <Education onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workPrefer && <Work onClose={onClose} />}
        </div>
      )}
    </MyScrollBox>
  );
}
export default ResumeContent;
