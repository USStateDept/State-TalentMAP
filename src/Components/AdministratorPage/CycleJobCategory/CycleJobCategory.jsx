import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import swal from '@sweetalert/with-react';
import { get, has, sortBy, uniqBy } from 'lodash';
import { filtersFetchData } from 'actions/filters/filters';
import { bidSeasonsFetchData, saveBidSeasonsSelections } from 'actions/BidSeasons';
import Spinner from 'Components/Spinner';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import TabbedCard from '../../TabbedCard/TabbedCard';
import CheckBox from '../../CheckBox/CheckBox';

const CycleJobCategory = () => {
  const dispatch = useDispatch();

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const userSelections = useSelector(state => state.bidSeasonsSelections);
  const genericFilters = useSelector(state => state.filters);
  const [selectedCycles, setSelectedCycles] = useState(userSelections.selectedCycles || []);

  const cycles = [].find(f => get(f, 'item.description') === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(get(cycles, 'data'), [(c) => c.custom_description]), 'custom_description');

  // Filters
  const [selectedBidSeasons, setSelectedBidSeasons] =
    useState(userSelections?.selectedBidSeasons || []);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
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
    page,
  });


  const fetchAndSet = (resetPage = false) => {
    setSelectedBidSeasons([]);
    if (resetPage) {
      setPage(1);
    }
    dispatch(saveBidSeasonsSelections(getCurrentInputs()));
    dispatch(bidSeasonsFetchData(getQuery()));
  };


  // initial render
  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveBidSeasonsSelections(currentInputs));
  }, []);

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

  function renderSelectionList({ items, selected, ...rest }) {
    let codeOrID = 'code';
    // only Cycle needs to use 'id'
    if (!has(items[0], 'code')) {
      codeOrID = 'id';
    }
    const getSelected = item => !!selected.find(f => f[codeOrID] === item[codeOrID]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    return items.map(item => (
      <ListItem
        key={item[codeOrID]}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getSelected}
      />
    ),
    );
  }

  const showCancelModal = () => {
    swal({
      title: 'Confirm Discard Changes',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>Are you sure you want to discard all changes made?</span>
          </div>
          <div className="modal-controls">
            <button
              onClick={() => {
                swal.close();
              }}
            >
              Submit
            </button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>Cancel</button>
          </div>
        </div >
      ),
    });
  };

  return (genericFiltersIsLoading ?
    <Spinner type="homepage-position-results" class="homepage-position-results" size="big" /> :
    <div className="cycle-job-category">
      <div className="cycle-job-category__header position-search--filters--cjc">
        <span className="header-title">
          Update Cycle Categories
        </span>
        <span className="header-subtitle">
          This is an area where you can edit the Job Category Descriptions
          tied to the Cycle Category.
        </span>
        <div className="filter-div">
          <div className="label">Cycle Category</div>
          <Picky
            placeholder="Select a Cycle Category"
            value={selectedCycles}
            options={cycleOptions}
            onChange={setSelectedCycles}
            numberDisplayed={2}
            includeFilter
            dropdownHeight={255}
            renderList={renderSelectionList}
            valueKey="id"
            labelKey="custom_description"
          />
        </div>
      </div>
      <TabbedCard
        tabs={[{
          text: 'Job Category Descriptions',
          value: 'descriptions',
          content: (
            <div className="job-category-table">
              <div className="category-type">
                <span>Category Type:</span>
                <span>(A) A100 Class</span>
              </div>
              <table>
                <tr>
                  <th>
                    <CheckBox
                      id="select-all"
                      value
                    />
                  </th>
                  <th>Job Category Description</th>
                  <th>
                    <div>
                      Status
                    </div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <CheckBox
                      id="select-all"
                      value
                    />
                  </td>
                  <td>
                    Description
                  </td>
                  <td>
                    Description
                  </td>
                </tr>
              </table>
              <div className="position-form--actions">
                <button onClick={showCancelModal}>Cancel</button>
                <button onClick={() => console.log('Save')}>Save</button>
              </div>
            </div>
          ),
        }]}
      />
    </div>
  );
};

CycleJobCategory.propTypes = {
};

CycleJobCategory.defaultProps = {
};

export default withRouter(CycleJobCategory);
