import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { useDataLoader, usePrevious } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { managePostEdit, managePostFetchData, saveManagePostSelections } from 'actions/managePostAccess';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import CheckBox from 'Components/CheckBox';
import SelectForm from 'Components/SelectForm';
import TotalResults from 'Components/TotalResults';
import PaginationWrapper from 'Components/PaginationWrapper';
import { POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import Alert from 'Components/Alert';
import { getGenericFilterOptions, nameSort, renderSelectionList } from 'utilities';
import api from '../../api';

const ManagePostAccess = () => {
  const dispatch = useDispatch();

  // State
  const managePostSelections = useSelector(state => state.managePostSelections);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);
  const managePostData = useSelector(state => state.managePost);
  const managePostFetchDataLoading = useSelector(state => state.managePostFetchDataLoading);
  const managePostFetchDataError = useSelector(state => state.managePostFetchDataErrored);

  // Local State & Filters
  const [selectedCountries, setSelectedCountries] =
   useState(managePostSelections?.selectedCountries || []);
  const [selectedPositions, setSelectedPositions] =
   useState(managePostSelections?.selectedPositions || []);
  const [selectedOrgs, setSelectedOrgs] = useState(managePostSelections?.selectedOrgs || []);
  const [selectedPersons, setSelectedPersons] = useState(managePostSelections?.selectedGrade || []);
  const [selectedRoles, setSelectedRoles] = useState(managePostSelections?.selectedSkills || []);
  const [checkedPostIds, setCheckedPostIds] = useState([]);
  const [clearFilters, setClearFilters] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // Filter Options
  const genericFilters$ = genericFilters?.filters || [];
  const positionOptions = getGenericFilterOptions(genericFilters$, 'region', 'short_description');
  const roleOptions = getGenericFilterOptions(genericFilters$, 'skill', 'code');
  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = (orgs?.data?.length && nameSort(orgs?.data, 'name')) || [];

  // Pagination
  const [page, setPage] = useState(managePostSelections?.page || 1);
  const [limit, setLimit] = useState(managePostSelections?.limit || 10);
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  const filtersLoading = genericFiltersIsLoading || orgsLoading;

  const getQuery = () => ({
    'post-access-countries': selectedCountries.map(statusObject => (statusObject?.code)),
    'post-access-positions': selectedPositions.map(bureauObject => (bureauObject?.code)),
    'post-access-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'post-access-persons': selectedPersons.map(gradeObject => (gradeObject?.code)),
    'post-access-roles': selectedRoles.map(skillObject => (skillObject?.code)),
    page,
    limit,
  });

  const getCurrentInputs = () => ({
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
    page,
    limit,
  });

  const fetchAndSet = (resetPage = false) => {
    const filters = [
      selectedCountries,
      selectedPositions,
      selectedOrgs,
      selectedPersons,
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
    dispatch(saveManagePostSelections(getCurrentInputs()));
    dispatch(managePostFetchData(getQuery()));
  };


  // Initial Render
  useEffect(() => {
    dispatch(saveManagePostSelections(getCurrentInputs()));
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
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
    limit,
  ]);

  // Handle Pagination
  useEffect(() => {
    setCheckedPostIds([]);
    setSelectAll(false);
    fetchAndSet(false);
  }, [page]);


  const resetFilters = () => {
    setSelectedCountries([]);
    setSelectedPositions([]);
    setSelectedOrgs([]);
    setSelectedPersons([]);
    setSelectedRoles([]);
    setClearFilters(false);
  };

  const noResults = managePostData?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (managePostFetchDataLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (managePostFetchDataError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const submitGrantAccess = () => {
    dispatch(managePostEdit(checkedPostIds));
  };

  const tableHeaderNames = ['Post/Org', 'Person', 'Role', 'Position'];

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedPostIds(
        managePostData?.results?.map(post => post.id),
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

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };


  // Hardcoded - find where to get this data
  const peopleOptions = [
    { code: 1, name: 'John Smith' },
    { code: 2, name: 'Emily Johnson' },
    { code: 3, name: 'Michael Williams' },
    { code: 4, name: 'Emma Jones' },
    { code: 5, name: 'William Brown' },
    { code: 6, name: 'Olivia Davis' },
    { code: 7, name: 'James Miller' },
    { code: 8, name: 'Sophia Wilson' },
    { code: 9, name: 'Benjamin Taylor' },
    { code: 10, name: 'Ava Martinez' },
    { code: 11, name: 'Alexander Anderson' },
    { code: 12, name: 'Isabella Garcia' },
    { code: 13, name: 'Daniel Rodriguez' },
    { code: 14, name: 'Mia Martinez' },
    { code: 15, name: 'David Davis' },
    { code: 16, name: 'Charlotte Johnson' },
    { code: 17, name: 'Joseph Smith' },
    { code: 18, name: 'Sophia Wilson' },
    { code: 19, name: 'Matthew Anderson' },
    { code: 20, name: 'Olivia Taylor' },
  ];
  // Hardcoded - find where to get this data
  const countryOptions = [
    { code: 1, name: 'Bahamas' },
    { code: 2, name: 'Andorra' },
    { code: 3, name: 'Vanuatu' },
    { code: 4, name: 'Malawi' },
    { code: 5, name: 'Equatorial Guinea' },
    { code: 6, name: 'Sierra Leone' },
    { code: 7, name: 'Mozambique' },
    { code: 8, name: 'France' },
    { code: 9, name: 'Sudan' },
    { code: 10, name: 'Iran' },
    { code: 11, name: 'Malta' },
    { code: 12, name: 'Papua New Guinea' },
    { code: 13, name: 'Congo' },
    { code: 14, name: 'Nauru' },
    { code: 15, name: 'Guatemala' },
    { code: 16, name: 'Wallis and Futuna' },
    { code: 17, name: 'Madagascar' },
    { code: 18, name: 'Virgin Islands' },
    { code: 19, name: 'Saint Pierre and Miquelon' },
    { code: 20, name: 'Tajikistan' },
    { code: 21, name: 'Trinidad and Tobago' },
    { code: 22, name: 'Iceland' },
    { code: 23, name: 'Italy' },
    { code: 24, name: 'Panama' },
    { code: 25, name: 'Lithuania' },
  ];


  return (
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Manage Post Access" icon="newspaper-o" className="xl-icon" />
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

          <div className="usa-width-one-whole position-search--filters--pv-man results-dropdown">
            <div className="filter-div">
              <div className="label">Country:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Countries"
                value={selectedCountries}
                options={countryOptions}
                onChange={setSelectedCountries}
                valueKey="code"
                labelKey="name"
                disabled={filtersLoading}
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
                disabled={filtersLoading}
              />
            </div>
            <div className="filter-div">
              <div className="label">Position:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Position(s)"
                value={selectedPositions}
                options={positionOptions}
                onChange={setSelectedPositions}
                valueKey="code"
                labelKey="long_description"
                disabled={filtersLoading}
              />
            </div>
            <div className="filter-div">
              <div className="label">Person:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Person(s)"
                value={selectedPersons}
                options={peopleOptions}
                onChange={setSelectedPersons}
                valueKey="code"
                labelKey="name"
                disabled={filtersLoading}
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
                labelKey="custom_description"
                disabled={filtersLoading}
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
                    total={managePostData.count}
                    pageNumber={page}
                    pageSize={limit}
                    suffix="Results"
                    isHidden={managePostFetchDataLoading}
                  />
                  <div className="position-search-controls--right">
                    <div className="position-search-controls--results">
                      <SelectForm
                        id="position-manager-num-results"
                        options={pageSizes.options}
                        label="Results:"
                        defaultSort={limit}
                        onSelectOption={value => setLimit(value.target.value)}
                        disabled={managePostFetchDataLoading}
                      />
                    </div>
                  </div>
                </div>
                <div className="usa-width-one-whole post-access-search--results">
                  <div className="usa-grid-full post-access-list">

                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th className="checkbox-pos">
                            <CheckBox
                              checked={selectAll}
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
                          managePostData?.results?.length &&
                            managePostData.results.map(post => (
                              <tr key={post.id}>
                                <td className="checkbox-pac checkbox-pos">
                                  <CheckBox
                                    value={checkedPostIds.includes(post.id)}
                                    onCheckBoxClick={() => handleSelectPost(post)}
                                  />
                                </td>
                                <td>{post?.post || '---'}</td>
                                <td>{post?.person || '---'}</td>
                                <td>{post?.role || '---'}</td>
                                <td>{post?.position || '---'}</td>
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
                    totalResults={managePostData.count}
                  />
                </div>
              </>
      }

      { checkedPostIds.length > 0 &&
            <div className="proposed-cycle-banner">
              {checkedPostIds.length} {checkedPostIds.length < 2 ? 'Position' : 'Positions'} Selected
              {
                checkedPostIds.length > 0 &&
                <button className="usa-button-secondary" onClick={submitGrantAccess}>Grant Access</button>
              }
            </div>
      }

    </div>
  );
};

export default ManagePostAccess;
