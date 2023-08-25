import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useDataLoader, usePrevious } from 'hooks';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filtersFetchData } from 'actions/filters/filters';
import { getGenericFilterOptions, nameSort, renderSelectionList } from 'utilities';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import SelectForm from 'Components/SelectForm';
import TotalResults from 'Components/TotalResults';
import { POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { searchPostAccessFetchData, searchPostAccessFetchFilters, searchPostAccessRemove, searchPostAccessSaveSelections } from 'actions/searchPostAccess';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import PaginationWrapper from 'Components/PaginationWrapper';
import CheckBox from 'Components/CheckBox';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import api from '../../../api';


const SearchPostAccess = () => {
  const dispatch = useDispatch();
  const searchLastNameRef = useRef();
  const searchFirstNameRef = useRef();

  // State
  const userSelections = useSelector(state => state.searchPostAccessSelections);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);
  const searchPostAccessData = useSelector(state => state.searchPostAccess);


  const searchPostAccessFilters = useSelector(state => state.searchPostAccessFetchFilterData);
  const searchPostAccessFiltersLoading = useSelector(
    state => state.searchPostAccessFetchFiltersLoading);
  console.log(searchPostAccessFiltersLoading);
  console.log(searchPostAccessFilters);


  const searchPostAccessFetchDataLoading =
    useSelector(state => state.searchPostAccessFetchDataLoading);
  const searchPostAccessFetchDataError =
    useSelector(state => state.searchPostAccessFetchDataErrored);

  // Local State & Filters
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedPosts, setSelectedPosts] = useState(userSelections?.selectedPosts || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedRoles, setSelectedRoles] = useState(userSelections?.selectedRoles || []);
  const [searchTextLastName, setSearchTextLastName] = useState(userSelections?.searchTextLastName || '');
  const [searchTextFirstName, setSearchTextFirstName] = useState(userSelections?.searchTextFirstName || '');
  const [searchInputLastName, setSearchInputLastName] = useState(userSelections?.searchInputLastName || '');
  const [searchInputFirstName, setSearchInputFirstName] = useState(userSelections?.searchInputFirstName || '');
  const [clearFilters, setClearFilters] = useState(false);
  const [checkedPostIds, setCheckedPostIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections?.page || 1);
  const [limit, setLimit] = useState(userSelections?.limit || 10);
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;


  const getCurrentInputs = () => ({
    page,
    limit,
    selectedBureaus,
    selectedPosts,
    selectedOrgs,
    selectedRoles,
    searchTextLastName,
    searchTextFirstName,
    searchInputLastName,
    searchInputFirstName,
  });

  const getQuery = () => ({
    bureaus: selectedBureaus.map(bureau => (bureau?.code)),
    posts: selectedPosts.map(post => (post?.code)),
    orgs: selectedOrgs.map(org => (org?.code)),
    roles: selectedRoles.map(role => (role?.code)),
    lastName: searchTextLastName,
    firstName: searchTextFirstName,
    page,
    limit,
  });

  const fetchAndSet = (resetPage = false) => {
    const filters = [
      selectedBureaus,
      selectedPosts,
      selectedOrgs,
      selectedRoles,
    ];
    if (filters.flat().length === 0
    && searchTextLastName.length === 0
    && searchTextFirstName.length === 0
    ) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(searchPostAccessSaveSelections(getCurrentInputs()));
    dispatch(searchPostAccessFetchData(getQuery()));
    dispatch(searchPostAccessFetchFilters()); // FOR TESTING ATM
  };


  // Initial Render
  useEffect(() => {
    dispatch(searchPostAccessSaveSelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  // Re-Render on Filter Selections
  useEffect(() => {
    setCheckedPostIds([]);
    setSelectAll(false);
    if (prevPage) {
      fetchAndSet(true);
    }
  }, [
    limit,
    selectedBureaus,
    selectedPosts,
    selectedOrgs,
    selectedRoles,
    searchTextLastName,
    searchTextFirstName,
  ]);

  // Handle Pagination
  useEffect(() => {
    setCheckedPostIds([]);
    setSelectAll(false);
    fetchAndSet(false);
  }, [page]);


  // Filter Options
  const genericFilters$ = genericFilters?.filters || [];
  const bureausOptions = getGenericFilterOptions(genericFilters$, 'region', 'short_description');
  const postOptions = getGenericFilterOptions(genericFilters$, 'post', 'city');
  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = (orgs?.data?.length && nameSort(orgs?.data, 'name')) || [];

  const resetFilters = () => {
    Promise.resolve().then(() => {
      setSelectedBureaus([]);
      setSelectedPosts([]);
      setSelectedOrgs([]);
      setSelectedRoles([]);
      setCheckedPostIds([]);
      setSelectAll(false);
      setSearchTextLastName('');
      setSearchTextFirstName('');
      searchFirstNameRef.current.clearText();
      searchLastNameRef.current.clearText();
      setClearFilters(false);
    });
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

  const submitSearch = () => {
    setSearchTextLastName(searchInputLastName);
    setSearchTextFirstName(searchInputFirstName);
  };

  const submitRemoveAccess = () => {
    dispatch(searchPostAccessRemove(checkedPostIds));
  };

  const tableHeaderNames = ['Access Type', 'Bureau', 'Post/Org', 'Employee', 'Role', 'Position', 'Title'];

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedPostIds(
        searchPostAccessData?.results?.map(post => post.id),
      );
    } else {
      setSelectAll(false);
      setCheckedPostIds([]);
    }
  };

  const handleSelectPost = (post => {
    if (checkedPostIds.includes(post.id)) {
      const filteredPosts = checkedPostIds.filter(x => x !== post.id);
      setCheckedPostIds(filteredPosts);
    } else setCheckedPostIds([...checkedPostIds, post.id]);
  });

  // Hardcoded - find where to get this data
  const roleOptions = [
    { code: 1, name: 'FSBid Organization Bidders' },
    { code: 2, name: 'FSBid Organization Capsule Positions' },
  ];


  return (
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Search Post Access" icon="search-minus" className="xl-icon" />
        <div className="results-search-bar pt-20">

          <div className="filterby-container">
            <div className="filterby-label">Filter by:</div>
            <div className="filterby-clear">
              {clearFilters &&
                    <button
                      className="unstyled-button"
                      onClick={resetFilters}
                    >
                      <FA name="times" />
                      Clear Filters
                    </button>
              }
            </div>
          </div>

          <div className="usa-width-one-whole position-search--filters--spa results-dropdown">
            <div className="filter-div">
              <div className="label">
                    Last Name:
              </div>
              <div className="post-access-emp-search-div">
                <PositionManagerSearch
                  id="last-name-search"
                  submitSearch={submitSearch}
                  onChange={setSearchInputLastName}
                  ref={searchLastNameRef}
                  placeHolder="Search by Last Name"
                  textSearch={searchTextLastName}
                  noButton
                  showIcon={false}
                />
              </div>
            </div>
            <div className="filter-div">
              <div htmlFor="first-name-search" className="label">
                    First Name:
              </div>
              <div className="post-access-emp-search-div">
                <PositionManagerSearch
                  id="first-name-search"
                  submitSearch={submitSearch}
                  onChange={setSearchInputFirstName}
                  ref={searchFirstNameRef}
                  placeHolder="Search by First Name"
                  textSearch={searchTextFirstName}
                  noButton
                  showIcon={false}
                />
              </div>
            </div>
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
                labelKey="name"
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
                labelKey="name"
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

                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th className="checkbox-pos">
                            <CheckBox
                              checked={!selectAll}
                              onCheckBoxClick={handleSelectAll}
                            />
                          </th>
                          {
                            tableHeaderNames.map((item) => (
                              <th key={item}>{item}</th>
                            ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          searchPostAccessData?.results?.length &&
                            searchPostAccessData.results.map(post => (
                              <tr key={post.id}>
                                <td className="checkbox-pac checkbox-pos">
                                  <CheckBox
                                    value={checkedPostIds.includes(post.id)}
                                    onCheckBoxClick={() => handleSelectPost(post)}
                                  />
                                </td>
                                <td>{post?.access_type || '---'}</td>
                                <td>{post?.bureau || '---'}</td>
                                <td>{post?.post || '---'}</td>
                                <td>{post?.employee || '---'}</td>
                                <td>{post?.role || '---'}</td>
                                <td>{post?.position || '---'}</td>
                                <td>{post?.title || '---'}</td>
                              </tr>
                            ))
                        }
                      </tbody>
                    </table>

                  </div>
                </div>
                <div className="usa-grid-full react-paginate position-search-controls--pagination">
                  <PaginationWrapper
                    pageSize={limit}
                    onPageChange={p => setPage(p.page)}
                    forcePage={page}
                    totalResults={searchPostAccessData.count}
                  />
                </div>
              </>
      }

      { checkedPostIds.length > 0 &&
            <div className="proposed-cycle-banner">
              {checkedPostIds.length} {checkedPostIds.length < 2 ? 'Position' : 'Positions'} Selected
              {
                checkedPostIds.length > 0 &&
                <button className="usa-button-secondary" onClick={submitRemoveAccess}>Grant Access</button>
              }
            </div>
      }

    </div>
  );
};

export default withRouter(SearchPostAccess);
