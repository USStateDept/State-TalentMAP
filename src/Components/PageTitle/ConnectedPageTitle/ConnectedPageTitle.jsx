import React from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import PageTitle from '../PageTitle';
import routes from '../../../routes';

class ConnectedPageTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pageTitle: null };
  }

  componentWillMount() {
    this.getPageTitle();
  }

  getPageTitle() {
    const { history } = this.props;

    // listen for changes in history
    history.listen((historyObject) => {
      // loop through routes
      routes.forEach((route) => {
        if (matchPath(historyObject.pathname, { path: route.path, exact: false })) {
          // set pageTitle if it exists
          if (route.pageTitle) {
            this.setState({ pageTitle: route.pageTitle });
          }
        }
      });
    });
  }

  render() {
    return (
      (this.state.pageTitle != null) ?
        <PageTitle pageTitle={this.state.pageTitle} srOnly />
      :
        null
    );
  }
}

ConnectedPageTitle.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
const connected = withRouter(ConnectedPageTitle);

export default connected;
