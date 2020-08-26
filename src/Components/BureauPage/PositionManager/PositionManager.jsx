import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { POSITION_MANAGER_PAGE_SIZES, BUREAU_POSITION_SORT } from 'Constants/Sort';
import { FILTERS_PARENT, POSITION_SEARCH_RESULTS } from 'Constants/PropTypes';
import Picky from 'react-picky';
// import { merge } from 'lodash';
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
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedTEDs, setSelectedTEDs] = useState([]);

  const { bureauFilters, bureauPositions } = props;
  const bureauFilters$ = bureauFilters.filters;
  const teds = bureauFilters$.find(f => f.item.description === 'tod');
  const grades = bureauFilters$.find(f => f.item.description === 'grade');
  const skills = bureauFilters$.find(f => f.item.description === 'skillCone');
  const posts = bureauFilters$.find(f => f.item.description === 'post');

  const query = {
    [grades.item.selectionRef]: selectedGrades.map(gradeObject => (gradeObject.code)),
    // Need to figure out selectionRef or however else we do it for skill cones
    // [skills.item.selectionRef]: selectedSkills,
    [posts.item.selectionRef]: selectedPosts.map(postObject => (postObject.code)),
    [teds.item.selectionRef]: selectedTEDs.map(tedObject => (tedObject.code)),
  };
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;
  const sortBy = BUREAU_POSITION_SORT;

  function submitSearch(text) {
    props.fetchBureauPositions({ q: text });
  }

  useEffect(() => {
    props.fetchFilters(bureauFilters, {});
    // if we want to do anything with our selected values once they update
  }, []);

  useEffect(() => {
    props.fetchBureauPositions(query);
    // if we want to do anything with our selected values once they update
  }, [selectedGrades, selectedSkills, selectedPosts, selectedTEDs]);

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


  function renderPostList({ items, selected, ...rest }) {
    formatPosts(items);
    const getCodeSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="post_name" getIsSelected={getCodeSelected} />);
  }

  function renderTedList({ items, selected, ...rest }) {
    const getCodeSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="long_description" getIsSelected={getCodeSelected} />);
  }

  function renderSkillList({ items, selected, ...rest }) {
    const getIDSelected = item => !!selected.find(f => f.id === item.id);
    return items.map(item => <ListItem key={item.id} item={item} {...rest} queryProp="name" getIsSelected={getIDSelected} />);
  }

  function renderGradeList({ items, selected, ...rest }) {
    const getCodeSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="custom_description" getIsSelected={getCodeSelected} />);
  }

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
                    options={teds.data}
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
                    options={posts.data}
                    onChange={values => setSelectedPosts(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderPostList}
                    valueKey="code"
                    labelKey={'post_name'}
                    includeSelectAll
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Skill:</div>
                  <Picky
                    placeholder="Select Skill(s)"
                    value={selectedSkills}
                    options={skills.data}
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
                    options={grades.data}
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
        results={bureauPositions.results}
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
      { !!bureauPositions.results &&
      <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
        <div className="usa-grid-full position-list">
          {bureauPositions.results.map((result) => (
            <BureauResultsCard result={result} />
          ))}
        </div>
      </div>
      }
    </div>
  );
};

PositionManager.propTypes = {
  fetchBureauPositions: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  bureauFilters: FILTERS_PARENT,
  bureauPositions: POSITION_SEARCH_RESULTS,
};

PositionManager.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
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
  fetchBureauPositions: query => dispatch(bureauPositionsFetchData(query)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionManager);
