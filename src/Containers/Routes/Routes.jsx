import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'Components/ErrorBoundary';
import mappedRoutesArray from './RoutesMap';
import NotFound from '../../Components/NotFound404';

const Routes = props => (
  <Switch {...props}>
    {
      mappedRoutesArray.map(route => (
        <Route
          key={route.key || route.path}
          exact={route.exact}
          path={route.path}
          component={() => <ErrorBoundary>{route.component(props)}</ErrorBoundary>}
        />
      ))
    }
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
