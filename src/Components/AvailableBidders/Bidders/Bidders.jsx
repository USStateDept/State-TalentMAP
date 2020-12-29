import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import ToggleButton from 'Components/ToggleButton';
import ExportButton from 'Components/ExportButton';
// import EditBidder from 'Components/AvailableBidders/EditBidder';
import AvailableBidderRow from 'Components/AvailableBidders/AvailableBidderRow';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import shortid from 'shortid';
import swal from '@sweetalert/with-react';


const Bidders = props => {
  const [cdoView, setCdoView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Replace bidder fake data with line 20
  // const bidderData = useSelector(state => state.bidderData);
  const biddersIsLoading = useSelector(state => state.biddersIsLoading);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(bidderActions);
  // }, []);

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

  // Dummy Data
  const bidder = {
    id: '851',
    name: 'Jenny Townpost',
    initials: 'JT',
    perdet_seq_number: 4,
    grade: '00',
    skills: [
      {
        code: '0020',
        description: 'EXECUTIVE (CAREER)',
      },
    ],
    employee_id: '851',
    role_code: 'fsofficer',
    pos_location: 'Klondike, Saudi Arabia',
    hasHandshake: null,
    classifications: [

    ],
    current_assignment: {
      id: null,
      position_id: '96350',
      start_date: '2020-07-21T18:02:47.378000Z',
      end_date: '4/02/2021',
      position: {
        grade: '06',
        skill: 'REFUGEE AFFAIRS (6090)',
        skill_code: '6090',
        bureau: '(DS) BUREAU OF DIPLOMATIC SECURITY',
        position_number: '96350',
        title: 'MANAGEMENT ANALYSIS OFFICER',
        post: {
          code: '040530019',
          post_overview_url: null,
          post_bidding_considerations_url: null,
          obc_id: null,
          location: {
            country: 'Saudi Arabia',
            code: '040530019',
            city: 'Klondike',
            state: '',
          },
        },
        language: 'Spanish 3/3',
      },
    },
    assignments: [
      {
        id: null,
        position_id: '2703',
        start_date: '2020-07-21T18:02:47.378000Z',
        end_date: '4/02/2021',
        position: {
          grade: 'OM',
          skill: 'INTERNATIONAL TRANS & COMM (5030)',
          skill_code: '5030',
          bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
          position_number: '2703',
          title: 'INFORMATION MANAGEMENT SPEC',
          post: {
            code: 'TS8000000',
            post_overview_url: null,
            post_bidding_considerations_url: null,
            obc_id: null,
            location: {
              country: 'Somalia',
              code: 'TS8000000',
              city: 'Gambrills',
              state: '',
            },
          },
          language: 'Spanish 3/3',
        },
      },
    ],
    cdo: {
      name: 'Shadtrach, L',
      email: 'shadtrachl@state.gov',
    },
  };

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
          {[...Array(10).keys()].map(() => (<AvailableBidderRow
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
