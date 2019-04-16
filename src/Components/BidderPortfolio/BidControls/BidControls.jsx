import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectForm from '../../SelectForm';
import { BID_PORTFOLIO_SORTS } from '../../../Constants/Sort';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import ExportLink from '../ExportLink';
import EditButtons from '../EditButtons';
import BidCyclePicker from './BidCyclePicker';

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
    const { viewType, changeViewType, onEditChange, showEditButtons } = this.props;
    return (
      <div className="usa-grid-full portfolio-controls">
        <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
          <div className="portfolio-sort-container-contents">
            <BidCyclePicker />
            <SelectForm
              id="porfolio-sort"
              options={BID_PORTFOLIO_SORTS.options}
              label="Sort by:"
              onSelectOption={this.onSortChange}
            />
            <ResultsViewBy initial={viewType} onClick={changeViewType} />
            {showEditButtons && <EditButtons onChange={onEditChange} />}
            <ExportLink />
          </div>
        </div>
      </div>
    );
  }
}

BidControls.propTypes = {
  queryParamUpdate: PropTypes.func.isRequired,
  viewType: PropTypes.string.isRequired,
  changeViewType: PropTypes.func.isRequired,
  onEditChange: PropTypes.func.isRequired,
  showEditButtons: PropTypes.bool,
};

BidControls.defaultProps = {
  onEditChange: EMPTY_FUNCTION,
  showEditButtons: false,
};

export default BidControls;
