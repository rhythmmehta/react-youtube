import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';
import Favorites from './containers/Favorites';
import SignUp from './containers/SignUp';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/favorites" component={Favorites}/>
     <Route path="/signUp" component={SignUp}/>
  </Switch>
);

export default Routes;
