import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { BIDDER_OBJECT, HISTORY_OBJECT } from 'Constants/PropTypes';
import { unsetClient } from '../../actions/clientView';
import { isCurrentPath } from '../ProfileMenu/navigation';
import {
  tertiaryCoolBlueLighter, tertiaryCoolBlueLightest,
  tertiaryGoldLighter, tertiaryGoldLightest,
} from '../../sass/sass-vars/variables';

export const ID = 'client-header';

const skeletonColors = {
  highlightColor: tertiaryCoolBlueLighter,
  color: tertiaryCoolBlueLightest,
};

export class ClientHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReturnLink: true,
      useResultsExitFunction: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.checkPath();
  }

  setExitAction(historyObject) {
    // hide if on the public profile
    const pathMatches = isCurrentPath('/results', historyObject.pathname);
    this.setState({ useResultsExitFunction: pathMatches });
  }

  unsetClient = () => {
    const { history } = this.props;
    const { useResultsExitFunction } = this.state;
    this.props.unset();

    if (useResultsExitFunction) {
      history.push('/results');
    }
  };

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
    const skeletonColors$ = { ...skeletonColors };
    const { showReturnLink } = this.state;
    const { client, isLoading, hasErrored, bidderPortfolioSelectedCDO, style } = this.props;
    const name = client && client.name ? client.name : 'Unknown user';

    const isSuccess = !!(client && !!client.perdet_seq_number && !isLoading && !hasErrored);

    const proxyName = get(bidderPortfolioSelectedCDO, 'name') && !get(bidderPortfolioSelectedCDO, 'isCurrentUser') ?
      get(bidderPortfolioSelectedCDO, 'name') : '';

    if (proxyName) {
      skeletonColors$.highlightColor = tertiaryGoldLighter;
      skeletonColors$.color = tertiaryGoldLightest;
    }

    const renderHeader = () => (
      <div className={`usa-banner client-header ${proxyName ? 'client-header--alternate' : ''} ${isLoading ? 'client-header--is-loading' : ''}`}>
        <div className="usa-grid usa-banner-inner">
          <div className={!showReturnLink ? 'hidden' : ''}>
            <SkeletonTheme {...skeletonColors$}>
              {!isLoading ? <Link to={`/profile/public/${client.perdet_seq_number}`}>
                <FA name="chevron-left" />
                <span>Client Dashboard</span>
              </Link> : <Skeleton width="75%" duration={1.8} />}
            </SkeletonTheme>
          </div>
          <div>
            <SkeletonTheme {...skeletonColors$}>
              {!isLoading ? <span><FA name="clipboard" />
                <span id="search-as-name">Position Search for {name}{!!proxyName && ` (Proxying as ${proxyName})`}</span></span> : <Skeleton width="75%" duration={1.8} />}
            </SkeletonTheme>
          </div>
          <div>
            <SkeletonTheme {...skeletonColors$}>
              {!isLoading ? <button className="unstyled-button" onClick={this.unsetClient}>
                <FA name="close" />
                <span>Exit client view</span>
              </button> : <Skeleton width="75%" duration={1.8} />}
            </SkeletonTheme>
          </div>
        </div>
      </div>
    );
    return (
      <div id={ID} style={style} className="client-header-container">
        {isSuccess || isLoading ? renderHeader() : null}
      </div>
    );
  }
}

ClientHeader.propTypes = {
  client: BIDDER_OBJECT.isRequired,
  unset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  history: HISTORY_OBJECT.isRequired,
  bidderPortfolioSelectedCDO: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

ClientHeader.defaultProps = {
  isLoading: false,
  hasErrored: false,
  bidderPortfolioSelectedCDO: {},
  style: {},
};

const mapStateToProps = ({
  bidderPortfolioSelectedCDO,
  clientView: { client, isLoading, hasErrored },
}) => ({
  client, isLoading, hasErrored, bidderPortfolioSelectedCDO,
});

export const mapDispatchToProps = dispatch => ({
  unset: () => dispatch(unsetClient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientHeader));
