import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { renderSelectionList } from 'utilities';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import TotalResults from 'Components/TotalResults';
import { searchPostAccessFetchData, searchPostAccessFetchFilters, searchPostAccessRemove, searchPostAccessSaveSelections } from 'actions/searchPostAccess';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import CheckBox from 'Components/CheckBox';


const SearchPostAccess = () => {
  const dispatch = useDispatch();

  // State
  const userSelections = useSelector(state => state.searchPostAccessSelections);
  const searchPostAccessData = useSelector(state => state.searchPostAccess);
  const searchPostAccessFilters = useSelector(state => state.searchPostAccessFetchFilterData);
  const searchPostAccessFiltersLoading = useSelector(
    state => state.searchPostAccessFetchFiltersLoading);
  const searchPostAccessFetchDataLoading =
    useSelector(state => state.searchPostAccessFetchDataLoading);
  const searchPostAccessFetchDataError =
    useSelector(state => state.searchPostAccessFetchDataErrored);
  const searchPostAccessRemoveSuccess = useSelector(state => state.searchPostAccessRemoveSuccess);

  // Local State & Filters
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedLocations, setSelectedLocations] =
    useState(userSelections?.selectedLocations || []);
  const [selectedRoles, setSelectedRoles] = useState(userSelections?.selectedRoles || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedPersons, setSelectedPersons] = useState(userSelections?.selectedPersons || []);
  const [selectedPositions, setSelectedPositions] =
    useState(userSelections?.selectedPositions || []);
  const [clearFilters, setClearFilters] = useState(false);
  const [checkedPostIds, setCheckedPostIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const getCurrentInputs = () => ({
    selectedBureaus,
    selectedLocations,
    selectedOrgs,
    selectedRoles,
    selectedPersons,
    selectedPositions,
  });

  const getQuery = () => ({
    bureaus: selectedBureaus.map(bureau => (bureau?.code)),
    org: selectedOrgs.map(org => (org?.description)),
    locations: selectedLocations.map(loc => (loc?.code)),
    roles: selectedRoles.map(role => (role?.code)),
    persons: selectedPersons.map(person => (person?.code)),
    positions: selectedPositions.map(pos => (pos?.code)),
  });

  const filters = [
    selectedBureaus,
    selectedLocations,
    selectedOrgs,
    selectedRoles,
    selectedPersons,
    selectedPositions,
  ];

  const fetchAndSet = () => {
    const filterCount = filters.flat().length;
    setClearFilters(!!filterCount);
    if (filterCount > 1) {
      dispatch(searchPostAccessFetchData(getQuery()));
    }
    dispatch(searchPostAccessSaveSelections(getCurrentInputs()));
  };


  // Initial Render
  useEffect(() => {
    dispatch(searchPostAccessSaveSelections(getCurrentInputs()));
    dispatch(searchPostAccessFetchFilters());
  }, []);

  // Re-Render on Filter Selections
  useEffect(() => {
    setCheckedPostIds([]);
    setSelectAll(false);
    fetchAndSet();
  }, [
    selectedBureaus,
    selectedOrgs,
    selectedLocations,
    selectedRoles,
    selectedPersons,
    selectedPositions,
    searchPostAccessRemoveSuccess,
  ]);


  // Filter Options
  const bureauOptions = searchPostAccessFilters?.bureauFilters || [];
  const roleOptions = searchPostAccessFilters?.roleFilters || [];
  const locationOptions = searchPostAccessFilters?.locationFilters || [];
  const orgOptions = searchPostAccessFilters?.orgFilters || [];
  const personOptions = searchPostAccessFilters?.personFilters || [];
  const positionOptions = searchPostAccessFilters?.positionFilters || [];

  const resetFilters = () => {
    setSelectedPersons([]);
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedLocations([]);
    setSelectedRoles([]);
    setCheckedPostIds([]);
    setSelectAll(false);
    setClearFilters(false);
  };

  // Overlay for error, info, and loading state
  const noResults = !searchPostAccessData?.length;
  const getOverlay = () => {
    let overlay;
    if (searchPostAccessFetchDataLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (searchPostAccessFetchDataError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (filters.flat().length < 2) {
      overlay = <Alert type="info" title="Select Filters" messages={[{ body: 'Please select at least 2 filters to search.' }]} />;
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
  };

  const submitRemoveAccess = () => {
    dispatch(searchPostAccessRemove(checkedPostIds));
  };

  const tableHeaderNames = ['Access Type', 'Bureau', 'Org', 'Employee', 'Role', 'Position', 'Title'];

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedPostIds(
        searchPostAccessData?.map(post => post.id),
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
    } else {
      setCheckedPostIds([...checkedPostIds, post.id]);
    }
  });

  return (
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Search Post Access" icon="search-minus" className="xl-icon" />
        <div className="results-search-bar pt-20">
          <div className="filterby-container">
            <div className="filterby-label">Filter by:</div>
            <div className="filterby-clear">
              {
                clearFilters &&
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
              <div className="label">Person:</div>
              <Picky
                {...pickyProps}
                placeholder="Person(s)"
                value={selectedPersons}
                options={personOptions}
                onChange={setSelectedPersons}
                valueKey="code"
                labelKey="description"
                disabled={searchPostAccessFiltersLoading}
              />
            </div>
            <div className="filter-div">
              <div className="label">Location:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Location(s)"
                value={selectedLocations}
                options={locationOptions}
                onChange={setSelectedLocations}
                valueKey="code"
                labelKey="description"
                disabled={searchPostAccessFiltersLoading}
              />
            </div>
            <div className="filter-div">
              <div className="label">Bureau:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Bureau(s)"
                value={selectedBureaus}
                options={bureauOptions}
                onChange={setSelectedBureaus}
                valueKey="code"
                labelKey="description"
                disabled={searchPostAccessFiltersLoading}
              />
            </div>
            <div className="filter-div">
              <div className="label">Org:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Org(s)"
                value={selectedOrgs}
                options={orgOptions}
                onChange={setSelectedOrgs}
                valueKey="code"
                labelKey="description"
                disabled={searchPostAccessFiltersLoading}
              />
            </div>
            <div className="filter-div">
              <div className="label">Position:</div>
              <Picky
                {...pickyProps}
                placeholder="Position(s)"
                value={selectedPositions}
                options={positionOptions}
                onChange={setSelectedPositions}
                valueKey="code"
                labelKey="description"
                disabled={searchPostAccessFiltersLoading}
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
                labelKey="description"
                disabled={searchPostAccessFiltersLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {
        getOverlay() ||
        <>
          <div className="usa-width-one-whole results-dropdown controls-container mb-10">
            <TotalResults
              total={searchPostAccessData.length}
              pageSize={'all'}
              suffix="Results"
              isHidden={searchPostAccessFetchDataLoading}
            />
          </div>
          <div className="usa-width-one-whole position-search--results">
            <div className="post-access-scroll-container">
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
                    searchPostAccessData?.map(post => (
                      <tr key={post.id}>
                        <td className="checkbox-pac checkbox-pos">
                          <CheckBox
                            value={checkedPostIds.includes(post.id)}
                            onCheckBoxClick={() => handleSelectPost(post)}
                          />
                        </td>
                        <td>{post?.access_type}</td>
                        <td>{post?.bureau}</td>
                        <td>{post?.post}</td>
                        <td>{post?.employee}</td>
                        <td>{post?.role}</td>
                        <td>{post?.position}</td>
                        <td>{post?.title}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
      {
        !!checkedPostIds.length &&
          <div className="proposed-cycle-banner">
            {checkedPostIds.length} {checkedPostIds.length < 2 ? 'Position' : 'Positions'} Selected
            {
              !!checkedPostIds.length &&
              <button className="usa-button-secondary" onClick={submitRemoveAccess}>Remove Access</button>
            }
          </div>
      }
    </div>
  );
};

export default withRouter(SearchPostAccess);
