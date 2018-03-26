import React from 'react';
import Home from '../../Containers/Home/Home';
import Profile from '../../Containers/Profile/Profile';
import Results from '../../Containers/Results/Results';
import Position from '../../Containers/Position/Position';
import Login from '../../login';
import Compare from '../../Containers/Compare/Compare';
import RoutesArray from '../../routes';

const Components = { Home, Profile, Results, Position, Login, Compare };

const mappedRoutesArray = RoutesArray.map((Route) => {
  const Component = Components[Route.componentName];
  return { ...Route,
    component: (props, pageTitle) =>
      <Component {...props} pageTitle={pageTitle} />,
  };
});

export default mappedRoutesArray;
