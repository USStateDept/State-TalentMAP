import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import TMDatePicker from 'Components/TMDatePicker';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import Alert from 'Components/Alert';
import { bidSeasonsCreate, bidSeasonsFetchData } from 'actions/BidSeasons';
import { renderSelectionList } from 'utilities';
import swal from '@sweetalert/with-react';
import ManageBidSeasonCard from './ManageBidSeasonsCard';
import EditBidSeasons from './EditBidSeasons';


const ManageBidSeasons = () => {
  const dispatch = useDispatch();

  const ManageBidSeasonsDataLoading = useSelector(state => state.bidSeasonsFetchDataLoading);
  const ManageBidSeasonsData = useSelector(state => state.bidSeasons);
  const ManageBidSeasonsError = useSelector(state => state.bidSeasonsFetchDataErrored);

  // Filters
  const [selectedBidSeasons, setSelectedBidSeasons] = useState([]);
  const [selectedDates, setSelectedDates] = useState(null);
  const [bidSeasonData$, setBidSeasonData$] = useState(ManageBidSeasonsData);
  const [clearFilters, setClearFilters] = useState(false);

  const noFiltersSelected = selectedBidSeasons.flat().length === 0 && !selectedDates;


  const filterSeasonsByDate = (seasons, date) => {
    const filteredSeasons = seasons.filter(season => {
      const startDate = new Date(season.bidSeasonsBeginDate).getTime();
      const endDate = new Date(season.bidSeasonsEndDate).getTime();
      return ((date >= startDate) && (date <= endDate));
    });
    return filteredSeasons;
  };

  const bidSeasonDataFiltered = () => {
    if (noFiltersSelected) return ManageBidSeasonsData;
    const seasons = selectedBidSeasons.length > 0 ? selectedBidSeasons : ManageBidSeasonsData;
    if (selectedDates) return filterSeasonsByDate(seasons, selectedDates);
    return seasons;
  };

  // initial render
  useEffect(() => {
    dispatch(bidSeasonsFetchData());
  }, []);

  useEffect(() => {
    setBidSeasonData$(bidSeasonDataFiltered);
    if (noFiltersSelected) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [
    selectedBidSeasons,
    selectedDates,
    ManageBidSeasonsData,
  ]);

  const resetFilters = () => {
    setSelectedDates(null);
    setSelectedBidSeasons([]);
    setClearFilters(false);
  };


  // Overlay for error, info, and loading state
  const noResults = bidSeasonData$?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (ManageBidSeasonsDataLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (ManageBidSeasonsError) {
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

  const submit = (data) => {
    dispatch(bidSeasonsCreate(data));
  };

  const newSeason = () => {
    swal({
      title: 'Bid Season Information',
      button: false,
      content: (
        <EditBidSeasons
          submitAction={submit}
        />
      ),
    });
  };

  return (
    <div className="bid-seasons-page position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Bid Season Search" icon="calendar" className="xl-icon" />
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
        <div className="usa-width-one-whole position-search--filters--bs">
          <div className="filter-div">
            <div className="label">Season:</div>
            <Picky
              {...pickyProps}
              placeholder="Type to filter seasons"
              options={ManageBidSeasonsData}
              valueKey="id"
              labelKey="description"
              onChange={setSelectedBidSeasons}
              value={selectedBidSeasons}
            />
          </div>
          <div className="filter-div">
            <div className="label">Season Date:</div>
            <TMDatePicker
              onChange={setSelectedDates}
              selected={selectedDates}
              type="filter"
              showMonthDropdown
              showYearDropdown
              isClearable
            />
          </div>
        </div>

      </div>

      {
        getOverlay() ||
          <>
            <div className="usa-grid-full results-dropdown controls-container">
              <div className="bs-results">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    newSeason();
                  }}
                  to="#"
                >
                  <FA className="fa-solid fa-plus" />
                  {' Add New Bid Season'}
                </Link>
              </div>
            </div>

            <div className="bs-lower-section">
              {bidSeasonData$?.map(data =>
                <ManageBidSeasonCard {...data} key={data.id} />)}
            </div>
          </>

      }
    </div>
  );
};

export default withRouter(ManageBidSeasons);
