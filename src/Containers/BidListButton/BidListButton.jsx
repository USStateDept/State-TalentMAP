import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BID_LIST, EMPTY_FUNCTION, SetType } from '../../Constants/PropTypes';
import { toggleBidPosition, toggleClientBidPosition } from '../../actions/bidList';
import BidListButton from '../../Components/BidListButton';

const BidListButtonContainer = (
  { toggleBid, toggleClientBid, isLoading, id, compareArray, clientCompareArray, ...rest },
  { isClient },
) => (
  <BidListButton
    {...rest}
    toggleBidPosition={(id$, remove) => // eslint-disable-line no-confusing-arrow
      isClient ?
        toggleClientBid(id$, remove) :
        toggleBid(id$, remove)}
    id={id}
    isLoading={isLoading.has(id)}
    compareArray={(isClient ? clientCompareArray : compareArray).results}
  />
);

BidListButtonContainer.contextTypes = {
  isClient: PropTypes.bool,
};

BidListButtonContainer.propTypes = {
  toggleBid: PropTypes.func.isRequired,
  toggleClientBid: PropTypes.func,
  isLoading: SetType,
  id: PropTypes.number.isRequired,
  compareArray: BID_LIST,
  clientCompareArray: BID_LIST,
};

BidListButtonContainer.defaultProps = {
  toggleClientBid: EMPTY_FUNCTION,
  isLoading: new Set(),
  compareArray: { results: [] },
  clientCompareArray: { results: [] },
};

export const mapStateToProps = state => ({
  isLoading: state.bidListToggleIsLoading,
  compareArray: state.bidListFetchDataSuccess,
  clientCompareArray: state.clientBidListFetchDataSuccess,
});

export const mapDispatchToProps = dispatch => ({
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
  toggleClientBid: (id, remove) => dispatch(toggleClientBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidListButtonContainer);
