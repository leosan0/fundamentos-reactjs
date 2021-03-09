import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Insert from '../pages/Insert';
import DashboardPerMonth from '../pages/DashboardPerMonth';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/import" component={Import} />
    <Route path="/insert" component={Insert} />
    <Route path="/permonth" component={DashboardPerMonth} />
  </Switch>
);

export default Routes;
