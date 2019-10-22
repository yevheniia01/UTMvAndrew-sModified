import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main as MainLayout } from './layouts';
import { RouteWithLayout } from './components';
import { UTMForm } from './components';

const routes = (
  <Switch>
    <RouteWithLayout
      component={UTMForm}
      exact
      path='/'
      layout={MainLayout}
    />
  </Switch>
)

export { routes };