import React from 'react';
import PropTypes from 'prop-types';
import { HOME_PAGE_POSITIONS, USER_PROFILE, BID_RESULTS,
USER_SKILL_CODE_POSITIONS, USER_GRADE_RECENT_POSITIONS, SERVICE_NEED_POSITIONS,
RECENTLY_POSTED_POSITIONS, FAVORITED_POSITIONS } from '../../Constants/PropTypes';
import { COMMON_PROPERTIES } from '../../Constants/EndpointParams';
import HomePagePositionsSection from '../HomePagePositionsSection';

const HomePagePositions = ({ homePagePositions, homePagePositionsIsLoading,
  userProfile, toggleFavorite, toggleBid, bidList,
  userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored }) => {
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
    rowTwoLink = `/results?skill__code__in=${ids.join(',')}`;
    // update the title based on the related skills
    rowTwoTitle = `Positions in ${homePagePositions[USER_SKILL_CODE_POSITIONS][0].skill}`;
  } else if (favoritedPositions) {
    // update everything to denote that these are favorited positions
    rowTwoPositions = favoritedPositions;
    rowTwoTitle = 'Favorited Positions';
    rowTwoLink = '/profile/favorites/';
    rowTwoIcon = 'star';
  }

  // Define row three data.
  // If the user has a grade, we'll display in-grade, recent positions.
  // If the user does not have a grade, we'll display recent positions.
  const userGradeRecentPositions = homePagePositions[USER_GRADE_RECENT_POSITIONS];
  const recentPositions = homePagePositions[RECENTLY_POSTED_POSITIONS];
  let rowThreeTitle = 'Recently Posted Positions in Grade';
  let rowThreePositions = userGradeRecentPositions;
  let rowThreeLink = '/results';
  if (userGradeRecentPositions) {
    // update the link to view positions with the user's grade
    rowThreeLink = `/results?grade__code__in=${userProfile.grade}&ordering=-${COMMON_PROPERTIES.posted}`;
    // update the title based on the user's grade
    rowThreeTitle = `${rowThreeTitle} ${userProfile.grade}`;
  } else if (recentPositions) {
    // update everything to to denote that these are recently posted positions
    rowThreePositions = recentPositions;
    rowThreeTitle = 'Recently Posted Positions';
    rowThreeLink = `/results?ordering=-${COMMON_PROPERTIES.posted}`;
  }
  return (
    <div className="homepage-positions-section-container">
      <div
        className="usa-grid-full homepage-positions-section-container-inner padded-main-content"
      >
        <HomePagePositionsSection
          title="Service Needs Positions"
          maxLength="3"
          viewMoreLink={serviceNeedsLink}
          icon="bolt"
          favorites={userProfile.favorite_positions}
          toggleFavorite={toggleFavorite}
          userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          positions={serviceNeedPositions}
          isLoading={homePagePositionsIsLoading}
          toggleBid={toggleBid}
          bidList={bidList}
          type="serviceNeed"
        />
        <HomePagePositionsSection
          title={rowTwoTitle}
          maxLength="3"
          viewMoreLink={rowTwoLink}
          icon={rowTwoIcon}
          favorites={userProfile.favorite_positions}
          toggleFavorite={toggleFavorite}
          userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          positions={rowTwoPositions}
          isLoading={homePagePositionsIsLoading}
          toggleBid={toggleBid}
          bidList={bidList}
          type="default"
        />
        <HomePagePositionsSection
          title={rowThreeTitle}
          maxLength="3"
          viewMoreLink={rowThreeLink}
          icon="flag"
          favorites={userProfile.favorite_positions}
          toggleFavorite={toggleFavorite}
          userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          positions={rowThreePositions}
          isLoading={homePagePositionsIsLoading}
          toggleBid={toggleBid}
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
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

HomePagePositions.defaultProps = {
  userProfile: {},
  filtersIsLoading: false,
  homePagePositionsIsLoading: false,
};

export default HomePagePositions;
