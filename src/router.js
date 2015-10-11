import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Application from './containers/application/application';
import NotFound from './components/notfound/notfound';

export default class AppRouter extends React.Component {
  render = () => {
    return (
      <Router>
        <Route path="/">
          <IndexRoute component={Application} />
        <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}
