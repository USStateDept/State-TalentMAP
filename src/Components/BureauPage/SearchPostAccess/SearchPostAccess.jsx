import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useDataLoader, usePrevious } from 'hooks';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filtersFetchData } from 'actions/filters/filters';
import { getGenericFilterOptions, nameSort, renderSelectionList } from 'utilities';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import PostAccessCard from 'Components/ManagePostAccess/PostAccessCard';
import SelectForm from 'Components/SelectForm';
import TotalResults from 'Components/TotalResults';
import { POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { searchPostAccessFetchData, searchPostAccessSaveSelections } from 'actions/searchPostAccess';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import PaginationWrapper from 'Components/PaginationWrapper';
import api from '../../../api';


const SearchPostAccess = () => {
  const dispatch = useDispatch();

  // State
  const userSelections = useSelector(state => state.searchPostAccessSelections);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);
  const searchPostAccessData = useSelector(state => state.searchPostAccess);
  const searchPostAccessFetchDataLoading =
    useSelector(state => state.searchPostAccessFetchDataLoading);
  const searchPostAccessFetchDataError =
    useSelector(state => state.searchPostAccessFetchDataErrored);
  // const [ordering, setOrdering] =
  //   useState(userSelections.ordering || BUREAU_POSITION_SORT.options[0].value);

  const headerNames = ['Access Type', 'Bureau', 'Post/Org', 'Employee', 'Role', 'Position', 'Title'];

  // Filters
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections?.selectedPosts || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedRoles, setSelectedRoles] = useState(userSelections?.selectedRole || []);
  const [clearFilters, setClearFilters] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections?.page || 1);
  const [limit, setLimit] = useState(userSelections?.limit || 10);
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  const currentInputs = {
    page,
    limit,
    // ordering,
    selectedBureaus,
    selectedPosts,
    selectedOrgs,
    selectedRoles,
  };

  const getCurrentInputs = () => ({
    page,
    limit,
    // ordering,
    selectedBureaus,
    selectedPosts,
    selectedOrgs,
    selectedRoles,
  });

  const getQuery = () => ({
    page,
    limit,
    // ordering,
  });

  const fetchAndSet = (resetPage = false) => {
    const filters = [
      selectedBureaus,
      selectedPosts,
      selectedOrgs,
      selectedRoles,
    ];
    if (filters.flat().length === 0) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(searchPostAccessSaveSelections(getCurrentInputs()));
    dispatch(searchPostAccessFetchData(getQuery()));
  };


  // Initial Render
  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(searchPostAccessSaveSelections(currentInputs));

    dispatch(searchPostAccessFetchData(getQuery()));
  }, []);

  // Re-Render on Selections
  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    }
  }, [
    limit,
    // ordering,
    selectedBureaus,
    selectedPosts,
    selectedOrgs,
    selectedRoles,
  ]);

  // Handle Pagination
  useEffect(() => {
    fetchAndSet(false);
  }, [page]);

  // Filter Options
  const genericFilters$ = genericFilters?.filters || [];
  const bureausOptions = getGenericFilterOptions(genericFilters$, 'region', 'short_description');
  const postOptions = getGenericFilterOptions(genericFilters$, 'post', 'city');
  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = (orgs?.data?.length && nameSort(orgs?.data, 'name')) || [];

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedPosts([]);
    setSelectedOrgs([]);
    setSelectedRoles([]);
    setClearFilters(false);
  };

  // Overlay for error, info, and loading state
  const noResults = searchPostAccessData?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (searchPostAccessFetchDataLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (searchPostAccessFetchDataError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  // const sorts = BUREAU_POSITION_SORT;

  // Hardcoded - find where to get this data
  const roleOptions = [
    { code: 1, name: 'FSBid Organization Bidders' },
    { code: 2, name: 'FSBid Organization Capsule Positions' },
  ];

  console.log(searchPostAccessFetchDataLoading);
  console.log(searchPostAccessData);

  return (
    genericFiltersIsLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="position-search">
          <div className="usa-grid-full position-search--header">
            {/* TODO change ICON */}
            <ProfileSectionTitle title="Search Post Access" icon="keyboard-o" className="xl-icon" />
            <div className="results-search-bar pt-20">

              <div className="filterby-container">
                <div className="filterby-label">Filter by:</div>
                <div className="filterby-clear">
                  {clearFilters &&
                    <button
                      className="unstyled-button"
                      onClick={resetFilters}
                      // disabled={disableSearch}
                    >
                      <FA name="times" />
                      Clear Filters
                    </button>
                  }
                </div>
              </div>

              {/* TODO check GRID */}
              <div className="usa-width-one-whole position-search--filters--pv-man results-dropdown">
                <div className="filter-div">
                  <div className="label">Bureau:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Bureau(s)"
                    value={selectedBureaus}
                    options={bureausOptions}
                    onChange={setSelectedBureaus}
                    valueKey="code"
                    labelKey="long_description"
                    disabled={genericFiltersIsLoading}
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Location:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Location(s)"
                    value={selectedPosts}
                    options={postOptions}
                    onChange={setSelectedPosts}
                    valueKey="code"
                    labelKey="custom_description"
                    disabled={genericFiltersIsLoading}
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Organization:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Organization(s)"
                    value={selectedOrgs}
                    options={organizationOptions}
                    onChange={setSelectedOrgs}
                    valueKey="code"
                    labelKey="long_description"
                    disabled={orgsLoading}
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Role:</div>
                  <Picky
                    {...pickyProps}
                    placeholder="Select Role(s)"
                    value={selectedRoles}
                    options={roleOptions}
                    onChange={setSelectedRoles}
                    valueKey="code"
                    labelKey="long_description"
                  />
                </div>
              </div>
            </div>
          </div>


          {
            getOverlay() ||
              <>
                <div className="usa-width-one-whole results-dropdown controls-container">
                  <TotalResults
                    total={searchPostAccessData.count}
                    pageNumber={page}
                    pageSize={limit}
                    suffix="Results"
                    isHidden={searchPostAccessFetchDataLoading}
                  />
                  <div className="position-search-controls--right">
                    <div className="position-search-controls--results">
                      {/* <SelectForm
                      id="position-manager-num-results"
                      options={sorts.options}
                      label="Sort by:"
                      defaultSort={ordering}
                      onSelectOption={value => setOrdering(value.target.value)}
                      disabled={searchPostAccessFetchDataLoading}
                    /> */}
                      <SelectForm
                        id="position-manager-num-results"
                        options={pageSizes.options}
                        label="Results:"
                        defaultSort={limit}
                        onSelectOption={value => setLimit(value.target.value)}
                        disabled={searchPostAccessFetchDataLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="usa-width-one-whole position-search--results">
                  <div className="usa-grid-full position-list">
                    {searchPostAccessData?.results?.map((result) => (
                      <PostAccessCard
                        data={result}
                        header={headerNames}
                        key={result.id}
                      />
                    ))}
                  </div>
                </div>

                <div className="usa-grid-full
                react-paginate position-search-controls--pagination"
                >
                  <PaginationWrapper
                    pageSize={limit}
                    onPageChange={p => setPage(p.page)}
                    forcePage={page}
                    totalResults={searchPostAccessData.count}
                  />
                </div>
              </>
          }
        </div>
      )
  );
};

export default withRouter(SearchPostAccess);
