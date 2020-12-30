import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { availableBiddersFetchData } from 'actions/cdo';
import ToggleButton from 'Components/ToggleButton';
import ExportButton from 'Components/ExportButton';
import { get } from 'lodash';
// import EditBidder from 'Components/AvailableBidders/EditBidder';
import AvailableBidderRow from 'Components/AvailableBidders/AvailableBidderRow';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import shortid from 'shortid';
import swal from '@sweetalert/with-react';


const Bidders = () => {
  // Local state
  const [cdoView, setCdoView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const biddersIsLoading = useSelector(state => state.biddersIsLoading);

  const bidders = get(biddersData, 'results', []);

  // Actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(availableBiddersFetchData());
  }, []);


  const modalContent = () => {
    setShowModal(!showModal);
    swal({
      title: 'Available Bidder Record Editor',
      buttons: ['Cancel', 'Save'],
      show: showModal,
      content: (
        <div>
          <form>
            <label htmlFor="name">Client Name:</label>
            <input type="text" name="name" disabled value="Jenny Townpost" />
            <label htmlFor="status">Status:</label>
            <select id="status">
              <option value="OC">OC: Overcompliment</option>
              <option value="UA">UA: Unassigned</option>
              <option value="IT">IT: In Transit</option>
              <option value="AWOL">AWOL: Absent without leave</option>
            </select>
            <label htmlFor="skill">Skill:</label>
            <input type="text" name="skill" disabled value="0020 - EXECUTIVE (CAREER)" />
            <label htmlFor="grade">Grade:</label>
            <input type="text" name="grade" disabled value="00" />
            <label htmlFor="division">Division:</label>
            <input type="text" name="division" disabled value="ML" />
            <label htmlFor="ted">TED:</label>
            <input type="text" name="ted" disabled value="11/11/11" />
            <label htmlFor="beginDate">Begin Date:</label>
            <input type="text" name="beginDate" disabled value="11/11/13" />
            <label htmlFor="currentPost">Current Post:</label>
            <input type="text" name="currentPost" disabled value="Djibouti" />
            <label htmlFor="ocBureau">OC Bureau:</label>
            <input type="text" name="ocBureau" disabled value="(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS" />
            <label htmlFor="ocReason">OC Reason:</label>
            <input type="text" name="ocReason" disabled value="Compassionate Curtailment" />
            <label htmlFor="cdo">CDO:</label>
            <input type="text" name="cdo" disabled value="Leah Shadrach" />
            <label htmlFor="comment">Comment:</label>
            <input type="text" name="comment" />
          </form>
        </div>
      ),
    });
  };

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
      <table className="bidder-manager-bidders">
        <thead>
          <tr />
          <tr>
            {
              tableHeaders.map(item => (
                <th className="ab-headers" scope="col">{item} <FA name="sort" /></th>
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
            id={shortid.generate()}
            bidder={bidder}
            isLoading={biddersIsLoading}
            showModal={modalContent}
            CDOView={cdoView}
          />))}
        </tbody>
      </table>
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


// export const mapDispatchToProps = dispatch => ({
//   fetchBureauPositions: query => dispatch(bureauPositionsFetchData(query)),
//   fetchFilters: (items, queryParams, savedFilters) =>
//     dispatch(filtersFetchData(items, queryParams, savedFilters)),
//   saveSelections: (selections) => dispatch(saveBureauUserSelections(selections)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(PositionManager);
