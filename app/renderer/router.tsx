import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Root from '@src/container/root';
import Resume from '@src/container/resume';
import ROUTER from '@common/constants/router';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path={ROUTER.root} exact component={Root} />
        <Route path={ROUTER.resume} exact component={Resume} />
      </Switch>
      <Redirect to={ROUTER.root} />
    </HashRouter>
  );
}

export default Router;
