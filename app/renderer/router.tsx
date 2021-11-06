import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Root from '@src/container/root';
import Resume from '@src/container/resume';
import TemplateList from '@src/container/templateList';
import ROUTER from '@common/constants/router';
import useReadDirAssetsTemplateHooks from './hooks/useReadDirAssetsTemplateHooks';

function Router() {
  const readDirAssetsTemplateHooks = useReadDirAssetsTemplateHooks();

  useEffect(() => {
    readDirAssetsTemplateHooks();
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route path={ROUTER.root} exact component={Root} />
        <Route path={ROUTER.resume} exact component={Resume} />
        <Route path={ROUTER.templateList} exact component={TemplateList} />
      </Switch>
      <Redirect to={ROUTER.root} />
    </HashRouter>
  );
}

export default Router;
