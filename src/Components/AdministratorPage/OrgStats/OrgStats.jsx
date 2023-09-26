import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { get, sortBy, uniqBy } from 'lodash';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import DefinitionList from 'Components/DefinitionList';
import { Row } from 'Components/Layout';
import { useDataLoader } from 'hooks';
import { renderSelectionList } from 'utilities';
import OrgStatsCard from './OrgStatsCard';
import api from '../../../api';
import { orgStatsFetchData, saveOrgStatsSelections } from '../../../actions/orgStats';

const OrgStats = () => {
  const dispatch = useDispatch();

  // ================= DATA RETRIEVAL =================

  const genericFilters = useSelector(state => state.filters);
  const genericFilters$ = get(genericFilters, 'filters') || [];
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);

  const userSelections = useSelector(state => state.orgStatsSelections);

  const orgStatsData = useSelector(state => state.orgStats);
  const orgStatsData$ = orgStatsData?.results || [];
  const orgStatsSummary$ = orgStatsData?.bureau_summary || [];
  const orgStatsIsLoading = useSelector(state => state.orgStatsIsLoading);
  const orgStatsError = useSelector(state => state.orgStatsError);

  // ================= FILTER/PAGINATION =================

  const [clearFilters, setClearFilters] = useState(false);

  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedCycles, setSelectedCycles] = useState(userSelections?.selectedBidCycle || []);

  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureauOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const cycles = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(get(cycles, 'data'), [(c) => c.custom_description]), 'custom_description');
  const { data: orgs } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const getCurrentInputs = () => ({
    selectedBureaus,
    selectedOrgs,
    selectedCycles,
  });

  const getQuery = () => ({
    'org-stats-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'org-stats-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'org-stats-cycles': selectedCycles.map(cycleObject => (cycleObject?.id)),
  });

  const fetchAndSet = () => {
    const filters = [
      selectedBureaus,
      selectedOrgs,
      selectedCycles,
    ];
    if (filters.flat().length === 0) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(orgStatsFetchData(getQuery()));
    dispatch(saveOrgStatsSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedBureaus,
    selectedOrgs,
    selectedCycles,
  ]);

  const resetFilters = () => {
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedCycles([]);
  };

  // Overlay for error, info, and loading state
  const noResults = orgStatsData?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (orgStatsIsLoading) {
      overlay = <Spinner type="bid-season-filters" class="homepage-position-results" size="big" />;
    } else if (orgStatsError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (!genericFiltersIsLoading ?
    <Spinner type="homepage-position-results" class="homepage-position-results" size="big" /> :
    <div className="bid-seasons-page position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Org Stats Search" icon="building" className="xl-icon" />
        <div className="filterby-container" >
          <div className="filterby-label">Filter by:</div>
          <span className="filterby-clear">
            {clearFilters &&
              <button className="unstyled-button" onClick={resetFilters}>
                <FA name="times" />
                Clear Filters
              </button>
            }
          </span>
        </div>
        <div className="usa-width-one-whole position-search--filters--pos-man results-dropdown">
          <div className="filter-div">
            <div className="label">Bureau:</div>
            <Picky
              placeholder="Select Bureau(s)"
              value={selectedBureaus.filter(f => f)}
              options={bureauOptions}
              onChange={setSelectedBureaus}
              numberDisplayed={2}
              multiple
              includeFilter
              dropdownHeight={255}
              renderList={renderSelectionList}
              valueKey="code"
              labelKey="long_description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Organization:</div>
            <Picky
              placeholder="Select Organization(s)"
              value={selectedOrgs}
              options={organizationOptions}
              onChange={setSelectedOrgs}
              numberDisplayed={2}
              multiple
              includeFilter
              dropdownHeight={255}
              renderList={renderSelectionList}
              valueKey="code"
              labelKey="long_description"
            />
          </div>
          <div className="filter-div">
            <div className="label">Cycle:</div>
            <Picky
              placeholder="Select Cycle(s)"
              value={selectedCycles}
              options={cycleOptions}
              onChange={setSelectedCycles}
              numberDisplayed={2}
              multiple
              includeFilter
              dropdownHeight={255}
              renderList={renderSelectionList}
              valueKey="id"
              labelKey="custom_description"
            />
          </div>
        </div>
      </div>
      {getOverlay() ||
        <div className="bs-lower-section">
          {orgStatsData$?.map((data, index) => {
            const bureauSummary = orgStatsSummary$.find(s => s.bureau === data.bureau);
            const currBureau = data.bureau;
            const nextBureau = orgStatsData$[index + 1]?.bureau;
            if (currBureau !== nextBureau) {
              const summaryBody = {
                'Bureau: ': bureauSummary.bureau_short_desc,
                'Total POS': bureauSummary.total_pos,
                'Total Filled': bureauSummary.total_filled,
                '% Filled': bureauSummary.total_percent,
                'Overseas POS': bureauSummary.overseas_pos,
                'Overseas Filled': bureauSummary.overseas_filled,
                '% Overseas': bureauSummary.overseas_percent,
                'Domestic POS': bureauSummary.domestic_pos,
                'Domestic Filled': bureauSummary.domestic_filled,
                '% Domestic': bureauSummary.domestic_percent,
              };
              return (
                <Row fluid className="tabbed-card dark box-shadow-standard">
                  <div className="position-content pt-12">
                    <Row fluid className="position-content--section position-content--details condensed">
                      <DefinitionList
                        itemProps={{ excludeColon: true }}
                        items={summaryBody}
                      />
                    </Row>
                  </div>
                </Row>
              );
            }
            return <OrgStatsCard {...data} />;
          })}
        </div>
      }
    </div>
  );
};

OrgStats.propTypes = {
};

OrgStats.defaultProps = {
};

export default withRouter(OrgStats);
