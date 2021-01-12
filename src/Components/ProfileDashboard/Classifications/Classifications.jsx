/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { pull } from 'lodash';
import FA from 'react-fontawesome';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { saveClassifications } from '../../../actions/classifications';

const Classifications = props => {
  const {
    classifications,
    clientClassifications,
    isLoading,
    saveUserClassifications,
    userId,
  } = props;

  // TODO:
  // need to test useEffect
  // need to test useState(clientClass)
  // need to test referencing issue

  const [isEditable, setIsEditable] = useState(true);
  // const [userInput, setUserInput] = useState([]);
  const [userInput, setUserInput] = useState(clientClassifications);

  useEffect(() => {
    if (!clientClassifications.length) {
      setUserInput(clientClassifications);
    }
  }, [clientClassifications]);

  const handleInput = (c) => {
    const newClassifications = userInput;
    if (newClassifications.includes(c)) {
      pull(newClassifications, c);
    } else {
      newClassifications.push(c);
    }
    setUserInput(newClassifications);
  };

  const cancelInput = (e) => {
    e.preventDefault();
    setUserInput(clientClassifications);
    setIsEditable(true);
    console.log('clientClassifications:', clientClassifications);
    console.log('userInput', userInput);
  };

  const onSubmit = () => {
    // needs to call an action/pass argument
    console.log('inside onSubmit', userInput);
    console.log('userId perdet', userId);
    saveUserClassifications(userInput);
    setIsEditable(true);
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
            id="updates"
            editMode={isEditable}
            updateClassifications={(h) => handleInput(h)}
            input={userInput}
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
              onClick={onSubmit}
            >Save
            </button>
            <button
              type="button"
              className="saved-search-form-primary-button"
              // onClick={() => setIsEditable(true)}
              onClick={(e) => cancelInput(e)}
            >Cancel
              {/* should set back to current object */}
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
  saveUserClassifications: PropTypes.func,
  userId: null,
  // userId: PropTypes.number,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
  saveUserClassifications: EMPTY_FUNCTION,
  userId: null,
  // userId: 0,
};

const mapStateToProps = state => ({
  classifications: state.classifications,
  isLoading: state.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  saveUserClassifications: (classification) => dispatch(saveClassifications(classification)),
});

// export default Classifications;
export default connect(mapStateToProps, mapDispatchToProps)(Classifications);
