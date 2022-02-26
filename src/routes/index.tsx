import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Insert from '../pages/Insert';
import DashboardPerMonth from '../pages/DashboardPerMonth';
import DashboardPerMonthTabs from '../pages/DashboardPerMonthTabs';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/import" component={Import} />
    <Route path="/insert" component={Insert} />
    <Route path="/permonth" component={DashboardPerMonth} />
    <Route path="/permonthtabs" component={DashboardPerMonthTabs} />
  </Switch>
);

export default Routes;
