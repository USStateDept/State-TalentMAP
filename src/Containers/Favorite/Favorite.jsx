import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import Favorite from '../../Components/Favorite';
import { SetType } from '../../Constants/PropTypes';

const FavoriteContainer = ({
  onToggle,
  isLoading,
  hasErrored,
  refKey,
  sortType,
  limit,
  page,
  ...rest }) => (
  <Favorite
    onToggle={onToggle}
    isLoading={!!isLoading.has(refKey)}
    hasErrored={hasErrored}
    refKey={refKey}
    {...rest}
  />
);

FavoriteContainer.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isLoading: SetType,
  hasErrored: PropTypes.bool.isRequired,
  refKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string.isRequired]).isRequired,
  isPV: PropTypes.bool,
  isTandem: PropTypes.bool,
  sortType: PropTypes.string,
  limit: PropTypes.number,
  page: PropTypes.number,
};

FavoriteContainer.defaultProps = {
  isLoading: new Set(),
  isPV: false,
  isTandem: false,
  sortType: null,
  limit: 15,
  page: 1,
};

export const mapStateToProps = state => ({
  isLoading: state.userProfileFavoritePositionIsLoading,
  hasErrored: state.userProfileFavoritePositionHasErrored || false,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggle: (id, remove, refresh = false, isTandem = false) => {
    dispatch(userProfileToggleFavoritePosition(id, remove, refresh, get(ownProps, 'isPV'), get(ownProps, 'sortType'), isTandem));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContainer);
