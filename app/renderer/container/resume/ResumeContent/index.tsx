import React, { useEffect, useState } from 'react';
import './index.less';
// ๐ ๅผๅฅ็ฎๅๆจก็
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
import Evaluation from './UseForm/Evaluation';
import WorkExperience from './UseForm/WorkExperience';
import ProjectExperience from './UseForm/ProjectExperience';
import SchoolExperience from './UseForm/SchoolExperience';
import { useParams } from 'react-router';

function ResumeContent() {
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.documentElement.clientHeight;

  const routeParams =
    useParams<{
      fromPath: string;
      templateId: string;
      templateIndex: string;
    }>();

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
      {routeParams?.templateId && Number(routeParams?.templateIndex) === 0 && <UseTemplateList.TemplateOne />}
      {showFormModal && (
        <div>
          {formName === RESUME_TOOLBAR_MAPS.personal && <Personal onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.skill && <Skill onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.certificate && <Certificate onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.contact && <Contact onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.education && <Education onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.evaluation && <Evaluation onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workExperience && <WorkExperience onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.projectExperience && <ProjectExperience onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.schoolExperience && <SchoolExperience onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workPrefer && <Work onClose={onClose} />}
        </div>
      )}
    </MyScrollBox>
  );
}
export default ResumeContent;
