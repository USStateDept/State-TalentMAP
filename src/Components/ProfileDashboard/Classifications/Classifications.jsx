/* eslint-disable no-console */
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { useState } from 'react';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const Classifications = props => {
  const {
    classifications,
    clientClassifications,
    isLoading,
  } = props;

  const [isEditable, setIsEditable] = useState(true);
  const [classificationsInput, setClassificationsInput] = useState([]);

  const handleInput = (c) => {
    console.log(c);
    console.log('Before');
    console.log(classificationsInput);
    const pushClass = classificationsInput;
    pushClass.push(c);
    setClassificationsInput(pushClass);
    console.log('After');
    console.log(classificationsInput);
  };

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
            editMode={isEditable}
            updateClassifications={(h) => handleInput(h)}
          />
        </div>
      </div>
      {
        !isLoading && isEditable &&
        <div className="section-padded-inner-container small-link-container view-more-link-centered">
          <span>
            <FA
              name="edit"
              onClick={() => setIsEditable(false)}
            /> Edit Classifications
          </span>
        </div>
      }
      { !isLoading && !isEditable &&
        <div className="section-padded-inner-container small-link-container view-more-link-centered">
          <div className="saved-search-form-buttons">
            <button
              type="button"
              className="saved-search-form-primary-button"
              onClick={() => setIsEditable(true)}
            >Save
            </button>
            <button
            // will need to set 'value' to false
              type="button"
              className="saved-search-form-primary-button"
              onClick={() => setIsEditable(true)}
            >Cancel
            </button>
          </div>
        </div>
      }
    </div>
  );
};

Classifications.propTypes = {
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
  isLoading: PropTypes.bool,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
};

export default Classifications;
