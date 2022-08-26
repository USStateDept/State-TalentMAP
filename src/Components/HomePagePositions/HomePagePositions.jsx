import PropTypes from 'prop-types';
import { get } from 'lodash';
import { SPECIAL_NEEDS } from 'Constants/EndpointParams';
import { BID_RESULTS, HOME_PAGE_FEATURED_POSITIONS, HOME_PAGE_RECOMMENDED_POSITIONS, USER_PROFILE } from 'Constants/PropTypes';
import HomePagePositionsSection from '../HomePagePositionsSection';

const HomePagePositions = ({ homePageFeaturedPositions,
  homePageFeaturedPositionsIsLoading,
  homePageRecommendedPositions,
  homePageRecommendedPositionsIsLoading,
  userProfile, bidList }) => {
  const featuredPositions = homePageFeaturedPositions.positions;
  const recommendedPositions = homePageRecommendedPositions.positions;
  let featuredTitle;
  let featuredLink;
  let featuredIcon;
  let recommendedTitle;
  let recommendedLink;
  let recommendedIcon;

  const specialNeedsParams = SPECIAL_NEEDS.join(',');

  const ids = get(userProfile, 'employee_info.skills', []).map(s => s.code);
  const coneIds = get(userProfile, 'employee_info.skills_additional', []);

  // Make sure these line up with the actual queries in /actions/homePagePositions.js
  switch (homePageFeaturedPositions.name) {
    case 'featuredGradeAndSkillPositions':
      featuredTitle = 'Featured Positions That Match Your Grade And Skill(s)';
      featuredLink = `/results?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}&position__skill__code__in=${ids.join(',')}&position__grade__code__in=${userProfile.employee_info.grade}`;
      featuredIcon = 'bolt';
      break;
    case 'featuredGradeAndSkillConePositions':
      featuredTitle = 'Featured Positions That Match Your Grade And Skill Cone(s)';
      featuredLink = `/results?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}&position__skill__code__in=${coneIds.join(',')}&position__grade__code__in=${userProfile.employee_info.grade}`;
      featuredIcon = 'bolt';
      break;
    case 'featuredGradePositions':
      featuredTitle = 'Featured Positions That Match Your Grade';
      featuredLink = `/results?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}&position__grade__code__in=${userProfile.employee_info.grade}`;
      featuredIcon = 'bolt';
      break;
    default:
      featuredTitle = 'Featured Positions';
      featuredLink = `/results?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}`;
      featuredIcon = 'bolt';
      break;
  }

  switch (homePageRecommendedPositions.name) {
    case 'recommendedGradeAndSkillPositions':
      recommendedTitle = 'Positions That Match Your Grade And Skill(s)';
      recommendedLink = `/results?cps_codes=OP&position__skill__code__in=${ids.join(',')}&position__grade__code__in=${userProfile.employee_info.grade}`;
      recommendedIcon = 'briefcase';
      break;
    case 'recommendedGradeAndSkillConePositions':
      recommendedTitle = 'Positions That Match Your Grade And Skill Cone(s)';
      recommendedLink = `/results?cps_codes=OP&position__skill__code__in=${coneIds.join(',')}&position__grade__code__in=${userProfile.employee_info.grade}`;
      recommendedIcon = 'briefcase';
      break;
    case 'recommendedGradePositions':
      recommendedTitle = 'Positions That Match Your Grade';
      recommendedLink = `/results?cps_codes=OP&position__grade__code__in=${userProfile.employee_info.grade}`;
      recommendedIcon = 'briefcase';
      break;
    default:
      recommendedTitle = 'Favorited Positions';
      recommendedLink = '/profile/favorites/';
      recommendedIcon = 'star';
      break;
  }

  return (
    <div className="homepage-positions-section-container">
      <div
        className="usa-grid-full homepage-positions-section-container-inner padded-main-content"
      >
        {
          featuredPositions &&
          <HomePagePositionsSection
            title={featuredTitle}
            maxLength="3"
            viewMoreLink={featuredLink}
            icon={featuredIcon}
            favorites={userProfile.favorite_positions}
            positions={featuredPositions}
            isLoading={homePageFeaturedPositionsIsLoading}
            bidList={bidList}
            type="default"
            name={homePageFeaturedPositions.name}
          />
        }
        <HomePagePositionsSection
          title={recommendedTitle}
          maxLength="3"
          viewMoreLink={recommendedLink}
          icon={recommendedIcon}
          favorites={userProfile.favorite_positions}
          positions={recommendedPositions}
          isLoading={homePageRecommendedPositionsIsLoading}
          bidList={bidList}
          type="default"
        />
      </div>
    </div>
  );
};

HomePagePositions.propTypes = {
  homePageFeaturedPositions: HOME_PAGE_FEATURED_POSITIONS.isRequired,
  homePageFeaturedPositionsIsLoading: PropTypes.bool,
  homePageRecommendedPositions: HOME_PAGE_RECOMMENDED_POSITIONS.isRequired,
  homePageRecommendedPositionsIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE,
  bidList: BID_RESULTS.isRequired,
};

HomePagePositions.defaultProps = {
  userProfile: {},
  filtersIsLoading: false,
  homePageFeaturedPositionsIsLoading: false,
  homePageRecommendedPositionsIsLoading: false,
};

export default HomePagePositions;
