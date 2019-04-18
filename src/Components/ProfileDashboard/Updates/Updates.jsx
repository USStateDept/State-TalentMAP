import React, { Component } from 'react';
import FA from 'react-fontawesome';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import EditButtons from '../../BidderPortfolio/EditButtons';

class Updates extends Component {
  constructor(props) {
    super(props);
    this.enableEdit = this.enableEdit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.state = {
      isEditable: false,
    };
  }
  enableEdit() {
    this.setState({ isEditable: true });
  }
  disableEdit() {
    this.setState({ isEditable: false });
  }
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
        <div className="section-padded-inner-container small-link-container view-more-link-centered">
          { !isEditable && <button className="unstyled-button" onClick={this.enableEdit}><FA name="pencil" /> Edit Updates</button> }
          { isEditable && <EditButtons initialShowSave onChange={this.disableEdit} /> }
        </div>
      </div>
    );
  }
}

export default Updates;
