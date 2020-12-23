import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { availableBiddersToggleUser } from 'actions/cdo';
import InteractiveElement from '../../InteractiveElement';


const AddToInternalListButton = props => {
  const {
    refKey,
    toggleAvailableBidder,
    isLoading,
    compareArray,
  } = props;

  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    // isLoading sets to true on local action, store false flips back
    if (!isLoading && loading) {
      setLoading(isLoading);
    }
  }, [isLoading]);

  const inInternalList = () => includes(compareArray, refKey);

  const toggleInternal = () => {
    if (!isLoading) {
      setLoading(true);
      toggleAvailableBidder(refKey, inInternalList());
    }
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
  refKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  toggleAvailableBidder: PropTypes.func.isRequired,
  compareArray: PropTypes.arrayOf(PropTypes.number).isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToInternalListButton);