import React, { Component } from 'react';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filter, indexOf, isArray, map } from 'lodash';
import { bidderPortfolioSeasonsFetchData, bidderPortfolioSetSeasons } from 'actions/bidderPortfolio';
import ListItem from './ListItem';

export function renderList({ items, ...rest }) {
  return items.map(item => <ListItem {...rest} key={item.id} item={item.description} />);
}

class BidCyclePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayValue: [],
    };
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
    this.bidSeasonsToIds = this.bidSeasonsToIds.bind(this);
  }
  componentWillMount() {
    // Only perform once in the session since this will rarely change.
    if (!this.props.seasons.length) {
      this.props.fetchSeasons();
    }
  }
  setSeasons() {
    const seasons = this.bidSeasonsToIds();
    this.props.setSeasons(seasons);
  }
  bidSeasonsToIds() {
    const { arrayValue } = this.state;
    const { seasons } = this.props;
    let ids$ = isArray(seasons) ? [...seasons] : [];
    ids$ = filter(ids$, f => indexOf(arrayValue, f.description) > -1);
    ids$ = map(ids$, m => m.id);
    return ids$;
  }
  selectMultipleOption(value) {
    this.setState({ arrayValue: value }, () => this.setSeasons());
  }
  render() {
    const { arrayValue } = this.state;
    const { seasons, isLoading, hasErrored } = this.props; // eslint-disable-line
    return (
      <div className="bid-cycle-picker-container">
        <div className="label">Bid season:</div>
        <Picky
          placeholder="Select season(s)"
          value={arrayValue}
          options={seasons}
          onChange={this.selectMultipleOption}
          numberDisplayed={1}
          multiple
          dropdownHeight={600}
          renderList={renderList}
          disabled={isLoading}
        />
      </div>
    );
  }
}

BidCyclePicker.propTypes = {
  seasons: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  fetchSeasons: PropTypes.func.isRequired,
  setSeasons: PropTypes.func.isRequired,
};

BidCyclePicker.defaultProps = {
  seasons: [],
  isLoading: false,
  hasErrored: false,
};

const mapStateToProps = state => ({
  seasons: state.bidderPortfolioSeasons,
  isLoading: state.bidderPortfolioSeasonsIsLoading,
  hasErrored: state.bidderPortfolioSeasonsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  fetchSeasons: () => dispatch(bidderPortfolioSeasonsFetchData()),
  setSeasons: (arr = []) => dispatch(bidderPortfolioSetSeasons(arr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidCyclePicker);
