import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filter, flatten, get, includes, isEmpty, sortBy, uniqBy } from 'lodash';
import { useDataLoader } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { managePostFetchData, saveManagePostSelections } from 'actions/managePostAccess';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { toastError, toastSuccess } from 'actions/toast';
import api from '../../api';
import PostAccessCard from './PostAccessCard';

const ManagePostAccess = () => {
  const dispatch = useDispatch();

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);
  const managePost = useSelector(state => state.managePost);
  const managePostSelections = useSelector(state => state.managePostSelections);
  const [selectedCountries, setSelectedCountries] =
   useState(managePostSelections?.selectedCountries || []);
  const [selectedPositions, setSelectedPositions] =
   useState(managePostSelections?.selectedPositions || []);
  const [selectedOrgs, setSelectedOrgs] = useState(managePostSelections?.selectedOrgs || []);
  const [selectedPersons, setSelectedPersons] = useState(managePostSelections?.selectedGrade || []);
  const [selectedRoles, setSelectedRoles] = useState(managePostSelections?.selectedSkills || []);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const genericFilters$ = get(genericFilters, 'filters') || [];

  // placeholder data that will be replaced by API call
  const positions = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const positionOptions = uniqBy(sortBy(get(positions, 'data'), [(b) => b.short_description]));
  const roles = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const roleOptions = uniqBy(sortBy(get(roles, 'data'), [(s) => s.description]), 'code');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const additionalFiltersIsLoading = includes([orgsLoading], true);
  const [clearFilters, setClearFilters] = useState(false);

  const isLoading = genericFiltersIsLoading || additionalFiltersIsLoading;
  const disableSearch = cardsInEditMode.length > 0;
  const disableInput = isLoading || disableSearch;

  const getQuery = () => ({
    // User Filters
    'post-access-countries': selectedCountries.map(statusObject => (statusObject?.code)),
    'post-access-positions': selectedPositions.map(bureauObject => (bureauObject?.code)),
    'post-access-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'post-access-persons': selectedPersons.map(gradeObject => (gradeObject?.code)),
    'post-access-roles': selectedRoles.map(skillObject => (skillObject?.code)),
  });

  const currentInputs = {
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
  };

  const getCurrentInputs = () => ({
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
  });

  useEffect(() => {
    dispatch(saveManagePostSelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
    setCardsInEditMode([]);
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedCountries,
      selectedPositions,
      selectedOrgs,
      selectedPersons,
      selectedRoles,
    ];
    if (isEmpty(filter(flatten(filters)))) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(managePostFetchData(getQuery()));
    dispatch(saveManagePostSelections(currentInputs));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
  ]);

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    includeSelectAll: true,
  };

  const resetFilters = () => {
    setSelectedCountries([]);
    setSelectedPositions([]);
    setSelectedOrgs([]);
    setSelectedPersons([]);
    setSelectedRoles([]);
    setClearFilters(false);
  };

  const headerNames = ['Post/Org', 'Person', 'Role', 'Position'];
  const grantAccess = () => {
    if (selectedCount !== 0) dispatch(toastSuccess('Access has been granted!', 'Success'));
    if (selectedCount === 0) dispatch(toastError('Please select at least one person to grant access.', 'Error'));
  };

  const checkCount = (count) => {
    setSelectedCount(count);
  };

  return (
    isLoading ?
      <Spinner type="post-access-filters" size="small" /> :
      <div className="post-access-search">
        <div className="usa-grid-full post-access-search--header">
          <ProfileSectionTitle title="Manage Post Access" icon="newspaper-o" className="xl-icon" />
          <div className="results-search-bar pt-20">
            <div className="filterby-container">
              <div className="filterby-label">Filter by:</div>
              <div className="filterby-clear">
                {clearFilters &&
                      <button
                        className="unstyled-button"
                        onClick={resetFilters}
                        disabled={disableSearch}
                      >
                        <FA name="times" />
                        Clear Filters
                      </button>
                }
              </div>
            </div>
            <div className="usa-width-one-whole post-access--filters--pp results-dropdown">
              <div className="filter-div">
                <div className="label">Country:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Countries"
                  value={selectedCountries}
                  options={managePost?.dummyCountries}
                  onChange={setSelectedCountries}
                  valueKey="code"
                  labelKey="name"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Org:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Org(s)"
                  value={selectedOrgs}
                  options={organizationOptions}
                  onChange={setSelectedOrgs}
                  valueKey="code"
                  labelKey="name"
                  disabled={disableInput}
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
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Person:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Person(s)"
                  value={selectedPersons}
                  options={managePost?.dummyPeople}
                  onChange={setSelectedPersons}
                  valueKey="code"
                  labelKey="name"
                  disabled={disableInput}
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
                  disabled={disableInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="usa-width-one-whole post-access-search--results">
          <div className="usa-grid-full post-access-list">
            <PostAccessCard
              data={managePost?.dummyData}
              headers={headerNames}
              checkCount={checkCount}
            />
          </div>
        </div>
        <div className="proposed-cycle-banner">
          {selectedCount} {selectedCount < 2 ? 'Position' : 'Positions'} Selected
          {
            selectedCount > 0 &&
              <button className="usa-button-secondary" onClick={grantAccess}>Grant Access</button>
          }
        </div>
        {/* placeholder for when we put in pagination */}
        {
          disableSearch &&
            <div className="disable-react-paginate-overlay" />
        }
      </div>
  );
};

ManagePostAccess.propTypes = {
};

ManagePostAccess.defaultProps = {
};

export default ManagePostAccess;
