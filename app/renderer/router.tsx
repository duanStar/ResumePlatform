import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Root from '@src/container/root';
import Resume from '@src/container/resume';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Root} />
        <Route path="/resume" exact component={Resume} />
      </Switch>
      <Redirect to="/" />
    </HashRouter>
  );
}

export default Router;
