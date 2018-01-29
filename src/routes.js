import Home from './Containers/Home/Home';
import Profile from './Containers/Profile/Profile';
import Results from './Containers/Results/Results';
import Position from './Containers/Position/Position';
import Post from './Containers/Post/Post';
import Login from './login';
import Compare from './Containers/Compare/Compare';
import NotFound from './Components/NotFound/NotFound';

export default function routes() {
  return {
    indexRoute: {
      component: Home,
    },
    childRoutes: [
        { path: '/login', component: Login },
        { path: '/results', component: Results },
    ],
  };
}
