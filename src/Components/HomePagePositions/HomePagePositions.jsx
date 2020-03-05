import React from 'react';
import PropTypes from 'prop-types';
import { HOME_PAGE_POSITIONS, USER_PROFILE, BID_RESULTS,
  USER_SKILL_CODE_POSITIONS, SERVICE_NEED_POSITIONS, FAVORITED_POSITIONS } from '../../Constants/PropTypes';
import HomePagePositionsSection from '../HomePagePositionsSection';

const HomePagePositions = ({ homePagePositions, homePagePositionsIsLoading,
  userProfile, bidList }) => {
  // Conditionally set the position types in rows two and three.
  // Based on which we display, we have to format the title, link, and positions
  // to provide to the component.

  // Service need positions.
  // Unlike our other positions, this won't change since it doesn't rely on user data.
  const serviceNeedPositions = homePagePositions[SERVICE_NEED_POSITIONS];
  // set View More link for service needs
  const serviceNeedsLink = '/results?is_highlighted=true';

  // Define row two data.
  // If the user has skills, we'll display in-skill positions.
  // If the user does not have skills, we'll display favorited positions.
  const userSkillCodePositions = homePagePositions[USER_SKILL_CODE_POSITIONS];
  const favoritedPositions = homePagePositions[FAVORITED_POSITIONS];
  let rowTwoPositions = userSkillCodePositions;
  let rowTwoTitle = 'Positions in Skills';
  let rowTwoLink = '/results';
  let rowTwoIcon = 'briefcase';
  if (rowTwoPositions && rowTwoPositions.length) {
    // form a link to view positions with the user's skills
    const ids = userProfile.skills.map(s => s.code);
    rowTwoLink = `/results?position__skill__code__in=${ids.join(',')}`;
    // update the title based on the related skills
    rowTwoTitle = `Positions in ${homePagePositions[USER_SKILL_CODE_POSITIONS][0].position.skill}`;
  } else if (favoritedPositions) {
    // update everything to denote that these are favorited positions
    rowTwoPositions = favoritedPositions;
    rowTwoTitle = 'Favorited Positions';
    rowTwoLink = '/profile/favorites/';
    rowTwoIcon = 'star';
  }
  return (
    <div className="homepage-positions-section-container">
      <div
        className="usa-grid-full homepage-positions-section-container-inner padded-main-content"
      >
        {
          // don't display this section if there are none
          serviceNeedPositions && !!serviceNeedPositions.length &&
            <HomePagePositionsSection
              title="Featured Positions"
              maxLength="3"
              viewMoreLink={serviceNeedsLink}
              icon="bolt"
              favorites={userProfile.favorite_positions}
              positions={serviceNeedPositions}
              isLoading={homePagePositionsIsLoading}
              bidList={bidList}
              type="serviceNeed"
            />
        }
        <HomePagePositionsSection
          title={rowTwoTitle}
          maxLength="3"
          viewMoreLink={rowTwoLink}
          icon={rowTwoIcon}
          favorites={userProfile.favorite_positions}
          positions={rowTwoPositions}
          isLoading={homePagePositionsIsLoading}
          bidList={bidList}
          type="default"
        />
      </div>
    </div>
  );
};

HomePagePositions.propTypes = {
  homePagePositions: HOME_PAGE_POSITIONS.isRequired,
  homePagePositionsIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE,
  bidList: BID_RESULTS.isRequired,
};

HomePagePositions.defaultProps = {
  userProfile: {},
  filtersIsLoading: false,
  homePagePositionsIsLoading: false,
};

export default HomePagePositions;
