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

  const [editView, setEditView] = useState(false);
  const [userInput, setUserInput] = useState([]);

  useEffect(() => {
    if (clientClassifications.length) {
      setUserInput([...clientClassifications]);
    }
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

  const cancelInput = (e) => {
    e.preventDefault();
    setUserInput(clientClassifications);
    setEditView(false);
  };

  const onSubmit = () => {
    saveUserClassifications(userInput);
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
            /> Edit Classifications
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
              onClick={(e) => cancelInput(e)}
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
  saveUserClassifications: (classification) => dispatch(saveClassifications(classification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Classifications);
