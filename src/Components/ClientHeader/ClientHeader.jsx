import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FA from 'react-fontawesome';
import { BIDDER_OBJECT } from '../../Constants/PropTypes';
import { unsetClient } from '../../actions/clientView';
import { isCurrentPath } from '../ProfileMenu/navigation';

export const ID = 'client-header';

export class ClientHeader extends Component {
  constructor(props) {
    super(props);
    this.unsetClient = this.unsetClient.bind(this);
    this.state = {
      showReturnLink: true,
      useResultsExitFunction: false,
    };
  }

  componentWillMount() {
    this.checkPath();
  }

  setExitAction(historyObject) {
    // hide if on the public profile
    const pathMatches = isCurrentPath('/results', historyObject.pathname);
    this.setState({ useResultsExitFunction: pathMatches });
  }

  unsetClient() {
    const { history } = this.props;
    const { useResultsExitFunction } = this.state;
    this.props.unset();

    if (useResultsExitFunction) {
      history.push('/results');
    }
  }

  matchCurrentPath(historyObject) {
    // hide if on the public profile
    const pathMatches = isCurrentPath('/profile/public/:id', historyObject.pathname);
    this.setState({
      showReturnLink: !pathMatches,
    });
  }

  checkPath() {
    const { history } = this.props;
    history.listen((historyObject) => {
      this.matchCurrentPath(historyObject);
      this.setExitAction(historyObject);
    });
  }

  render() {
    const { showReturnLink } = this.state;
    const { client, isLoading, hasErrored } = this.props;
    const name = client && client.name ? client.name : 'Unknown user';

    const isSuccess = client && !!client.perdet_seq_number && !isLoading && !hasErrored;

    const renderHeader = () => (
      <div className="usa-banner client-header">
        <div className="usa-grid usa-banner-inner">
          <div className={!showReturnLink ? 'hidden' : ''}>
            <Link to={`/profile/public/${client.perdet_seq_number}`}>
              <FA name="chevron-left" />
              <span>Client Dashboard</span>
            </Link>
          </div>
          <div>
            <FA name="clipboard" />
            <span>Position Search for {name}</span>
          </div>
          <div>
            <button className="unstyled-button" onClick={this.unsetClient}>
              <FA name="close" />
              <span>Exit client view</span>
            </button>
          </div>
        </div>
      </div>
    );
    return (
      <div id={ID}>
        {isSuccess && renderHeader()}
      </div>
    );
  }
}

ClientHeader.propTypes = {
  client: BIDDER_OBJECT.isRequired,
  unset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  history: PropTypes.shape({}).isRequired,
};

ClientHeader.defaultProps = {
  isLoading: false,
  hasErrored: false,
};

const mapStateToProps = ({ clientView: { client, isLoading, hasErrored } }) => ({
  client, isLoading, hasErrored,
});

export const mapDispatchToProps = dispatch => ({
  unset: () => dispatch(unsetClient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientHeader));
