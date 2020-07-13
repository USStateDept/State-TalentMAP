import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import EmptyListAlert from '../EmptyListAlert';

const NoFavorites = ({ isTandem }) => (
  <EmptyListAlert
    textLineOne={isTandem ? 'Please favorite at least one position for yourself and one for your tandem from Tandem search.' : "You haven't added any favorites."}
    textLineTwo={isTandem ?
      (
        <span>
          Collect your favorite job positions by clicking on the <FontAwesome name="star-o" />
          <span className="sr-only">star icon</span> while you tandem search.
        </span>
      )
      :
      (
        <span>
          Collect your favorite job positions by clicking on the <FontAwesome name="star-o" />
          <span className="sr-only">star icon</span> while you search.
        </span>
      )
    }
  />
);

NoFavorites.propTypes = {
  isTandem: PropTypes.bool,
};

NoFavorites.defaultProps = {
  isTandem: false,
};

export default NoFavorites;
