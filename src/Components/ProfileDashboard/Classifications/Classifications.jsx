import PropTypes from 'prop-types';
import { difference, isEmpty } from 'lodash';
import FA from 'react-fontawesome';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateClassifications } from 'actions/classifications';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { orderClassifications } from 'Components/BidderPortfolio/helpers';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';

const Classifications = props => {
  const {
    classifications,
    clientClassifications,
    updateUserClassifications,
    userId,
    isPublic,
    hideTitle,
    canEditClassifications,
  } = props;

  console.log(canEditClassifications);
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
      const index = pushClass.indexOf(c);
      if (index > -1) {
        pushClass.splice(index, 1);
      }
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

  const classifications$ = orderClassifications(classifications);

  return (
    <div className="usa-grid-full profile-section-container updates-container">
      <div className="section-padded-inner-container">
        {
          !hideTitle &&
          <div className="usa-width-one-whole">
            <SectionTitle title="Bidder Classifications" icon="tasks" />
          </div>
        }
        <div className="usa-width-one-whole">
          <CheckboxList
            list={classifications$}
            id="updates"
            editView={editView}
            updateClassifications={handleInput}
            input={userInput}
            isPublic={isPublic}
          />
        </div>
      </div>
      {
        !editView && isPublic && canEditClassifications &&
        <div className="section-padded-inner-container small-link-container view-more-link-centered">
          <button className="unstyled-button classifications-checkbox" onClick={() => setEditView(true)}>
            <FA
              name="edit"
            />Edit Classifications
          </button>
        </div>
      }
      { editView &&
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
              onClick={cancelInput}
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
  updateUserClassifications: PropTypes.func,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isPublic: PropTypes.bool,
  hideTitle: PropTypes.bool,
  canEditClassifications: PropTypes.bool,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  updateUserClassifications: EMPTY_FUNCTION,
  isPublic: false,
  hideTitle: false,
  canEditClassifications: false,
};

export const mapDispatchToProps = dispatch => ({
  updateUserClassifications: (classification, id) =>
    dispatch(updateClassifications(classification, id)),
});

export default connect(null, mapDispatchToProps)(Classifications);
