import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useDataLoader } from 'hooks';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filtersFetchData } from 'actions/filters/filters';
import { getGenericFilterOptions, nameSort, renderSelectionList } from 'utilities';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { searchPostAccessFetchData } from 'actions/searchPostAccess';
import api from '../../../api';

const SearchPostAccess = () => {
  const dispatch = useDispatch();

  // State
  const userSelections = useSelector(state => state.searchPostAccessSelections);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);
  const searchPostAccessData = useSelector(state => state.searchPostAccess);
  // const cycleManagementDataLoading = useSelector(state => state.cycleManagementFetchDataLoading);
  // const cycleManagementError = useSelector(state => state.cycleManagementFetchDataErrored);

  // Filters
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections?.selectedPosts || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedRoles, setSelectedRoles] = useState(userSelections?.selectedRole || []);
  const [clearFilters, setClearFilters] = useState(false);

  // Pagination
  // const [page, setPage] = useState(userSelections.page || 1);
  // const [limit, setLimit] = useState(userSelections.limit || 10);
  // const prevPage = usePrevious(page);
  // const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  // const currentInputs = {
  //   page,
  //   limit,
  //   selectedBureaus,
  //   selectedPosts,
  //   selectedOrgs,
  //   selectedRoles,
  // };

  // const getCurrentInputs = () => ({
  //   page,
  //   limit,
  //   selectedBureaus,
  //   selectedPosts,
  //   selectedOrgs,
  //   selectedRoles,
  // });

  // const getQuery = () => ({
  //   limit,
  //   page,
  // });

  const genericFilters$ = genericFilters?.filters || [];

  const bureausOptions = getGenericFilterOptions(genericFilters$, 'region', 'short_description');
  const postOptions = getGenericFilterOptions(genericFilters$, 'post', 'city');
  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = (orgs?.data?.length && nameSort(orgs?.data, 'name')) || [];

  // Hardcoded - find where to get this data
  const roleOptions = [
    { code: 1, name: 'FSBid Organization Bidders' },
    { code: 2, name: 'FSBid Organization Capsule Positions' },
  ];

  useEffect(() => {
    // dispatch(saveProjectedVacancySelections(getCurrentInputs()));
    dispatch(searchPostAccessFetchData());
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const resetFilters = () => {
    setClearFilters(false);
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  console.log(searchPostAccessData);

  return (
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
    </div>
  );
};

export default withRouter(SearchPostAccess);
