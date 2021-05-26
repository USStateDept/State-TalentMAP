import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { availableBiddersToggleUser } from 'actions/availableBidders';
import { Tooltip } from 'react-tippy';
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

  const inInternalList = () => includes(compareArray.map(m => `${m}`), refKey);

  const toggleInternal = () => {
    if (!isLoading) {
      setLoading(true);
      toggleAvailableBidder(refKey, inInternalList());
    }
  };

  const getText = () => inInternalList() ? 'from ABL' : 'to ABL';
  const getIcon = () => inInternalList() ? 'minus' : 'plus';

  return (
    <InteractiveElement
      onClick={toggleInternal}
      className="usa-button btn-icon-to-spinner"
      type="button"
    >
      <Tooltip
        title="Available Bidders List"
        arrow
        distance={20}
      >
        {loading ?
          (<span className="ds-c-spinner spinner-white" />) :
          <FontAwesome name={getIcon()} />
        }
        <span className="btn-icon-to-spinner-text">{getText()}</span>
      </Tooltip>
    </InteractiveElement>
  );
};

AddToInternalListButton.propTypes = {
  refKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  toggleAvailableBidder: PropTypes.func.isRequired,
  compareArray: PropTypes.arrayOf(PropTypes.number),
  isLoading: PropTypes.bool,
};

AddToInternalListButton.defaultProps = {
  toggleAvailableBidder: EMPTY_FUNCTION,
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
