import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import AppView from './views/App';
import HomeView from './views/home';

export default (
  <Route path="/" component={AppView}>
    <IndexRoute component={HomeView} />
  </Route>
);
