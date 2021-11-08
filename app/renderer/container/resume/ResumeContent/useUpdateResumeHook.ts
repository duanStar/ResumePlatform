import { useDispatch, useSelector } from 'react-redux';
import { AdapterExperienceType } from './UseForm/WrapperExperience/adapter';

const useUpdateResumeHook = () => {
  const updatePersonalHook = useUpdatePersonalHook();
  const updateContactHook = useUpdateContactHook();
  const updateWorkHook = useUpdateWorkHook();
  const updateEvaluationHook = useUpdateEvaluationHook();
  const updateHobbyHook = useUpdateHobbyHook();
  const updateCertificateHook = useUpdateCertificateHook();
  const updateSkillHook = useUpdateSkillHook();
  const updateProjectExperience = useUpdateProjectExperience();
  const updateSchoolExperience = useUpdateSchoolExperience();
  const updateWorkExperience = useUpdateWorkExperience();

  return <T>(stateKey: string, stateValue: T) => {
    const keys = stateKey.split('/');
    if (keys[0]) {
      if (keys[0] === 'base') updatePersonalHook(keys[1], stateValue);
      if (keys[0] === 'contact') updateContactHook(keys[1], stateValue);
      if (keys[0] === 'work') updateWorkHook(keys[1], stateValue);
      if (keys[0] === 'evaluation') updateEvaluationHook(keys[1], stateValue);
      if (keys[0] === 'hobby') updateHobbyHook(keys[1], stateValue);
      if (keys[0] === 'certificate') updateCertificateHook(keys[1], stateValue);
      if (keys[0] === 'skill') updateSkillHook(keys[0], stateValue);
      if (keys[0] === 'projectExperience') updateProjectExperience(keys[0], stateValue);
      if (keys[0] === 'schoolExperience') updateSchoolExperience(keys[0], stateValue);
      if (keys[0] === 'workExperience') updateWorkExperience(keys[0], stateValue);
    }
  };
};

const useUpdatePersonalHook = () => {
  const dispatch = useDispatch();
  const base = useSelector((state: any) => state.resumeModel.base);
  return <T>(stateKey: string, stateValue: T) => {
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: 'base',
        values: {
          ...base,
          [stateKey]: stateValue,
        },
      },
    });
  };
};

const useUpdateContactHook = () => {
  const dispatch = useDispatch();
  const contact = useSelector((state: any) => state.resumeModel.contact);
  return <T>(stateKey: string, stateValue: T) => {
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: 'contact',
        values: {
          ...contact,
          [stateKey]: stateValue,
        },
      },
    });
  };
};

const useUpdateWorkHook = () => {
  const dispatch = useDispatch();
  const work = useSelector((state: any) => state.resumeModel.work);
  return <T>(stateKey: string, stateValue: T) => {
    let cityList = work?.cityList ? [...work.cityList] : [];
    if (stateKey === 'city') {
      cityList = (stateValue as any).split('｜');
    }
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: 'work',
        values: {
          ...work,
          cityList,
          [stateKey]: stateValue,
        },
      },
    });
  };
};

const useUpdateEvaluationHook = () => {
  const dispatch = useDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    const evaluationList = stateValue ? (stateValue as any).split('｜') : [];
    dispatch({
      type: 'resumeModel/setStoreList',
      payload: {
        key: 'evaluation',
        values: [
          {
            key: stateKey,
            values: stateValue,
          },
          {
            key: 'evaluationList',
            values: evaluationList,
          },
        ],
      },
    });
  };
};

const useUpdateHobbyHook = () => {
  const dispatch = useDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: 'hobby',
        values: stateValue,
      },
    });
  };
};

const useUpdateCertificateHook = () => {
  const dispatch = useDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    let certificateList = stateValue ? (stateValue as any).split('|') : [];
    dispatch({
      type: 'resumeModel/setStoreList',
      payload: [
        {
          key: 'certificateList',
          values: certificateList,
        },
        {
          key: stateKey,
          values: stateValue,
        },
      ],
    });
  };
};

const useUpdateSkillHook = () => {
  const dispatch = useDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    let skillList = stateValue ? (stateValue as any).split('|') : [];
    dispatch({
      type: 'resumeModel/setStoreList',
      payload: [
        {
          key: stateKey,
          values: stateValue,
        },
        {
          key: 'skillList',
          values: skillList,
        },
      ],
    });
  };
};

const useUpdateProjectExperience = () => {
  const dispatch = useDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    let newList = (stateValue as any)?.map((s: AdapterExperienceType) => {
      let parseContent = s.content ? s.content.split('｜') : [];
      return {
        ...s,
        projectName: s?.title,
        parseContent,
      };
    });
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: stateKey,
        values: newList,
      },
    });
  };
};

const useUpdateSchoolExperience = () => {
  const dispatch = useDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    let newList = (stateValue as any)?.map((s: AdapterExperienceType) => {
      let parseContent = s.content ? s.content.split('｜') : [];
      return {
        ...s,
        department: s?.title,
        parseContent,
      };
    });
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: stateKey,
        values: newList,
      },
    });
  };
};

const useUpdateWorkExperience = () => {
  const dispatch = useDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    let newList = (stateValue as any)?.map((s: AdapterExperienceType) => {
      let parseContent = s.content ? s.content.split('｜') : [];
      return {
        ...s,
        department: s?.title,
        parseContent,
      };
    });
    dispatch({
      type: 'resumeModel/setStore',
      payload: {
        key: stateKey,
        values: newList,
      },
    });
  };
};

export default useUpdateResumeHook;
