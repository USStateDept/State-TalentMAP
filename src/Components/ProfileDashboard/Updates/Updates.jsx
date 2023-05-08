import { Component } from 'react';
import CheckboxList from 'Components/BidderPortfolio/CheckboxList';
import SectionTitle from '../SectionTitle';

class Updates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    };
  }

  enableEdit = () => {
    this.setState({ isEditable: true });
  };

  disableEdit = () => {
    this.setState({ isEditable: false });
  };

  render() {
    const { isEditable } = this.state;
    return (
      <div className="usa-grid-full profile-section-container updates-container">
        <div className="usa-grid-full section-padded-inner-container">
          <div className="usa-width-one-whole">
            <SectionTitle title="Updates" icon="tasks" />
          </div>
          <div className="usa-width-one-whole">
            <CheckboxList isDisabled={!isEditable} id="updates" />
          </div>
        </div>
      </div>
    );
  }
}

export default Updates;
