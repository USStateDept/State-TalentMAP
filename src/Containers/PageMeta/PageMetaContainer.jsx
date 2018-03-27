import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import Helmet from 'react-helmet';
import PageTitle from '../../Components/PageTitle';
import routes from '../../routes';
import { getApplicationPath, getAssetPath } from '../../utilities';

class PageMetaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { pageTitle: null };
  }

  componentWillMount() {
    this.getPageTitle();
  }

  setPageTitle(historyObject) {
    // loop through routes
    routes.forEach((route) => {
      if (matchPath(historyObject.pathname, { path: route.path, exact: false })) {
        // set pageTitle if it exists
        if (route.pageTitle) {
          this.setState({ pageTitle: route.pageTitle });
        }
      }
    });
  }

  getPageTitle() {
    const { history } = this.props;

    // perform once on mount
    this.setPageTitle(history.location);

    // listen for changes in history
    history.listen((historyObject) => {
      this.setPageTitle(historyObject);
    });
  }

  render() {
    return (
      (this.state.pageTitle != null) ?
        <div>
          <PageTitle pageTitle={this.state.pageTitle} srOnly />
          <Helmet titleTemplate="%s - TalentMAP" defaultTitle="TalentMAP">
            <title>{this.state.pageTitle}</title>
            <meta property="og:title" content={this.state.pageTitle} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={`${getApplicationPath()}${getAssetPath('/assets/logos/png/logo_color.png')}`} />
          </Helmet>
        </div>
      :
        null
    );
  }
}

PageMetaContainer.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(PageMetaContainer);
