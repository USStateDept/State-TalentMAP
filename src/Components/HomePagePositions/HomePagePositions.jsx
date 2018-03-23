import React from 'react';
import PropTypes from 'prop-types';
import { get, merge } from 'lodash';
import shortid from 'shortid';
import HomePagePositionsSection from '../HomePagePositionsSection';
import {
  HOME_PAGE_POSITIONS,
  FAVORITED_POSITIONS,
  BID_RESULTS,
  RECENTLY_POSTED_POSITIONS,
  SERVICE_NEED_POSITIONS,
  USER_GRADE_RECENT_POSITIONS,
  USER_PROFILE,
  USER_SKILL_CODE_POSITIONS,
} from '../../Constants/PropTypes';

const HomePagePositions = (props) => {
  const {
    bidList,
    homePagePositions,
    homePagePositionsIsLoading: isLoading,
    userProfile: {
      favorite_positions: favorites,
      grade,
      skills,
    },
    userProfileFavoritePositionIsLoading,
    userProfileFavoritePositionHasErrored,
    toggleBid,
    toggleFavorite,
  } = props;

  const sections = [];

  const addSection = ({ type = 'default', ...rest }) => {
    sections.push(merge({
      type,
      maxLength: 3,
      favorites,
      bidList,
      userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored,
      toggleFavorite,
      toggleBid,
      isLoading,
    }, rest));
  };

  let positions;
  let title;
  let viewMoreLink;

  // Create positions lookup
  const Positions = {
    service: get(homePagePositions, SERVICE_NEED_POSITIONS, []),
    skill: get(homePagePositions, USER_SKILL_CODE_POSITIONS, []),
    favorited: get(homePagePositions, FAVORITED_POSITIONS, []),
    grade: get(homePagePositions, USER_GRADE_RECENT_POSITIONS, []),
    recent: get(homePagePositions, RECENTLY_POSTED_POSITIONS, []),
  };

  /**
   * ~ [Section] Service Positions ~
   */
  addSection({
    type: 'serviceNeed',
    icon: 'bolt',
    title: 'Service Needs Positions',
    // Service needs positions. This won't change since it doesn't rely on user data.
    positions: Positions.service,
    // Set "View More link" for service needs
    viewMoreLink: '/results?is_highlighted=true',
  });

  /**
   * ~ [Section] Skills/Favorited Positions ~
   *   1. If the user HAS skills, we'll display in-skill positions.
   *   2. If the user DOES NOT have skills, we'll display favorited positions.
   */

  positions = Positions.skill;

  if (Positions.skill.length) {
    // Form a link to view positions with the user's skills
    const ids = skills.map(skill => skill.code).join(',');
    const skill = get(Positions.skill, '[0].skill');
    // Update the title based on the related skills
    title = `Positions in ${skill}`;
    viewMoreLink = `/results?skill__code__in=${ids}`;
  } else if (Positions.favorited) {
    // Update everything to denote that these are favorited positions
    title = 'Favorited Positions';
    positions = Positions.favorited;
    viewMoreLink = '/profile/favorites/';
  } else {
    title = 'Positions in Skill';
    viewMoreLink = '/results';
  }

  addSection({
    title,
    icon: 'briefcase',
    positions,
    viewMoreLink,
  });

  /**
   * ~ [Section] Grade/Recent Positions ~
   *   1. If the user HAS a grade, we'll display in-grade, recent positions.
   *   2. If the user DOES NOT have a grade, we'll display recent positions.
   */
  positions = Positions.grade;

  if (Positions.grade.length) {
    // Update the title based on the user's grade
    title = `Recently Posted Positions in Grade ${grade}`;
    // Update the link to view positions with the user's grade
    viewMoreLink = `/results?grade__code__in=${grade}`;
  } else if (Positions.recent) {
    // Update everything to to denote that these are recently posted positions
    title = 'Recently Posted Positions';
    positions = Positions.recent;
    viewMoreLink = '/results?ordering=description__date_created';
  } else {
    title = '';
    viewMoreLink = '/results';
  }

  addSection({
    title,
    icon: 'flag',
    positions,
    viewMoreLink,
  });

  return (
    <div className="homepage-positions-section-container">
      <div className="usa-grid-full homepage-positions-section-container-inner padded-main-content">
        {sections.map(section => (
          <HomePagePositionsSection key={shortid.generate()} {...section} />
        ))}
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
