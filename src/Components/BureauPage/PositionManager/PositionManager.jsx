import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BUREAU_POSITION_SORT, POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { FILTERS_PARENT, POSITION_SEARCH_RESULTS, BUREAU_PERMISSIONS } from 'Constants/PropTypes';
import Picky from 'react-picky';
import { get, sortBy } from 'lodash';
import { bureauPositionsFetchData, downloadBureauPositionsData } from 'actions/bureauPositions';
import Spinner from 'Components/Spinner';
import ExportButton from 'Components/ExportButton';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import TotalResults from 'Components/TotalResults';
import PaginationWrapper from 'Components/PaginationWrapper';
import Alert from 'Components/Alert';
import { scrollToTop, getPostName } from 'utilities';
import { usePrevious } from 'hooks';
import PositionManagerSearch from './PositionManagerSearch';
import BureauResultsCard from '../BureauResultsCard';
import ListItem from '../../BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { filtersFetchData } from '../../../actions/filters/filters';
import SelectForm from '../../SelectForm';


const PositionManager = props => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [ordering, setOrdering] = useState(BUREAU_POSITION_SORT.options[0].value);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedTEDs, setSelectedTEDs] = useState([]);
  const [selectedBureaus, setSelectedBureaus] = useState([props.bureauPermissions[0]]);
  const [isLoading, setIsLoading] = useState(false);
  const [textSearch, setTextSearch] = useState();
  const [textInput, setTextInput] = useState();

  const noBureausSelected = selectedBureaus.length < 1;

  const {
    bureauPermissions,
    bureauFilters,
    bureauPositions,
    bureauFiltersIsLoading,
    bureauPositionsIsLoading } = props;
  const bureauFilters$ = bureauFilters.filters;
  const teds = bureauFilters$.find(f => f.item.description === 'tod');
  const grades = bureauFilters$.find(f => f.item.description === 'grade');
  const skills = bureauFilters$.find(f => f.item.description === 'skill');
  const posts = bureauFilters$.find(f => f.item.description === 'post');
  const bureaus = bureauFilters$.find(f => f.item.description === 'region');
  const sorts = BUREAU_POSITION_SORT;
  const prevPage = usePrevious(page);

  const query = {
    [grades.item.selectionRef]: selectedGrades.map(gradeObject => (gradeObject.code)),
    [skills.item.selectionRef]: selectedSkills.map(skillObject => (skillObject.code)),
    [posts.item.selectionRef]: selectedPosts.map(postObject => (postObject.code)),
    [teds.item.selectionRef]: selectedTEDs.map(tedObject => (tedObject.code)),
    [bureaus.item.selectionRef]: selectedBureaus.map(bureauObject => (bureauObject.code)),
    ordering,
    page,
    limit,
    q: textInput || textSearch,
  };

  const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  function submitSearch(text) {
    setTextSearch(text);
  }

  useEffect(() => {
    props.fetchFilters(bureauFilters, {});
    props.fetchBureauPositions(query);
  }, []);

  useEffect(() => {
    if ((page === 1) && prevPage) { props.fetchBureauPositions(query); }
    setPage(1);
  }, [
    selectedGrades,
    selectedSkills,
    selectedPosts,
    selectedTEDs,
    selectedBureaus,
    ordering,
    limit,
    textSearch,
  ]);

  useEffect(() => {
    scrollToTop({ delay: 0, duration: 400 });
    if (prevPage) {
      props.fetchBureauPositions(query);
    }
  }, [page]);

  const posts$ = sortBy(posts.data, [(p) => p.city])
    .map(post => {
      // eslint-disable-next-line no-param-reassign
      post.post_name = getPostName(post);
      return { ...post };
    });

  function renderPostList({ items, selected, ...rest }) {
    const getCodeSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="post_name" getIsSelected={getCodeSelected} />);
  }

  function renderTedList({ items, selected, ...rest }) {
    const getCodeSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="long_description" getIsSelected={getCodeSelected} />);
  }

  function renderSkillList({ items, selected, ...rest }) {
    const getIDSelected = item => !!selected.find(f => f.id === item.id);
    return items.map(item => <ListItem key={item.id} item={item} {...rest} queryProp="custom_description" getIsSelected={getIDSelected} />);
  }

  function renderGradeList({ items, selected, ...rest }) {
    const getCodeSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="custom_description" getIsSelected={getCodeSelected} />);
  }

  function renderBureauList({ items, selected, ...rest }) {
    const getBureauSelected = item => !!selected.find(f => f.code === item.code);
    return items.map(item => <ListItem key={item.code} item={item} {...rest} queryProp="long_description" getIsSelected={getBureauSelected} />);
  }

  const exportPositions = () => {
    if (!isLoading) {
      setIsLoading(true);
      downloadBureauPositionsData(query)
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  const getOverlay = () => {
    if (bureauPositionsIsLoading) {
      return (<Spinner type="bureau-results" class="homepage-position-results" size="big" />);
    } else if (noBureausSelected) {
      return (<Alert type="error" title="No bureau selected" messages={[{ body: 'Please select at least one bureau filter.' }]} />);
    } else if (!get(bureauPositions, 'results.length')) {
      return (<Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />);
    }
    return false;
  };

  return (
    bureauFiltersIsLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="bureau-page">
          <div className="usa-grid-full position-manager-upper-section">
            <div className="results-search-bar padded-main-content results-single-search homepage-offset">
              <div className="usa-grid-full results-search-bar-container">
                <ProfileSectionTitle title="Position Manager" icon="map" />
                <PositionManagerSearch submitSearch={submitSearch} onChange={setTextInput} />
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
                        options={posts$}
                        onChange={values => setSelectedPosts(values)}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderPostList}
                        valueKey="code"
                        labelKey="post_name"
                      />
                    </div>
                    <div className="filter-div">
                      <div className="label">Bureau:</div>
                      <Picky
                        placeholder="Select Bureau(s)"
                        value={selectedBureaus}
                        options={bureauPermissions}
                        onChange={values => setSelectedBureaus(values)}
                        numberDisplayed={2}
                        multiple
                        includeFilter
                        dropdownHeight={255}
                        renderList={renderBureauList}
                        valueKey="code"
                        labelKey="long_description"
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
                        valueKey="code"
                        labelKey="custom_description"
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
          {
            getOverlay() ||
              <>
                <div className="usa-width-one-whole results-dropdown bureau-controls-container">
                  <TotalResults
                    total={bureauPositions.count}
                    pageNumber={page}
                    pageSize={limit}
                    suffix="Results"
                    isHidden={bureauPositionsIsLoading}
                  />
                  <div className="bureau-controls-right">
                    <div className="bureau-results-controls">
                      <SelectForm
                        id="position-manager-num-results"
                        options={sorts.options}
                        label="Sort by:"
                        defaultSort={ordering}
                        onSelectOption={value => setOrdering(value.target.value)}
                        disabled={bureauPositionsIsLoading}
                      />
                      <SelectForm
                        id="position-manager-num-results"
                        options={pageSizes.options}
                        label="Results:"
                        defaultSort={limit}
                        onSelectOption={value => setLimit(value.target.value)}
                        disabled={bureauPositionsIsLoading}
                      />
                    </div>
                    <div className="export-button-container">
                      <ExportButton
                        onClick={exportPositions}
                        isLoading={isLoading}
                        disabled={noBureausSelected}
                      />
                    </div>
                  </div>
                </div>
                <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
                  <div className="usa-grid-full position-list">
                    {bureauPositions.results.map((result) => (
                      <BureauResultsCard result={result} key={result.id} />
                    ))}
                  </div>
                </div>
                <div className="usa-grid-full react-paginate bureau-pagination-controls">
                  <PaginationWrapper
                    pageSize={limit}
                    onPageChange={p => setPage(p.page)}
                    forcePage={page}
                    totalResults={bureauPositions.count}
                  />
                </div>
              </>
          }
        </div>
      </>
  );
};

PositionManager.propTypes = {
  fetchBureauPositions: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  bureauFilters: FILTERS_PARENT,
  bureauPositions: POSITION_SEARCH_RESULTS,
  bureauFiltersIsLoading: PropTypes.bool,
  bureauPositionsIsLoading: PropTypes.bool,
  bureauPermissions: BUREAU_PERMISSIONS,
};

PositionManager.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
  bureauPermissions: [],
};

const mapStateToProps = state => ({
  bureauPositions: state.bureauPositions,
  bureauPositionsIsLoading: state.bureauPositionsIsLoading,
  bureauPositionsHasErrored: state.bureauPositionsHasErrored,
  bureauFilters: state.filters,
  bureauFiltersHasErrored: state.filtersHasErrored,
  bureauFiltersIsLoading: state.filtersIsLoading,
  bureauPermissions: state.userProfile.bureau_permissions,
});

export const mapDispatchToProps = dispatch => ({
  fetchBureauPositions: query => dispatch(bureauPositionsFetchData(query)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionManager);
