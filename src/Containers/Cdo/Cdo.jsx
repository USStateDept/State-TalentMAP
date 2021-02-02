import { Component } from 'react';
import CdoPage from 'Components/CdoPage';

class CdoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CdoPage />
    );
  }
}

CdoContainer.propTypes = {
};

CdoContainer.defaultProps = {
};


export default CdoContainer;
