import React, { Component } from 'react';
import BureauPage from '../../Components/BureauPage';

class BureauContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BureauPage />
    );
  }
}

BureauContainer.propTypes = {
};

BureauContainer.defaultProps = {
};


export default BureauContainer;