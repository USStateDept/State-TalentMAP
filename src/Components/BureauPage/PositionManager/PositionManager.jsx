import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { POSITION_MANAGER_PAGE_SIZES, BUREAU_POSITION_SORT } from 'Constants/Sort';
import { FILTERS_PARENT } from 'Constants/PropTypes';
import Picky from 'react-picky';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PositionManagerSearch from './PositionManagerSearch';
import BureauResultsCard from '../BureauResultsCard';
import ListItem from '../../BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { bureauPositionsFetchData } from '../../../actions/bureauPositions';
import { filtersFetchData } from '../../../actions/filters/filters';
import ResultsControls from '../../ResultsControls/ResultsControls';


const PositionManager = props => {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [sortType, setSortType] = useState();
  const limit = 15;

  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedTEDs, setSelectedTEDs] = useState([]);


  const { bureauFilters } = props;
  const bureauFilters$ = bureauFilters.filters;
  const teds = bureauFilters$.find(f => f.item.description === 'tod').data;
  const grades = bureauFilters$.find(f => f.item.description === 'grade').data;
  const skills = bureauFilters$.find(f => f.item.description === 'skillCone').data;
  const posts = bureauFilters$.find(f => f.item.description === 'post').data;

  console.log(bureauFilters);
  console.log(teds);
  console.log(grades);
  console.log(skills);
  console.log(posts);

  const pageSizes = POSITION_MANAGER_PAGE_SIZES;
  const sortBy = BUREAU_POSITION_SORT;

  function submitSearch(q) {
    props.fetchBureauPositions(sortType, limit, page, q);
  }

  useEffect(() => {
    props.fetchBureauPositions(sortType, limit, page);
    props.fetchFilters(bureauFilters, {});
    // if we want to do anything with our selected values once they update
  }, []);

  function renderPostList({ items, selected, ...rest }) {
    const getIsSelected = item => !!selected.find(f => f.value === item.value);
    return items.map(item => <ListItem key={item.value} item={item} {...rest} queryProp="long_description" getIsSelected={getIsSelected} />);
  }

  function renderTedList({ items, selected, ...rest }) {
    const getIsSelected = item => !!selected.find(f => f.value === item.value);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="long_description" getIsSelected={getIsSelected} />);
  }

  function renderSkillList({ items, selected, ...rest }) {
    const getIsSelected = item => !!selected.find(f => f.value === item.value);
    return items.map(item => <ListItem key={item.id} item={item} {...rest} queryProp="name" getIsSelected={getIsSelected} />);
  }

  function renderGradeList({ items, selected, ...rest }) {
    const getIsSelected = item => !!selected.find(f => f.value === item.value);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="custom_description" getIsSelected={getIsSelected} />);
  }

  const formatPosts = (posts$) => (
    posts$.map(post => {
      if (post.is_domestic) {
        // eslint-disable-next-line no-param-reassign
        post.post_name = `${post.city}, ${post.state}`;
      } else {
        // eslint-disable-next-line no-param-reassign
        post.post_name = `${post.city}, ${post.country}`;
      }
      return { ...post };
    })
  );

  return (
    <div className="bureau-page">
      <div className="usa-grid-full position-manager-upper-section">
        <div className="results-search-bar padded-main-content results-single-search homepage-offset">
          <div className="usa-grid-full results-search-bar-container">
            <ProfileSectionTitle title="Position Manager" icon="map" />
            <PositionManagerSearch submitSearch={submitSearch} />
            <div className="filterby-label">Filter by:</div>
            <div className="usa-width-one-whole position-manager-filters results-dropdown">
              <div className="small-screen-stack position-manager-filters-inner">
                <div className="filter-div">
                  <div className="label">TED:</div>
                  <Picky
                    placeholder="Select TED(s)"
                    value={selectedTEDs}
                    options={teds}
                    onChange={values => setSelectedTEDs(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderTedList}
                    valueKey="code"
                    labelKey="long_description"
                    includeSelectAll
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Post:</div>
                  <Picky
                    placeholder="Select Post(s)"
                    value={selectedPosts}
                    options={posts}
                    onChange={values => setSelectedPosts(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderPostList}
                    valueKey="code"
                    labelKey={formatPosts(posts)}
                    includeSelectAll
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Skill:</div>
                  <Picky
                    placeholder="Select Skill(s)"
                    value={selectedSkills}
                    options={skills}
                    onChange={values => setSelectedSkills(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderSkillList}
                    valueKey="id"
                    labelKey="name"
                    includeSelectAll
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Grade:</div>
                  <Picky
                    placeholder="Select Grade(s)"
                    value={selectedGrades}
                    options={grades}
                    onChange={values => setSelectedGrades(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderGradeList}
                    valueKey="code"
                    labelKey="custom_description"
                    includeSelectAll
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResultsControls
        results={{}}
        hasLoaded
        defaultSort={''}
        pageSizes={pageSizes}
        defaultPageSize={10}
        sortBy={sortBy}
        defaultPageNumber={1}
        queryParamUpdate={() => {}}
        containerClass="bureau-results-controls"
        pageSizeClass="bureau-page-size"
        hideSaveSearch
      />
      <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
        <div className="usa-grid-full position-list">
          {[...Array(10).keys()].map((m) => (
            <BureauResultsCard key={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

PositionManager.propTypes = {
  fetchBureauPositions: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  bureauFilters: FILTERS_PARENT,
};

PositionManager.defaultProps = {
  bureauFilters: { filters: [] },
};

const mapStateToProps = state => ({
  bureauPositions: state.bureauPositions,
  bureauPositionsIsLoading: state.bureauPositionsIsLoading,
  bureauPositionsHasErrored: state.bureauPositionsHasErrored,
  bureauFilters: state.filters,
  bureauFiltersHasErrored: state.filtersHasErrored,
  bureauFiltersIsLoading: state.filtersIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchBureauPositions: (sortType, limit, page, q) =>
    dispatch(bureauPositionsFetchData(sortType, limit, page, q)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionManager);
