import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import Picky from 'react-picky';
import { bidderPortfolioSelectCDOsToSearchBy } from 'actions/bidderPortfolio';
import { unsetClientView } from 'actions/clientView';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import filterUsers from '../helpers';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

export const getDisplayProperty = o => `${o.first_name} ${o.last_name}`;

export function renderList({ items, selected, ...rest }) {
  const getIsSelected = item => !!selected.find(f => f.id === item.id);
  return items.map(item => <ListItem key={item.id} item={item} {...rest} queryProp="name" getIsSelected={getIsSelected} />);
}

class CDOAutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
    this.state = {
      suggestions: filterUsers('', props.cdos),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.cdos, nextProps.cdos)) {
      this.setState({ suggestions: filterUsers('', nextProps.cdos) });
    }
  }

  selectMultipleOption(value) {
    this.props.setCDOsToSearchBy(value);
  }

  render() {
    const { suggestions } = this.state;
    const { isLoading, hasErrored, selection, cdoSelections } = this.props; // eslint-disable-line
    return (
      !isLoading && !hasErrored &&
        <div className="cdo-autosuggest">
          <Picky
            placeholder="Select CDOs"
            value={selection}
            options={suggestions}
            onChange={this.selectMultipleOption}
            numberDisplayed={2}
            multiple
            includeFilter
            dropdownHeight={255}
            renderList={renderList}
            valueKey="id"
            labelKey="name"

            // TODO - Once React 16 is integrated, upgrade to react-picky >=5.2.0 to use this prop
            // filterTermProcessor={trim} // import trim from lodash
          />
        </div>
    );
  }
}

CDOAutoSuggest.propTypes = {
  cdos: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  selection: PropTypes.arrayOf(PropTypes.shape({})),
  setCDOsToSearchBy: PropTypes.func,
};

CDOAutoSuggest.defaultProps = {
  cdos: [],
  isLoading: false,
  hasErrored: false,
  selection: [],
  setCDOsToSearchBy: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  cdos: state.bidderPortfolioCDOs,
  isLoading: state.bidderPortfolioCDOsIsLoading,
  hasErrored: state.bidderPortfolioCDOsHasErrored,
  selection: state.bidderPortfolioSelectedCDOsToSearchBy,
});

export const mapDispatchToProps = dispatch => ({
  setCDOsToSearchBy: (arr) => {
    dispatch(bidderPortfolioSelectCDOsToSearchBy(arr));
    dispatch(unsetClientView());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CDOAutoSuggest);
