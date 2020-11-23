/* eslint-disable no-unused-vars,no-console */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { includes, get } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { availableBiddersToggleUser, availableBiddersIds } from 'actions/cdo';
import InteractiveElement from '../../InteractiveElement';


const AddToInternalListButton = props => {
  const {
    refKey,
    fetchIds,
    toggleAvailableBidder,
    isLoading,
    compareArray,
  } = props;

  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    fetchIds();
  }, []);

  const inInternalList = () => includes(compareArray, refKey);

  const toggleInternal = () => {
    setLoading(true);
    toggleAvailableBidder(refKey, inInternalList());
  };

  const getText = () => inInternalList() ? 'from Internal List' : 'to Internal List';
  const getIcon = () => inInternalList() ? 'minus' : 'plus';

  return (
    <InteractiveElement
      onClick={toggleInternal}
      className="usa-button btn-icon-to-spinner"
      type="button"
    >
      {loading ?
        (<span className="ds-c-spinner spinner-white" />) :
        <FontAwesome name={getIcon()} />
      }
      <span className="btn-icon-to-spinner-text">{getText()}</span>
    </InteractiveElement>
  );
};

AddToInternalListButton.propTypes = {
  refKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string.isRequired]).isRequired,
  toggleAvailableBidder: PropTypes.func.isRequired,
  fetchIds: PropTypes.func.isRequired,
  compareArray: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string.isRequired])),
  isLoading: PropTypes.bool,
};

AddToInternalListButton.defaultProps = {
  compareArray: [],
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: state.availableBiddersToggleUserIsLoading,
  compareArray: state.availableBiddersIdsSuccess,
});

export const mapDispatchToProps = dispatch => ({
  toggleAvailableBidder: (id, remove) => dispatch(availableBiddersToggleUser(id, remove)),
  fetchIds: () => dispatch(availableBiddersIds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToInternalListButton);
