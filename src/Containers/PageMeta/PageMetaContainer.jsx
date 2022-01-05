import { Component } from 'react';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import PageTitle from '../../Components/PageTitle';
import routes from '../../routes';
import { focusById, getApplicationPath, getAssetPath } from '../../utilities';
import getBestMatchPath from './helpers';

class PageMetaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { pageTitle: null };
  }

  UNSAFE_componentWillMount() {
    this.getPageTitle();
  }

  // Determine the route's page title and set it to state
  setPageTitle(historyObject) {
    const matchedPath = getBestMatchPath(routes, historyObject);
    if (matchedPath && matchedPath.pageTitle) {
      this.setState({ pageTitle: matchedPath.pageTitle });
    }
  }

  getPageTitle() {
    const { history } = this.props;

    // perform once on mount
    this.setPageTitle(history.location);
    focusById('page-title');

    // listen for changes in history
    history.listen((historyObject) => {
      focusById('page-title');
      this.setPageTitle(historyObject);
    });
  }

  render() {
    return (
      (this.state.pageTitle != null) ?
        <div>
          <PageTitle pageTitle={this.state.pageTitle} srOnly />
          <Helmet titleTemplate="%s - TalentMAP" defaultTitle="TalentMAP">
            <title tabIndex="-1">{this.state.pageTitle}</title>
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
  history: HISTORY_OBJECT.isRequired,
};

export default withRouter(PageMetaContainer);
