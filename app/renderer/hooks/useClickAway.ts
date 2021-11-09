import { useRef, useState, useEffect } from 'react';

/**
 * @description 点击元素之外区域关闭
 */
function useClickAway(initIsVisible: boolean) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [componentVisible, setComponentVisible] = useState(initIsVisible);

  const onClickOutside = (e: any) => {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    setComponentVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  });

  return { ref, componentVisible, setComponentVisible };
}

export default useClickAway;
