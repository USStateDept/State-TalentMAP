import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import Alert from 'Components/Alert';
import { bidSeasonsFetchData, bidSeasonsPositionEdit, saveBidSeasonsSelections } from 'actions/BidSeasons';
import { renderSelectionList } from 'utilities';
import swal from '@sweetalert/with-react';
import ManageBidSeasonCard from './ManageBidSeasonsCard';
import EditBidSeasons from './EditBidSeasons';


const ManageBidSeasons = () => {
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.bidSeasonsSelections);
  const ManageBidSeasonsDataLoading = useSelector(state => state.bidSeasonsFetchDataLoading);
  const ManageBidSeasonsData = useSelector(state => state.bidSeasons);
  const ManageBidSeasonsError = useSelector(state => state.bidSeasonsFetchDataErrored);

  // Filters
  const [selectedBidSeasons, setSelectedBidSeasons] =
    useState(userSelections?.selectedBidSeasons || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || null);
  const [bidSeasonData$, setBidSeasonData$] = useState(ManageBidSeasonsData);
  const [clearFilters, setClearFilters] = useState(false);

  const getCurrentInputs = () => ({
    selectedBidSeasons,
    selectedDates,
  });

  const noFiltersSelected = selectedBidSeasons.flat().length === 0 && !selectedDates;
  const bidSeasonOptions = ManageBidSeasonsData || [];


  const filterSeasonsByDateRange = (seasons, dateRange) => {
    const startDateRange = dateRange[0].getTime();
    const endDateRange = dateRange[1].getTime();

    const filteredSeasons = seasons.filter(season => {
      const startDate = new Date(season.bid_seasons_begin_date).getTime();
      const endDate = new Date(season.bid_seasons_end_date).getTime();
      return startDate >= startDateRange && endDate <= endDateRange;
    });

    return filteredSeasons;
  };

  const bidSeasonDataFiltered = () => {
    if (noFiltersSelected) return ManageBidSeasonsData;
    const seasons = selectedBidSeasons.length > 0 ? selectedBidSeasons : ManageBidSeasonsData;
    if (selectedDates) return filterSeasonsByDateRange(seasons, selectedDates);
    return seasons;
  };

  // initial render
  useEffect(() => {
    dispatch(saveBidSeasonsSelections(getCurrentInputs()));
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
    ManageBidSeasonsDataLoading,
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
      overlay = <Spinner type="bid-season-filters" class="homepage-position-results" size="big" />;
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
    dispatch(bidSeasonsPositionEdit(data));
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
    ManageBidSeasonsDataLoading
      ?
      <Spinner type="homepage-position-results" class="homepage-position-results" size="big" />
      :
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
                options={bidSeasonOptions}
                valueKey="id"
                labelKey="description"
                onChange={setSelectedBidSeasons}
                value={selectedBidSeasons}
              />
            </div>
            <div className="filter-div">
              <div className="label">Season Date:</div>
              <DateRangePicker
                onChange={setSelectedDates}
                value={selectedDates}
                maxDetail="month"
                calendarIcon={null}
                showLeadingZeros
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
                <ManageBidSeasonCard {...data} />)}
            </div>
          </>

        }
      </div>
  );
};

export default withRouter(ManageBidSeasons);
