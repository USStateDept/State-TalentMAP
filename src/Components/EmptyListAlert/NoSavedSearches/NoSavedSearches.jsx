import React from 'react';
import EmptyListAlert from '../EmptyListAlert';

const NoSavedSearches = () => {
  const textLineTwo = `Reuse this job search in the future by clicking "Save this search".
  Try naming your search something memorable, like "Summer Positions 2018".`;
  return (
    <EmptyListAlert
      textLineOne="You haven't saved any searches."
      textLineTwo={
      (
        <span>{textLineTwo}</span>
      )
    }
    />
  );
};

export default NoSavedSearches;
