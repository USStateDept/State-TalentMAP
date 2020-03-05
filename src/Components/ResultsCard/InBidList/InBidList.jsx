import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BID_LIST } from 'Constants/PropTypes';
import { InBidList } from 'Components/Ribbon';
import { existsInNestedObject } from 'utilities';

const BidListButtonContainer = (
  { id, compareArray, clientCompareArray, ...rest },
  { isClient },
) => {
  const compareArray$ = (isClient ? clientCompareArray : compareArray).results;
  const hasBid = existsInNestedObject(id, compareArray$);
  return (
    hasBid ?
      <InBidList
        {...rest}
        id={id}
      />
      : null
  );
};

BidListButtonContainer.contextTypes = {
  isClient: PropTypes.bool,
};

BidListButtonContainer.propTypes = {
  id: PropTypes.number.isRequired,
  compareArray: BID_LIST,
  clientCompareArray: BID_LIST,
};

BidListButtonContainer.defaultProps = {
  compareArray: { results: [] },
  clientCompareArray: { results: [] },
};

export const mapStateToProps = state => ({
  compareArray: state.bidListFetchDataSuccess,
  clientCompareArray: state.clientBidListFetchDataSuccess,
});

export default connect(mapStateToProps)(BidListButtonContainer);
