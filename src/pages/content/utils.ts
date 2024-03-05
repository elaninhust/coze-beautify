import { useEffect, useState } from 'react';

export const useUrlChange = function () {
  const [urlChangeCount, changeUrlChangeCount] = useState(Math.random());

  useEffect(() => {
    function handleStateChange() {
      changeUrlChangeCount(Math.random());
    }

    function routerChangeHandler() {
      changeUrlChangeCount(Math.random());
    }
    window.addEventListener('pushstate', handleStateChange, false);
    window.addEventListener('replacestate', handleStateChange, false);
    window.addEventListener('router-change', routerChangeHandler, false);
    return () => {
      window.removeEventListener('pushstate', handleStateChange);
      window.removeEventListener('replacestate', handleStateChange);
      window.removeEventListener('router-change', routerChangeHandler);
    };
  }, []);

  useEffect(() => {}, [urlChangeCount]);

  return urlChangeCount;
};
