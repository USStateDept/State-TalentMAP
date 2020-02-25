import React, { Component } from 'react';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

// eslint-disable-next-line react/prefer-stateless-function
class Classifications extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { classifications, clientClassifications } = this.props;
    return (
      <div className="usa-grid-full profile-section-container updates-container">
        <div className="usa-grid-full section-padded-inner-container">
          <div className="usa-width-one-whole">
            <SectionTitle title="Bidder Classifications" icon="tasks" />
          </div>
          <div className="usa-width-one-whole">
            <CheckboxList
              list={classifications}
              clientClassifications={clientClassifications}
              id="updates"
            />
          </div>
        </div>
      </div>
    );
  }
}

Classifications.propTypes = {
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
};

export default Classifications;
