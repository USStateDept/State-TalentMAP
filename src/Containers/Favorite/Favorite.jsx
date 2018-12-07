import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import Favorite from '../../Components/Favorite';

const FavoriteContainer = ({
  onToggle,
  isLoading,
  hasErrored,
  ...rest }) => (
    <Favorite onToggle={onToggle} isLoading={isLoading} hasErrored={hasErrored} {...rest} />
);

FavoriteContainer.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  isLoading: state.userProfileFavoritePositionIsLoading || false,
  hasErrored: state.userProfileFavoritePositionHasErrored || false,
});

export const mapDispatchToProps = dispatch => ({
  onToggle: (id, remove, refresh = false) =>
    dispatch(userProfileToggleFavoritePosition(id, remove, refresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContainer);
