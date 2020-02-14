import React from 'react';
import EmptyListAlert from '../EmptyListAlert';

const NoSavedSearches = () => {
  const textLineTwo = `Reuse this job search in the future by clicking "Save Search".
  Try naming your search something memorable, like "Summer Positions in My Grade".`;
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
