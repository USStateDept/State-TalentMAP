import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual, throttle } from 'lodash';
import { connect } from 'react-redux';
import Picky from 'react-picky';
import bowser from 'bowser';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { bidderPortfolioSelectCDOsToSearchBy } from 'actions/bidderPortfolio';
import { unsetClientView } from 'actions/clientView';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { CLIENTS_PAGE_SIZES } from 'Constants/Sort';
import filterUsers from '../helpers';

// TODO - Running into an issue where the label/span element is also
// passing up an event almost concurrently (400ms difference).
// This only happens in IE11, so we add a leading throttle so that
// any additional events within 1000ms do not get called.
const browser = bowser.getParser(window.navigator.userAgent);
const isIE = browser.satisfies({ 'internet explorer': '<=11' });
const THROTTLE_MS = isIE ? 1000 : 0;

export function renderList({ items, selected, ...rest }) {
  const getIsSelected = item => !!selected.find(f => f.id === item.id);
  return items.map(item => <ListItem key={item.id} item={item} {...rest} queryProp="name" getIsSelected={getIsSelected} />);
}

class CDOAutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.selectMultipleOption = throttle(
      this.selectMultipleOption.bind(this),
      THROTTLE_MS,
      { trailing: false, leading: true },
    );
    this.state = {
      suggestions: filterUsers('', props.cdos),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.cdos, nextProps.cdos)) {
      this.setState({ suggestions: filterUsers('', nextProps.cdos) });
    }
    if (!isEqual(this.props.cdoPills, nextProps.cdoPills)) {
      this.selectMultipleOption(nextProps.cdoPills, true);
    }
  }

  selectMultipleOption(value, fromPills) {
    const { updatePagination, pageSize } = this.props;
    if (isEmpty(value) && fromPills && !isEmpty(this.props.currentCDO)) {
      this.props.setCDOsToSearchBy([this.props.currentCDO]);
    } else {
      this.props.setCDOsToSearchBy(value);
      updatePagination({ pageNumber: 1, pageSize });
    }
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
            includeSelectAll

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
  cdoPills: PropTypes.arrayOf(PropTypes.shape({})),
  currentCDO: PropTypes.shape({}),
  updatePagination: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
};

CDOAutoSuggest.defaultProps = {
  cdos: [],
  isLoading: false,
  hasErrored: false,
  selection: [],
  setCDOsToSearchBy: EMPTY_FUNCTION,
  cdoPills: [],
  currentCDO: {},
  pageSize: CLIENTS_PAGE_SIZES.defaultSort,
};

const mapStateToProps = state => ({
  cdos: state.bidderPortfolioCDOs,
  isLoading: state.bidderPortfolioCDOsIsLoading,
  hasErrored: state.bidderPortfolioCDOsHasErrored,
  selection: state.bidderPortfolioSelectedCDOsToSearchBy,
  currentCDO: state.bidderPortfolioSelectedCDO,
});

export const mapDispatchToProps = dispatch => ({
  setCDOsToSearchBy: (arr) => {
    dispatch(bidderPortfolioSelectCDOsToSearchBy(arr));
    dispatch(unsetClientView());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CDOAutoSuggest);
