import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { availableBidderExport, availableBiddersFetchData } from 'actions/availableBidders';
import { filtersFetchData } from 'actions/filters/filters';
import ToggleButton from 'Components/ToggleButton';
import ExportButton from 'Components/ExportButton';
import InteractiveElement from 'Components/InteractiveElement';
import { get } from 'lodash';
import AvailableBidderRow from 'Components/AvailableBidder/AvailableBidderRow';
import Alert from 'Components/Alert/Alert';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import shortid from 'shortid';
import { useMount, usePrevious } from 'hooks';

const useStepLetter = () => checkFlag('flags.step_letters');

const AvailableBidderTable = props => {
  const { isInternalCDA, isAO, isPost } = props;

  // Local state
  // Toggle view state within Internal CDA version
  const [internalViewToggle, setInternalViewToggle] = useState(true);
  const [internalCDAView, setInternalCDAView] = useState(isInternalCDA);
  const [sort, setSort] = useState('Name');
  const [exportIsLoading, setExportIsLoading] = useState(false);

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const availableBiddersIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);
  const filtersIsLoading = useSelector(state => state.filtersIsLoading);
  const filterData = useSelector(state => state.filters);

  const isLoading = availableBiddersIsLoading || filtersIsLoading;


  const bureaus = (get(filterData, 'filters') || []).find(f => f.item.description === 'region');

  const bidders = isLoading ? [...new Array(10)] : get(biddersData, 'results', []);

  const prevSort = usePrevious(sort);

  // Actions
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(availableBiddersFetchData(isInternalCDA, sort));
    dispatch(filtersFetchData(filterData, {}));
  });

  useEffect(() => {
    if (prevSort && sort && sort !== prevSort) {
      dispatch(availableBiddersFetchData(isInternalCDA, sort));
    }
  }, [sort]);

  let tableHeaders = isInternalCDA ? [
    'Name',
    'Status',
    isInternalCDA && useStepLetter() ? 'Step Letters' : undefined,
    'Skill',
    'Grade',
    'Languages',
    'TED',
    'Post',
    'CDO',
    'Comments',
  ] : [
    'Name',
    'Skill',
    'Grade',
    'Languages',
    'TED',
    'Post',
    'CDO',
  ];

  tableHeaders = tableHeaders.filter(f => f);

  const getSortIcon = (header) => {
    if (header === sort) {
      return 'sort-asc';
    } else if (`-${header}` === sort) {
      return 'sort-desc';
    }
    return 'sort';
  };

  const handleSort = (header) => (
    // Dynamically set the sort asc or desc('-')
    header === sort ? setSort(`-${header}`) : setSort(header)
  );

  let title = '';
  if (isInternalCDA) {
    title = internalViewToggle ? 'Internal CDA View' : 'External CDA View';
  }

  const getTitleCount = () => {
    let bidderCountTitle = '';
    if (!isLoading) {
      if (isInternalCDA) {
        bidderCountTitle = internalViewToggle ? `(${bidders.length})` : `(${bidders.filter(b => get(b, 'available_bidder_details.is_shared')).length})`;
      } else {
        bidderCountTitle = `Shared Available Bidders (${bidders.length})`;
      }
    }
    return bidderCountTitle;
  };

  const internalCDAExportToggle = () => {
    setInternalViewToggle(!internalViewToggle);
    setInternalCDAView(!internalCDAView);
  };

  const exportBidders = () => {
    if (!isLoading) {
      setExportIsLoading(true);
      availableBidderExport(internalCDAView, sort)
        .then(() => {
          setExportIsLoading(false);
        })
        .catch(() => {
          setExportIsLoading(false);
        });
    }
  };

  return (
    !bidders.length && !isLoading ?
      <div className="usa-width-two-thirds">
        <Alert
          title="Available Bidders List is Empty"
          messages={[{
            body: isInternalCDA ?
              'Please navigate to the CDO Client Profiles to begin searching and adding bidders.' :
              'Please wait for CDOs to share available bidders.',
          }]}
        />
      </div>
      :
      <div className="usa-width-one-whole bidder-manager-bidders ab-lower-section">
        <div className="ab-table-title-row">
          <h3>{title} {getTitleCount()}</h3>
          <div className="export-button-container">
            <ExportButton
              onClick={exportBidders}
              isLoading={exportIsLoading}
              disabled={!bidders.length}
              text={internalViewToggle ? 'Export' : 'Export External View'}
            />
          </div>
        </div>
        {
          <table className="bidder-manager-bidders">
            <thead>
              <tr>
                {
                  tableHeaders.map(item => (
                    item !== 'Languages' && item !== 'Comments' && item !== 'Step Letters' ?
                      <th
                        key={item}
                        scope="col"
                      >
                        <InteractiveElement onClick={() => handleSort(item)}>
                          {item} <FA name={getSortIcon(item)} />
                        </InteractiveElement>
                      </th>
                      :
                      <th
                        key={item}
                        scope="col"
                      >
                        {item}
                      </th>
                  ))
                }
                {
                  isInternalCDA &&
                    <th>
                      <div className="external-view-toggle">
                        <ToggleButton
                          labelTextLeft={
                            <Tooltip
                              title="Internal CDA View"
                              arrow
                              offset={-95}
                              position="top-end"
                              tabIndex="0"
                            >
                              <FA name="street-view" className={`fa-lg ${internalViewToggle ? 'active' : ''}`} />
                            </Tooltip>
                          }
                          labelTextRight={
                            <Tooltip
                              title="External CDA View"
                              arrow
                              offset={-95}
                              position="top-end"
                              tabIndex="0"
                            >
                              <FA name="building" className={`fa-lg ${!internalViewToggle ? 'active' : ''}`} />
                            </Tooltip>
                          }
                          checked={!internalViewToggle}
                          // onChange={() => setInternalViewToggle(!internalViewToggle)}
                          onChange={() => internalCDAExportToggle()}
                          onColor="#888888"
                          offColor="#888888"
                          onHandleColor="#FFFFFF"
                          offHandleColor="#FFFFFF"
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                    </th>
                }
              </tr>
            </thead>
            <tbody>
              {
                bidders.map(bidder => (
                  <AvailableBidderRow
                    key={shortid.generate()}
                    bidder={bidder}
                    internalViewToggle={internalViewToggle}
                    isAO={isAO}
                    isInternalCDA={isInternalCDA}
                    isPost={isPost}
                    isLoading={isLoading}
                    bureaus={bureaus}
                    sort={sort}
                  />
                ))
              }
            </tbody>
          </table>
        }
      </div>
  );
};

AvailableBidderTable.propTypes = {
  isInternalCDA: PropTypes.bool,
  isAO: PropTypes.bool,
  isPost: PropTypes.bool,
};

AvailableBidderTable.defaultProps = {
  bidders: [],
  onSort: EMPTY_FUNCTION,
  onFilter: EMPTY_FUNCTION,
  isInternalCDA: false,
  isAO: false,
  isPost: false,
};

export default AvailableBidderTable;
