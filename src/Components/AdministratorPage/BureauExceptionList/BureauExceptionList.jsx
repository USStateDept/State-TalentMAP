import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PaginationWrapper from 'Components/PaginationWrapper';
import Alert from 'Components/Alert';
import { usePrevious } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { bureauExceptionFetchData, saveBureauExceptionSelections } from 'actions/bureauException';
import BureauExceptionListCard from './BureauExceptionListCard';


const BureauExceptionList = (props) => {
  const dispatch = useDispatch();
  const { isAO } = props;

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.bureauExceptionsSelections);
  const BureauExceptionDataLoading = useSelector(state => state.bureauExceptionsFetchDataLoading);
  const BureauExceptionData = useSelector(state => state.bureauExceptions);
  const BureauExceptionError = useSelector(state => state.bureauExceptionsFetchDataErrored);
  const genericFilters = useSelector(state => state.filters);

  // Filters
  const [selectedBidSeasons, setSelectedBidSeasons] =
    useState(userSelections?.selectedBidSeasons || []);
  const [newModalOpen, setNewModalOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
  const prevPage = usePrevious(page);
  const currentInputs = {
    page,
    selectedBidSeasons,
  };

  const getCurrentInputs = () => ({
    page,
    selectedBidSeasons,
  });

  const getQuery = () => ({
    'bid-seasons': selectedBidSeasons.map(bidCycleObject => (bidCycleObject?.id)),
  });

  const fetchAndSet = (resetPage = false) => {
    setSelectedBidSeasons([]);
    if (resetPage) {
      setPage(1);
    }
    dispatch(saveBureauExceptionSelections(getCurrentInputs()));
    dispatch(bureauExceptionFetchData(getQuery()));
  };


  // initial render
  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveBureauExceptionSelections(currentInputs));
  }, []);

  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    }
  }, []);

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

  // Overlay for error, info, and loading state
  const noResults = BureauExceptionData?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (BureauExceptionDataLoading) {
      overlay = <Spinner type="bid-season-filters" class="homepage-position-results" size="big" />;
    } else if (BureauExceptionError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const openNewModal = (e) => {
    e.preventDefault();
    setNewModalOpen(true);
    setTimeout(() => {
      setNewModalOpen(false);
    }, 200);
  };

  // will delete in a bit
  console.log(openNewModal);
  return (
    genericFiltersIsLoading ?
      <Spinner type="homepage-position-results" class="homepage-position-results" size="big" /> :
      <div className="bid-seasons-page position-search">
        <div className="usa-grid-full position-search--header">
          <ProfileSectionTitle title="Bureau Exception List" icon="calendar" className="xl-icon" />
        </div>

        {
          getOverlay() ||
          <>
            <div className="bs-lower-section">
              {BureauExceptionData?.results?.map(data =>
                <BureauExceptionListCard {...{ ...data, isAO }} displayNewModal={newModalOpen} />)}
              <div className="usa-grid-full react-paginate">
                <PaginationWrapper
                  pageSize={5}
                  onPageChange={p => setPage(p.page)}
                  forcePage={page}
                  totalResults={BureauExceptionData.count}
                />
              </div>
            </div>
          </>
        }
      </div>
  );
};

BureauExceptionList.propTypes = {
  isAO: PropTypes.bool,
};

BureauExceptionList.defaultProps = {
  isAO: false,
};

export default withRouter(BureauExceptionList);
