import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { managePostEdit, managePostFetchFilters } from 'actions/managePostAccess';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import CheckBox from 'Components/CheckBox';
import { renderSelectionList } from 'utilities';

const ManagePostAccess = () => {
  const dispatch = useDispatch();

  // State
  const managePostFilters = useSelector(state => state.managePostFetchFilterData);
  const managePostEditSuccess = useSelector(state => state.managePostEdit);
  const managePostFiltersIsLoading =
    useSelector(state => state.managePostFetchFiltersLoading);

  // Local State & Filters
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [clearFilters, setClearFilters] = useState(false);
  const [personHRO, setPersonHRO] = useState(false);
  const [positionHRO, setPositionHRO] = useState(false);

  const personSelected = selectedPersons.length > 0;
  const positionSelected = selectedPositions.length > 0;
  const requirementsMet =
    (personSelected || positionSelected) && selectedOrgs.length > 0 && selectedRoles.length > 0;

  // Filter Options
  const personSeqNums = new Set(managePostFilters?.personFilters?.map(x => x.code) || [])
  const uniquePersons = personSeqNums.length
    ? personSeqNums.map(ids => managePostFilters?.personFilters?.find(y => y.code === ids))
    : []
  const peopleOptionsHRO = uniquePersons?.filter(
    person => person.skillCode === '2010' || person.skillCode === '2201') || [];
  const positionOptionsHRO = managePostFilters?.positionFilters?.filter(
    position => position.skillCode === '2201' || position.skillCode === '2010') || [];
  const peopleOptions = personHRO ? peopleOptionsHRO : uniquePersons || [];
  const positionOptions = positionHRO
    ? positionOptionsHRO : managePostFilters?.positionFilters || [];
  const roleOptions = managePostFilters?.roleFilters || [];
  const organizationOptions = managePostFilters?.orgFilters || [];


  const filters = [
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
    ...personHRO ? ['Y'] : [],
    ...positionHRO ? ['Y'] : [],
  ];
  const filterCount = filters.flat().length;

  // Initial Render
  useEffect(() => {
    dispatch(managePostFetchFilters());
  }, []);

  useEffect(() => {
    setClearFilters(!!filterCount);
  }, [
    selectedPositions,
    selectedOrgs,
    selectedPersons,
    selectedRoles,
    personHRO,
    positionHRO,
  ]);

  const resetFilters = () => {
    setSelectedPositions([]);
    setSelectedOrgs([]);
    setSelectedPersons([]);
    setSelectedRoles([]);
    setPositionHRO(false);
    setPersonHRO(false);
    setClearFilters(false);
  };

  // clear filters on successful submit
  useEffect(() => {
    if (managePostEditSuccess) {
      resetFilters();
    }
  }, [managePostEditSuccess]);


  const submitGrantAccess = () => {
    dispatch(managePostEdit({
      orgs: [...selectedOrgs],
      positions: [...selectedPositions],
      persons: [...selectedPersons],
      roles: [...selectedRoles],
    }));
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
  };

  const displayCount = () => {
    if (positionSelected) {
      return (`${selectedPositions.length} ${selectedPositions.length < 2 ? 'Position' : 'Positions'} Selected`);
    }
    return (`${selectedPersons.length} ${selectedPersons.length < 2 ? 'Person' : 'People'} Selected`);
  };

  return (
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Manage Post Access" icon="newspaper-o" className="xl-icon" />
        <div className="results-search-bar pt-20">

          <div className="filterby-container">
            <div className="filterby-label">Select:</div>
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

          <div className="usa-width-one-whole position-search--filters--mpa results-dropdown">

            { managePostFiltersIsLoading
              ?
              <Spinner type="post-access-filters" size="small" />
              :
              <>
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
                      value={positionHRO}
                      onCheckBoxClick={() => setPositionHRO(!positionHRO)}
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
                      disabled={managePostFiltersIsLoading || personSelected}
                    />
                  </div>
                </div>
                <div className="filter-div">
                  <div className="label">Person:</div>
                  <div className="post-access-container-cb">
                    <CheckBox
                      label="HRO/MO Only"
                      small
                      value={personHRO}
                      onCheckBoxClick={() => setPersonHRO(!personHRO)}
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
                      disabled={managePostFiltersIsLoading || positionSelected}
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
              </>
            }

          </div>
        </div>
      </div>
      <div className="mpa-grant-box-wrapper">
        <div className="mpa-grant-box">
          <div>Organizations:</div>
          {selectedOrgs?.map(x => (
            <div className="mpa-grant-box-item">
              <div className="mpa-remove-item-wrapper">
                <FA
                  name="times"
                  onClick={() => setSelectedOrgs(
                    selectedOrgs.filter(y => y.code !== x.code))}
                  className="mpa-remove-item"
                />
                {`${x.description} (${x.code})`}
              </div>
            </div>
          ))}
        </div>
        <div className="mpa-grant-box">
          <div>Positions:</div>
          {personSelected && (
            <div className="mpa-grant-box-item">
                  Grant Access to either Persons or Positions.
            </div>
          )}
          {selectedPositions?.map(x => (
            <div className="mpa-grant-box-item">
              <div className="mpa-remove-item-wrapper">
                <FA
                  name="times"
                  onClick={() => setSelectedPositions(
                    selectedPositions.filter(y => y.code !== x.code))}
                  className="mpa-remove-item"
                />
                {x.description}
              </div>
            </div>
          ))}
        </div>
        <div className="mpa-grant-box">
          <div>Persons:</div>
          {positionSelected && (
            <div className="mpa-grant-box-item">
                  Grant Access to either Persons or Positions.
            </div>
          )}
          {selectedPersons?.map(x => (
            <div className="mpa-grant-box-item">
              <div className="mpa-remove-item-wrapper">
                <FA
                  name="times"
                  onClick={() => setSelectedPersons(
                    selectedPersons.filter(y => y.code !== x.code))}
                  className="mpa-remove-item"
                />
                {x.description}
              </div>
            </div>
          ))}
        </div>
        <div className="mpa-grant-box">
          <div>Roles:</div>
          {selectedRoles?.map(x => (
            <div className="mpa-grant-box-item">
              <div className="mpa-remove-item-wrapper">
                <FA
                  name="times"
                  onClick={() => setSelectedRoles(
                    selectedRoles.filter(y => y.code !== x.code))}
                  className="mpa-remove-item"
                />
                {x.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      { requirementsMet && (
        <div className="proposed-cycle-banner">
          {displayCount()}
          <button className="usa-button-secondary" onClick={submitGrantAccess}>Grant Access</button>
        </div>
      )}

    </div>
  );
};

export default ManagePostAccess;
