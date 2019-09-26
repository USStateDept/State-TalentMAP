import React from 'react';
import Home from '../../Containers/Home/Home';
import Profile from '../../Containers/Profile/Profile';
import Results from '../../Containers/Results/Results';
import Position from '../../Containers/Position/Position';
import Login from '../../login';
import LoginRedirect from '../../Containers/LoginRedirect';
import Compare from '../../Containers/Compare/Compare';
import About from '../../Containers/About';
import RoutesArray from '../../routes';
import TokenValidation from '../../login/Components/TokenValidation';

const Components = {
  Home,
  Profile,
  Results,
  Position,
  Login,
  LoginRedirect,
  About,
  Compare,
  TokenValidation,
};

const mappedRoutesArray = RoutesArray.map((Route) => {
  const Component = Components[Route.componentName];
  const props$ = Route.props || {};
  return { ...Route,
    component: props =>
      <Component {...props} {...props$} />,
  };
});

export default mappedRoutesArray;
