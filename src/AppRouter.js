import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import history from './router/history';
import App from './App';
import User from './userDeshboard'
import login from './login'
import PrivateRoute  from './privateRoute';
import Login from './login';
import PublicRoute from './publicRoute';
import AdminDeshboard from './adminDeshboard';
import AdminUserTask from './adminuserTasks'
import dragDrop from './drag&drop'
const AppRouter = () => (
  <BrowserRouter history={history}>
    <div className="container" style={{maxWidth:"855px"}}>
      <div className="main-content">
      {localStorage.getItem('UserRole') == 'admin' ? <>
        <Switch>
          <Route exact  path="/" component={AdminDeshboard} exact={true} />
          <Route exact  path="/user-tasks/:id" component={AdminUserTask} exact={true} />
        </Switch></>:
        <>
        <Switch>
        <PublicRoute restricted={false} exact path="/" component={Login} />
        <PublicRoute restricted={false} exact path="/registration" component={App} />
        <PrivateRoute role='user' restricted={false} exact path="/user-deshboard" component={User} />
        <PrivateRoute role='user' restricted={false} exact path="/drag-drop" component={dragDrop} />
        </Switch></>}
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;