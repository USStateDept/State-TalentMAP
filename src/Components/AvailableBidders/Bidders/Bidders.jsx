import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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


const Bidders = (props) => {
  const { isCDO } = props;

  // Local state
  const [cdoView, setCdoView] = useState(true);

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const biddersDataIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);

  const bidders = isCDO ? get(biddersData, 'results', []) : biddersData;

  // Actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(availableBiddersFetchData(isCDO));
  }, []);

  const tableHeaders = isCDO ? [
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
  ] : [
    'Name',
    'Skill',
    'Grade',
    'TED',
    'Post',
    'CDO',
  ];

  let title;
  if (!isCDO) {
    title = 'Bureau View';
  } else if (cdoView) {
    title = 'Internal CDA View';
  } else {
    title = 'External Bureau View';
  }

  return (
    <div className="usa-width-one-whole bidder-manager-bidders ab-lower-section">
      <div className="ab-table-title-row">
        <h3>{title}</h3>
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
                {
                  isCDO &&
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
                }
              </tr>
            </thead>
            <tbody>
              {bidders.map(bidder => (
                <AvailableBidderRow
                  key={get(bidder, 'bidder_perdet') || get(bidder, 'perdet_seq_number')}
                  bidder={bidder}
                  CDOView={cdoView}
                  isCDO={isCDO}
                />
              ))}
            </tbody>
          </table>
      }
    </div>
  );
};

Bidders.propTypes = {
  isCDO: PropTypes.bool,
};

Bidders.defaultProps = {
  bidders: [],
  onSort: EMPTY_FUNCTION,
  onFilter: EMPTY_FUNCTION,
  isCDO: false,
};

export default Bidders;
