import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main as MainLayout } from './layouts';
import { MainForStylingScreen} from './layouts'
import { RouteWithLayout } from './components';
import { UTMForm } from './components';
import { UTMStylingScreen } from './components'

const routes = (
  <Switch>
    <RouteWithLayout
      component={UTMForm}
      exact
      path='/'
      layout={MainLayout}
    />
    <RouteWithLayout
      component={UTMStylingScreen}
      exact
      path='/style'
      layout={MainForStylingScreen}
      
    />
  </Switch>
)

export { routes };