import React from 'react';
import PropTypes from 'prop-types';
import { HOME_PAGE_POSITIONS, USER_PROFILE, BID_RESULTS,
  USER_SKILL_AND_GRADE_POSITIONS, USER_GRADE_POSITIONS, FAVORITED_POSITIONS, HIGHLIGHTED_POSITIONS } from '../../Constants/PropTypes';
import HomePagePositionsSection from '../HomePagePositionsSection';

const HomePagePositions = ({ homePagePositions, homePagePositionsIsLoading,
  userProfile, bidList }) => {
  const userSkillAndGradePositions = homePagePositions[USER_SKILL_AND_GRADE_POSITIONS];
  const userGradePositions = homePagePositions[USER_GRADE_POSITIONS];
  const favoritedPositions = homePagePositions[FAVORITED_POSITIONS];
  const serviceNeedPositions = homePagePositions[HIGHLIGHTED_POSITIONS];
  let positions;
  let title;
  let link;
  let icon;

  // set View More link for service needs
  const serviceNeedsLink = '/results?is_highlighted=true';

  // arrangement:
  // 1: userSkillAndGradePositions
  // 2: userGradePositions
  // 3: favoritedPositions
  if (userSkillAndGradePositions && userSkillAndGradePositions.length) {
    positions = userSkillAndGradePositions;
    title = 'Positions That Match Your Grade And Skill(s)';
    const ids = userProfile.employee_info.skills.map(s => s.code);
    link = `/results?position__skill__code__in=${ids.join(',')}&position__grade__code__in=${userProfile.employee_info.grade}`;
    icon = 'briefcase';
  } else if (userGradePositions && userGradePositions.length) {
    positions = userGradePositions;
    title = 'Positions That Match Your Grade';
    link = `/results?position__grade__code__in=${userProfile.employee_info.grade}`;
    icon = 'briefcase';
  } else {
    positions = favoritedPositions;
    title = 'Favorited Positions';
    link = '/profile/favorites/';
    icon = 'star';
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
          title={title}
          maxLength="3"
          viewMoreLink={link}
          icon={icon}
          favorites={userProfile.favorite_positions}
          positions={positions}
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
