/* eslint-diable */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Bidders from '../Bidders';
import AvailableBidderStats from '../AvailableBidderStats';


const BidderManager = props => (
  <div className="position-manager-details">
    <div className="usa-grid-full">
      <AvailableBidderStats />
    </div>
    <div className="usa-width-one-whole">
      <div className="usa-grid-full">
        <Bidders />
      </div>
    </div>
  </div>
);

BidderManager.propTypes = {

};

BidderManager.defaultProps = {

};

const mapStateToProps = state => ({
});

export const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BidderManager);

