import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './helpers/auth/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import Movies from './components/Movies';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/movies" exact component={Movies} />
        <PrivateRoute path="/add/movie" exact component={AddMovie} />
        <PrivateRoute path="/edit/movie/:movieId" exact component={EditMovie} />
      </Switch>
    </Router>
  );
};

export default Routes;
