import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TotalResults from './TotalResults';
import SelectForm from '../../SelectForm';
import { BID_PORTFOLIO_SORTS } from '../../../Constants/Sort';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';

class BidControls extends Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
  }
  onSortChange(q) {
    const orderingObject = { ordering: q.target.value };
    this.props.queryParamUpdate(orderingObject);
  }
  render() {
    const { biddersNumerator, biddersDenominator, isLoading, viewType,
      changeViewType } = this.props;
    return (
      <div className="usa-grid-full portfolio-controls">
        <div className="usa-width-one-fourth total-results-container">
          {
            // We only want total results to rerender when loading,
            // so that SelectForm's state is maintained between loads.
            !isLoading &&
            <TotalResults numerator={biddersNumerator} denominator={biddersDenominator} />
          }
        </div>
        <div className="usa-width-three-fourths portfolio-sort-container results-dropdown">
          <div className="portfolio-sort-container-contents">
            <SelectForm
              id="porfolio-sort"
              options={BID_PORTFOLIO_SORTS.options}
              label="Sort by:"
              onSelectOption={this.onSortChange}
            />
            <ResultsViewBy initial={viewType} onClick={changeViewType} />
          </div>
        </div>
      </div>
    );
  }
}

BidControls.propTypes = {
  queryParamUpdate: PropTypes.func.isRequired,
  biddersNumerator: PropTypes.number.isRequired,
  biddersDenominator: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  viewType: PropTypes.string.isRequired,
  changeViewType: PropTypes.func.isRequired,
};

export default BidControls;
