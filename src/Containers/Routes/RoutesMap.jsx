import Home from '../../Containers/Home/Home';
import Profile from '../../Containers/Profile';
import Results from '../../Containers/Results/Results';
import Position from '../../Containers/Position';
import Login from '../../login';
import Logout from '../../login/Components/Logout';
import LoginRedirect from '../../Containers/LoginRedirect';
import Compare from '../../Containers/Compare/Compare';
import About from '../../Containers/About';
import RoutesArray from '../../routes';
import TokenValidation from '../../login/Components/TokenValidation';
import Faq from '../../Components/Faq';

const Components = {
  Home,
  Profile,
  Results,
  Position,
  Login,
  Logout,
  LoginRedirect,
  About,
  Compare,
  TokenValidation,
  Faq,
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
