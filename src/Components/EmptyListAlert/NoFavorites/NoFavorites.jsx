import React from 'react';
import FontAwesome from 'react-fontawesome';
import EmptyListAlert from '../EmptyListAlert';

const NoFavorites = () => (
  <EmptyListAlert
    textLineOne="You haven't added any favorites."
    textLineTwo={
      (
        <span>
          Collect your favorite job positions by clicking on the <FontAwesome name="star-o" />
          <span className="sr-only">star icon</span> while you search.
        </span>
      )
    }
  />
);

export default NoFavorites;
