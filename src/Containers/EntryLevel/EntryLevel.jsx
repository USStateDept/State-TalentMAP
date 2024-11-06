import { Component } from 'react';
import EntryLevelPage from '../../Components/EntryLevelPage';

class EntryLevelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <EntryLevelPage />
    );
  }
}

EntryLevelContainer.propTypes = {};

EntryLevelContainer.defaultProps = {};

export default EntryLevelContainer;
