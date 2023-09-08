import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { managePostEdit, managePostFetchData, managePostFetchFilters, saveManagePostSelections } from 'actions/managePostAccess';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import CheckBox from 'Components/CheckBox';
import TotalResults from 'Components/TotalResults';
import Alert from 'Components/Alert';
import { renderSelectionList } from 'utilities';

const ManagePostAccess = () => {
  const dispatch = useDispatch();

  // State
  const managePostData = useSelector(state => state.managePost);
  const managePostFetchDataLoading = useSelector(state => state.managePostFetchDataLoading);
  const managePostFetchDataError = useSelector(state => state.managePostFetchDataErrored);
  const managePostSelections = useSelector(state => state.managePostSelections);
  const managePostFilters = useSelector(state => state.managePostFetchFilterData);
  const managePostEditSuccess = useSelector(state => state.managePostEdit);
  const managePostFiltersIsLoading =
    useSelector(state => state.managePostFetchFiltersLoading);

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
  const positionOptions = managePostFilters?.personFilters || [];
  const roleOptions = managePostFilters?.roleFilters || [];
  const organizationOptions = managePostFilters?.orgFilters || [];
  const countryOptions = managePostFilters?.locationFilters || [];
  const peopleOptions = managePostFilters?.personFilters || [];


  const getQuery = () => ({
    locations: selectedCountries.map(location => (location?.code)),
    positions: selectedPositions.map(bureau => (bureau?.code)),
    orgs: selectedOrgs.map(org => (org?.code)),
    persons: selectedPersons.map(person => (person?.code)),
    roles: selectedRoles.map(role => (role?.code)),
  });

  const getCurrentInputs = () => ({
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
  });

  const filters = [
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
  ];

  const fetchAndSet = () => {
    const filterCount = filters.flat().length;
    setClearFilters(!!filterCount);
    if (filterCount > 1) {
      dispatch(managePostFetchData(getQuery()));
    }
    dispatch(saveManagePostSelections(getCurrentInputs()));
  };


  // Initial Render
  useEffect(() => {
    dispatch(saveManagePostSelections(getCurrentInputs()));
    dispatch(managePostFetchFilters());
  }, []);

  // Re-Render on Filter Selections
  useEffect(() => {
    setCheckedPostIds([]);
    setSelectAll(false);
    fetchAndSet();
  }, [
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
    managePostEditSuccess,
  ]);


  const resetFilters = () => {
    setSelectedCountries([]);
    setSelectedPositions([]);
    setSelectedOrgs([]);
    setSelectedPersons([]);
    setSelectedRoles([]);
    setCheckedPostIds([]);
    setClearFilters(false);
  };

  const noResults = !managePostData?.length;
  const getOverlay = () => {
    let overlay;
    if (managePostFetchDataLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (managePostFetchDataError) {
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

  const submitGrantAccess = () => {
    dispatch(managePostEdit(checkedPostIds));
  };

  const tableHeaderNames = ['Post/Org', 'Person', 'Role', 'Position'];

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedPostIds(
        managePostData?.map(post => post.id),
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

  const positionFilterToggle = () => {
    // nothing happening for this yet. UI Only.
    if (selectedPositions.length > 0) {
      setSelectedPositions([]);
    }
  };
  // TODO
  const personFilterToggle = () => {
    // nothing happening for this yet. UI Only.
    if (selectedPersons.length > 0) {
      setSelectedPersons([]);
    }
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
  };


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
                placeholder="Select Country or Countries"
                value={selectedCountries}
                options={countryOptions}
                onChange={setSelectedCountries}
                valueKey="code"
                labelKey="description"
                disabled={managePostFiltersIsLoading}
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
                labelKey="description"
                disabled={managePostFiltersIsLoading}
              />
            </div>
            <div className="filter-div">
              <div className="label">Position:</div>
              <div className="post-access-container-cb">
                <CheckBox
                  label="HRO/MO Only"
                  small
                  onCheckBoxClick={positionFilterToggle}
                  id="position-filter-toggle"
                />
                <Picky
                  {...pickyProps}
                  placeholder="Select Position(s)"
                  value={selectedPositions}
                  options={positionOptions}
                  onChange={setSelectedPositions}
                  valueKey="code"
                  labelKey="description"
                  disabled={managePostFiltersIsLoading}
                />
              </div>
            </div>
            <div className="filter-div">
              <div className="label">Person:</div>
              <div className="post-access-container-cb">
                <CheckBox
                  label="HRO/MO Only"
                  small
                  onCheckBoxClick={personFilterToggle}
                  id="person-filter-toggle"
                />
                <Picky
                  {...pickyProps}
                  placeholder="Select Person(s)"
                  value={selectedPersons}
                  options={peopleOptions}
                  onChange={setSelectedPersons}
                  valueKey="code"
                  labelKey="description"
                  disabled={managePostFiltersIsLoading}
                />
              </div>
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
                disabled={managePostFiltersIsLoading}
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
                    total={managePostData.length}
                    pageSize={'all'}
                    suffix="Results"
                    isHidden={managePostFetchDataLoading}
                  />
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
                          managePostData?.length &&
                            managePostData.map(post => (
                              <tr key={post.id}>
                                <td className="checkbox-pac checkbox-pos">
                                  <CheckBox
                                    value={checkedPostIds.includes(post.id)}
                                    onCheckBoxClick={() => handleSelectPost(post)}
                                  />
                                </td>
                                <td>{post?.post}</td>
                                <td>{post?.employee}</td>
                                <td>{post?.role}</td>
                                <td>{post?.position}</td>
                              </tr>
                            ))
                        }
                      </tbody>
                    </table>

                  </div>
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
