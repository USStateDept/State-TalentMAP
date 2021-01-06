import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { availableBiddersFetchData } from 'actions/cdo';
import ToggleButton from 'Components/ToggleButton';
import ExportButton from 'Components/ExportButton';
import { get } from 'lodash';
import AvailableBidderRow from 'Components/AvailableBidders/AvailableBidderRow';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import Spinner from 'Components/Spinner';
import shortid from 'shortid';


const Bidders = () => {
  // Local state
  const [cdoView, setCdoView] = useState(true);

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const biddersDataIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);

  const bidders = get(biddersData, 'results', []);

  // Actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(availableBiddersFetchData());
  }, []);


  const tableHeaders = [
    'Name',
    'Status',
    'Skill',
    'Grade',
    'TED',
    'Post',
    'OC Bureau',
    'OC Reason',
    'CDO',
    'Comments',
  ];


  return (
    <div className="usa-width-one-whole bidder-manager-bidders ab-lower-section">
      <div className="ab-table-title-row">
        <h3>{cdoView ? 'Internal CDO View' : 'External Bureau View'}</h3>
        <div className="export-button-container">
          <ExportButton />
        </div>
      </div>
      {
        biddersDataIsLoading ?
          <Spinner type="bureau-results" class="homepage-position-results" size="big" />
          :
          <table className="bidder-manager-bidders">
            <thead>
              <tr />
              <tr>
                {
                  tableHeaders.map(item => (
                    <th key={shortid.generate()} className="ab-headers" scope="col" >{item} <FA name="sort" /></th>
                  ))
                }
                <th className="action-header">
                  <div className="bureau-view-toggle">
                    <ToggleButton
                      labelTextLeft={
                        <Tooltip
                          title="CDO View"
                          arrow
                          offset={-95}
                          position="top-end"
                          tabIndex="0"
                        >
                          <FA name="street-view" className="fa-lg" />
                        </Tooltip>
                      }
                      labelTextRight={
                        <Tooltip
                          title="Bureau View"
                          arrow
                          offset={-95}
                          position="top-end"
                          tabIndex="0"
                        >
                          <FA name="building" className="fa-lg" />
                        </Tooltip>
                      }
                      checked={!cdoView}
                      onChange={() => setCdoView(!cdoView)}
                      onColor="#888"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {bidders.map(bidder => (<AvailableBidderRow
                key={bidder.bidder_perdet}
                bidder={bidder}
                CDOView={cdoView}
              />))}
            </tbody>
          </table>
      }
    </div>
  );
};

Bidders.propTypes = {
};

Bidders.defaultProps = {
  bidders: [],
  onSort: EMPTY_FUNCTION,
  onFilter: EMPTY_FUNCTION,
};

export default Bidders;
