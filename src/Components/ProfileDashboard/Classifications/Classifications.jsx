import PropTypes from 'prop-types';
import { pull, difference, isEmpty } from 'lodash';
import FA from 'react-fontawesome';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateClassifications } from 'actions/classifications';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';

const Classifications = props => {
  const {
    classifications,
    clientClassifications,
    isLoading,
    updateUserClassifications,
    userId,
  } = props;

  const [editView, setEditView] = useState(false);
  const [userInput, setUserInput] = useState(clientClassifications);

  useEffect(() => {
    setUserInput(clientClassifications);
  }, [clientClassifications]);

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
    const updateDiff = {
      insert: difference(userInput, clientClassifications),
      delete: difference(clientClassifications, userInput),
    };
    if (isEmpty(updateDiff.insert) && isEmpty(updateDiff.delete)) {
      setEditView(false);
    } else {
      updateUserClassifications(updateDiff, userId);
    }
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
          <button className="unstyled-button classifications-checkbox" onClick={() => setEditView(true)}>
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
  updateUserClassifications: PropTypes.func,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
  updateUserClassifications: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  classifications: state.classifications,
  isLoading: state.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  updateUserClassifications: (classification, id) =>
    dispatch(updateClassifications(classification, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Classifications);
