import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import { WrappedLogin, WrappedRegister, SearchAccounts } from './routes';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={WrappedLogin} />
        <Route path="/register" exact component={WrappedRegister} />
        <Route path="/search-accounts" exact component={SearchAccounts} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
