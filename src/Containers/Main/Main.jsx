import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../../Containers/Routes/Routes';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Glossary from '../../Containers/Glossary';
import Feedback from '../../Containers/Feedback';
import FeedbackButton from '../../Containers/FeedbackButton';
import AuthorizedWrapper from '../../Containers/AuthorizedWrapper';
import checkIndexAuthorization from '../../lib/check-auth';
import { store, history } from '../../store';
import PageMeta from '../../Containers/PageMeta';

const isAuthorized = () => checkIndexAuthorization(store);

const Main = props => (
  <Provider store={store} history={history}>
    <ConnectedRouter history={history}>
      <div>
        <PageMeta history={history} />
        <Header {...props} isAuthorized={isAuthorized} />
        <main id="main-content">
          <Routes {...props} isAuthorized={isAuthorized} />
        </main>
        <Footer />
        <AuthorizedWrapper {...props} isAuthorized={isAuthorized}>
          <Glossary />
          <Feedback />
          <FeedbackButton />
        </AuthorizedWrapper>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default Main;
