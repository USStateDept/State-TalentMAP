/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { pull, difference } from 'lodash';
import FA from 'react-fontawesome';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveClassifications } from 'actions/classifications';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';

const Classifications = props => {
  const {
    classifications,
    clientClassifications,
    isLoading,
    saveUserClassifications,
    userId,
  } = props;

  const [editView, setEditView] = useState(false);
  const [userInput, setUserInput] = useState(clientClassifications);
  // need new array for handling delete

  useEffect(() => {
    setUserInput(clientClassifications);
  }, [clientClassifications]);

  // need to handle the checking/unchecking process
  // always compare to clientClassifications
  // need to handle delete to a new array only if inside clientClassifications originally
  const handleInput = (c) => {
    const pushClass = [...userInput];
    if (!pushClass.includes(c)) {
      pushClass.push(c);
    } else {
      pull(pushClass, c);
    }
    setUserInput(pushClass);
  };

  const cancelInput = () => {
    setUserInput(clientClassifications);
    setEditView(false);
  };

  const onSubmit = () => {
    const insertDiff = difference(userInput, clientClassifications);
    const deleteDiff = difference(clientClassifications, userInput);
    if (insertDiff.length !== 0 || deleteDiff.length > 0) {
      saveUserClassifications(insertDiff, deleteDiff, userId);
    }
    setEditView(false);
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
            editMode={!editView}
            updateClassifications={(h) => handleInput(h)}
            input={userInput}
          />
        </div>
      </div>
      {
        !isLoading && !editView &&
        <div className="section-padded-inner-container small-link-container view-more-link-centered">
          <button className="unstyled-button" onClick={() => setEditView(true)}>
            <FA
              name="edit"
            />Edit Classifications
          </button>
        </div>
      }
      { !isLoading && editView &&
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
              onClick={() => cancelInput()}
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
  saveUserClassifications: PropTypes.func,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
  saveUserClassifications: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  classifications: state.classifications,
  isLoading: state.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  saveUserClassifications: (insertClassification, deleteClassification, id) =>
    dispatch(saveClassifications(insertClassification, deleteClassification, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Classifications);
