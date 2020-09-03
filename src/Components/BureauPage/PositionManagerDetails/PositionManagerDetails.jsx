import React, { Component } from 'react';
import { get, identity, pickBy } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BackButton from 'Components/BackButton';
import PositionDetailsItem from 'Components/PositionDetailsItem';
import ExportButton from 'Components/ExportButton';
import OBCUrl from 'Components/OBCUrl';
import Spinner from 'Components/Spinner';
import { getPostName } from 'utilities';
import { NO_POST } from 'Constants/SystemMessages';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import { downloadBidderData } from 'actions/bureauPositions';
import { bureauBidsFetchData } from 'actions/bureauPositionBids';
import { bureauPositionDetailsFetchData } from 'actions/bureauPositionDetails';
import PositionManagerBidders from '../PositionManagerBidders';

class PositionManagerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      hasLoaded: false,
      id: get(props, 'match.params.id'),
      ordering: 'bidder_grade',
      filters: {},
    };
  }

  UNSAFE_componentWillMount() {
    this.getPositionBids();
    this.props.getPositionDetails(this.state.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.bidsIsLoading && !nextProps.bidsIsLoading) {
      this.setState({ hasLoaded: true });
    }
  }

  onSort = sort => {
    this.setState({ ordering: sort }, () => {
      this.props.getBids();
    });
  }

  onFilter = (f, v) => {
    let { filters } = this.state;
    filters[f] = v;
    filters = pickBy(filters, identity);
    this.setState({ filters }, () => {
      this.props.getBids();
    });
  }

  getPositionBids = () => {
    const { id, ordering, filters } = this.state;
    const query = {
      ...filters,
      ordering,
    };
    this.props.getBids(id, query);
  }

  exportBidders = () => {
    this.setState({ isLoading: true });
    downloadBidderData()
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading, hasLoaded } = this.state;
    const { bids, bidsIsLoading, bureauPositionIsLoading, bureauPosition } = this.props;
    const isProjectedVacancy = false;
    const isArchived = false;
    const OBCUrl$ = get(bureauPosition, 'position.post.post_overview_url');
    const title = get(bureauPosition, 'position.title');

    return (
      <div className="usa-grid-full profile-content-container position-manager-details">
        <div className="usa-grid-full profile-content-inner-container">
          {
            (!hasLoaded || bureauPositionIsLoading || isLoading) ?
              <Spinner type="homepage-position-results" size="big" /> :
              <div>
                <div className="usa-grid-full">
                  <div className="usa-width-one-whole">
                    <div className="left-col">
                      <BackButton />
                    </div>
                    <div className="right-col">
                      <button>Print</button>
                      <div className="export-button-container">
                        <ExportButton onClick={this.exportBidders} isLoading={isLoading} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-content-inner-container position-manager-details--content">
                  <div className="usa-grid-full header-title-container padded-main-content">
                    <div className="position-details-header-title">
                      {isProjectedVacancy && <span>Projected Vacancy</span>}
                      {isArchived && <span>Filled Position</span>}
                      <h1>{title}</h1>
                    </div>
                    <div className="post-title">
                      Location: {getPostName(get(bureauPosition, 'position.post'), NO_POST)}
                      { !!OBCUrl$ && <span> (<OBCUrl url={OBCUrl$} />)</span> }
                    </div>
                  </div>
                  <PositionDetailsItem
                    details={bureauPosition}
                    hideHeader
                    hideContact
                  />
                  <div className="usa-grid-full">
                    <PositionManagerBidders
                      bids={bids}
                      onSort={this.onSort}
                      onFilter={this.onFilter}
                      bidsIsLoading={bidsIsLoading}
                    />
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

PositionManagerDetails.propTypes = {
  getBids: PropTypes.func.isRequired,
  bids: PropTypes.arrayOf(PropTypes.shape({})),
  bidsIsLoading: PropTypes.bool,
  getPositionDetails: PropTypes.func.isRequired,
  bureauPositionIsLoading: PropTypes.bool,
  bureauPosition: POSITION_DETAILS,
};

PositionManagerDetails.defaultProps = {
  bids: [],
  bidsIsLoading: false,
  bureauPositionIsLoading: false,
  bureauPosition: {},
};

const mapStateToProps = (state) => ({
  bids: state.bureauPositionBids,
  bidsIsLoading: state.bureauPositionBidsIsLoading,
  bureauPositionIsLoading: state.bureauPositionDetailsIsLoading,
  bureauPosition: state.bureauPositionDetails,
});

export const mapDispatchToProps = dispatch => ({
  getBids: (id, query) => dispatch(bureauBidsFetchData(id, query)),
  getPositionDetails: (id) => dispatch(bureauPositionDetailsFetchData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PositionManagerDetails));
