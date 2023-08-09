import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filter, flatten, get, has, includes, isEmpty, sortBy, uniqBy } from 'lodash';
import { useDataLoader } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { publishablePositionsFetchData, savePublishablePositionsSelections } from 'actions/publishablePositions';
import Spinner from 'Components/Spinner';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import api from '../../api';
import PostAccessCard from './PostAccessCard';

const ManagePostAccess = () => {
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.publishablePositionsSelections);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedCountries, setSelectedCountries] =
   useState(userSelections?.selectedCountries || []);
  const [selectedPositions, setSelectedPositions] =
   useState(userSelections?.selectedPositions || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedPersons, setSelectedPersons] = useState(userSelections?.selectedGrade || []);
  const [selectedRoles, setSelectedRoles] = useState(userSelections?.selectedSkills || []);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const genericFilters$ = get(genericFilters, 'filters') || [];
  const statusOptions = [
    { code: 1, name: 'Vet' },
    { code: 2, name: 'Publishable' },
    { code: 3, name: 'Non-Publishable' },
  ];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureauOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const skills = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const additionalFiltersIsLoading = includes([orgsLoading], true);

  const [clearFilters, setClearFilters] = useState(false);

  const isLoading = genericFiltersIsLoading || additionalFiltersIsLoading;
  const disableSearch = cardsInEditMode.length > 0;
  const disableInput = isLoading || disableSearch;

  const getQuery = () => ({
    // User Filters
    'post-access-status': selectedCountries.map(statusObject => (statusObject?.code)),
    'post-access-bureaus': selectedPositions.map(bureauObject => (bureauObject?.code)),
    'post-access-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'post-access-grades': selectedPersons.map(gradeObject => (gradeObject?.code)),
    'post-access-skills': selectedRoles.map(skillObject => (skillObject?.code)),
  });

  const getCurrentInputs = () => ({
    selectedCountries,
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
  });

  useEffect(() => {
    dispatch(savePublishablePositionsSelections(getCurrentInputs()));
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
    dispatch(publishablePositionsFetchData(getQuery()));
    dispatch(savePublishablePositionsSelections(getCurrentInputs()));
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

  function renderSelectionList({ items, selected, ...rest }) {
    let codeOrText = 'code';
    // only Remarks needs to use 'text'
    if (has(items[0], 'text')) {
      codeOrText = 'text';
    }
    // only Item Actions/Statuses need to use 'desc_text'
    if (has(items[0], 'desc_text')) {
      codeOrText = 'desc_text';
    }
    if (has(items[0], 'abbr_desc_text') && items[0].code === 'V') {
      codeOrText = 'abbr_desc_text';
    }
    // only Categories need to use 'mic_desc_text'
    if (has(items[0], 'mic_desc_text')) {
      codeOrText = 'mic_desc_text';
    }
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (codeOrText === 'text') queryProp = 'text';
    else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    else if (has(items[0], 'name')) queryProp = 'name';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
      />);
    });
  }

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
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

  const dummyData = [
    { id: 1, name: 'Row 1', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
    { id: 2, name: 'Row 2', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
    { id: 3, name: 'Row 3', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
    { id: 4, name: 'Row 4', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
    { id: 5, name: 'Row 5', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
    { id: 6, name: 'Row 6', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
    { id: 7, name: 'Row 7', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  ];

  const headerNames = ['Post/Org', 'Person', 'Role', 'Position'];
  const grantAccess = () => {
    console.log(`Grant Access for ${selectedCount} positions}`);
  };

  const checkCount = (count) => {
    setSelectedCount(count);
  };

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
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
                        disabled={disableSearch}
                      >
                        <FA name="times" />
                        Clear Filters
                      </button>
                }
              </div>
            </div>
            <div className="usa-width-one-whole position-search--filters--pp results-dropdown">
              <div className="filter-div">
                <div className="label">Country:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Countries"
                  value={selectedCountries}
                  options={statusOptions}
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
                  options={bureauOptions}
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
                  options={organizationOptions}
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
                  options={skillOptions}
                  onChange={setSelectedRoles}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={disableInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="usa-width-one-whole position-search--results">
          <div className="usa-grid-full position-list">
            <PostAccessCard data={dummyData} headers={headerNames} checkCount={checkCount} />
          </div>
        </div>
        {/* placeholder for now */}
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
