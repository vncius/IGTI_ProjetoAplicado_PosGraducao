import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './Content/App.css'
import Login from './Components/Login'
import Cadastro from './Components/Cadastro'
import RecuperarSenha from './Components/RecuperarSenha'
import Principal from './Components/Principal'
import { isAutheticated } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAutheticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  )} />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={() => <Principal />} />
      <Route path="/login" component={() => <Login />} />
      <Route path="/cadastro" component={() => <Cadastro />} />
      <Route path="/recuperar-senha" component={() => <RecuperarSenha />} />
      <Route path="/logout" >
        <Redirect to={{ pathname: '/login' }} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;