/* eslint-disable no-console */
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { useState } from 'react';
import { connect } from 'react-redux';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { getClassifications, saveClassifications } from '../../../actions/classifications';

const Classifications = props => {
  const {
    classifications,
    clientClassifications,
    isLoading,
    saveUserClassifications,
    userId,
  } = props;

  const [isEditable, setIsEditable] = useState(true);
  const [classificationsInput, setClassificationsInput] = useState(clientClassifications);

  // useEffect
  // set classInput
  // should handle initial render
  // should only run once

  // useEffect(() => {
  //   console.log('client class', clientClassifications);
  //   console.log('class input', classificationsInput);
  //   console.log('setting orignal clientclass');
  //   setClassificationsInput(['test']);
  //   console.log('new class input', classificationsInput);
  // }, []);

  // need to re-render when clientClass changes

  const handleInput = (c) => {
    console.log('in handle input');
    console.log('clientClass:', clientClassifications);
    console.log('this is c:', c);
    console.log('Before');
    console.log('classificationsInput', classificationsInput);
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
    console.log('classificationsInput', classificationsInput);
  };

  const onGetClassifications = () => {
    getClassifications();
  };

  // const cancelInput = () => {
  //   // cancel would return the previous list
  //   console.log('cancel');
  //   setClassificationsInput([]);
  //   setIsEditable(true);
  // };

  const onSubmit = () => {
    // needs to call an action/pass argument
    console.log('inside onSubmit', classificationsInput);
    console.log('userId perdet', userId);
    saveUserClassifications(classificationsInput);
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
            clientClassifications={clientClassifications}
            id="updates"
            editMode={isEditable}
            updateClassifications={(h) => handleInput(h)}
            input={classificationsInput}
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
            // will need to set 'value' to false
              type="button"
              className="saved-search-form-primary-button"
              onClick={() => setIsEditable(true)}
              getClassifications={onGetClassifications()}
              // onClick={() => cancelInput()}
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
  // getClassifications: PropTypes.func,
  saveUserClassifications: PropTypes.func,
  userId: null,
  // userId: PropTypes.number,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
  getClassifications: EMPTY_FUNCTION,
  saveUserClassifications: EMPTY_FUNCTION,
  userId: null,
  // userId: 0,
};

const mapStateToProps = state => ({
  classifications: state.classifications,
  isLoading: state.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  getClassifications: () => dispatch(getClassifications()),
  saveUserClassifications: (classification) => dispatch(saveClassifications(classification)),
});

// export default Classifications;
export default connect(mapStateToProps, mapDispatchToProps)(Classifications);
