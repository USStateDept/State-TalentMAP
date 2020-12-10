/* eslint-disable no-console */
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { useState } from 'react';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { getClassifications } from '../../../actions/classifications';

const Classifications = props => {
  const {
    classifications,
    clientClassifications,
    isLoading,
  } = props;

  // "hooks" in component
  const [isEditable, setIsEditable] = useState(true);
  const [classificationsInput, setClassificationsInput] = useState([]);

  const handleInput = (c) => {
    // need to hanlde checkmark still appearing on cancel here?
    console.log(c);
    console.log('Before');
    console.log(classificationsInput);
    const pushClass = classificationsInput;
    if (!pushClass.includes(c)) {
      pushClass.push(c);
    } else {
      const index = pushClass.indexOf(c);
      if (index > -1) {
        pushClass.splice(index, 1);
      }
    }
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
              // needs to call an action/pass argument
            >Save
            </button>
            <button
            // will need to set 'value' to false
              type="button"
              className="saved-search-form-primary-button"
              onClick={() => setIsEditable(true)}
            >Cancel
              {/* should set back to previous array */}
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
  getClassifications: PropTypes.func,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
  getClassifications: EMPTY_FUNCTION,
};

export const mapDispatchToProps = dispatch => ({
  getClassifications: () => dispatch(getClassifications()),
});

export default Classifications;
