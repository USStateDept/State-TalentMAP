import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { FlagsProvider } from 'flag';
import { StickyContainer } from 'react-sticky';
import { QueryParamProvider } from 'use-query-params';
import Routes from '../../Containers/Routes/Routes';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Glossary from '../../Containers/Glossary';
import AuthorizedWrapper from '../../Containers/AuthorizedWrapper';
import DarkMode from '../../Containers/DarkMode';
import checkIndexAuthentication from '../../lib/check-auth';
import { history, store } from '../../store';
import PageMeta from '../../Containers/PageMeta';
import Toast from '../Toast';
import getFlags from '../../flags';

const isAuthorized = () => checkIndexAuthentication(store);

const flags = () => getFlags();

const Main = props => (
  <StickyContainer>
    <FlagsProvider flags={flags()}>
      <Provider store={store} history={history}>
        <ConnectedRouter history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <ScrollContext>
              <div>
                <DarkMode />
                <PageMeta history={history} />
                <Header {...props} isAuthorized={isAuthorized} />
                <main id="main-content">
                  <Routes {...props} isAuthorized={isAuthorized} />
                </main>
                <Footer />
                <AuthorizedWrapper {...props} isAuthorized={isAuthorized}>
                  <Glossary />
                </AuthorizedWrapper>
                <Toast />
              </div>
            </ScrollContext>
          </QueryParamProvider>
        </ConnectedRouter>
      </Provider>
    </FlagsProvider>
  </StickyContainer>
);

export default Main;
