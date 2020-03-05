import React, { Component } from 'react';
import FA from 'react-fontawesome';
import StaticDevContent from 'Components/StaticDevContent';
import CheckboxList from 'Components/BidderPortfolio/CheckboxList';
import EditButtons from 'Components/BidderPortfolio/EditButtons';
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
        <StaticDevContent>
          <div className="section-padded-inner-container small-link-container view-more-link-centered">
            { !isEditable && <button className="unstyled-button" onClick={this.enableEdit}><FA name="pencil" /> Edit Updates</button> }
            { isEditable && <EditButtons initialShowSave onChange={this.disableEdit} /> }
          </div>
        </StaticDevContent>
      </div>
    );
  }
}

export default Updates;
