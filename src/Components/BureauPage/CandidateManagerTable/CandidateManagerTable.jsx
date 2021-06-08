import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InteractiveElement from '../../InteractiveElement';

const CandidateManagerTable = props => {
  // eslint-disable-next-line no-console
  console.log('fine', props.userSelections);
  const posData = [
    {
      id: null,
      grade: '05',
      skill: 'ECON RESOURCES & COMMODITIES (5050)',
      skill_code: '5050',
      skill_secondary: null,
      skill_secondary_code: null,
      bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
      bureau_short_desc: 'EUR',
      organization: '(A) ASSISTANT SECRETARY FOR ADMINISTRATION',
      tour_of_duty: '3 YRS (2 R & R)',
      classifications: null,
      representation: null,
      availability: {
        availability: null,
        reason: null,
      },
      position_number: 'S6601900',
      title: 'COMMUNICATIONS PROGRAMS OFF',
      is_overseas: null,
      create_date: null,
      update_date: null,
      update_user: null,
      effective_date: null,
      posted_date: '2021-04-10T00:31:01.221000Z',
      description: {
        id: null,
        last_editing_user: null,
        is_editable_by_user: null,
        date_created: null,
        date_updated: '2021-04-09T14:31:00.733000Z',
        content: 'Updated July 2016:  The Information Programs Officer &#40;IPO -- formerly called Communications Programs Officer&#41; is a demanding and interesting position located in the Information Programs Center &#40;IPC&#41; at the Florida Regional Center &#40;FRC&#41;.  A unique operating environment, the FRC in Ft. Lauderdale, FL combines features of both domestic and overseas IT operations, giving the IPO the opportunity to support a wide range of network components and applications on both the classified and unclassified networks, including SQL and blackberry server administration, WebPass, SharePoint development, Data Off-Shoring, and server virtualization. The IPO supervises one IMS, supporting a large number of classified and unclassified IT programs; and three IMS rovers which provide WHA-wide communications support. As a member of the IRM management team at post, the IPO works closely with the IMO and ISO.  The IPO is also responsible for providing support and technical guidance to the Consulates in Hamilton and Curacao, including bi-monthly onsite visits. The FRC regularly pilots new technology for the Department and currently has several ongoing projects at various levels of testing.  This position is ideal for talented IRM individuals who enjoy working as part of a cohesive, highly productive team and are seeking an opportunity to exercise and enhance their technical, managerial, and supervisory skills. Please contact IMO Chuck Vinnedge, &#40;954&#41;630-1124 for additional information.&#13;&#10;',
        point_of_contact: null,
        website: null,
      },
      current_assignment: {
        user: null,
        user_perdet_seq_num: null,
        tour_of_duty: '3 YRS (2 R & R)',
        status: null,
        start_date: null,
        estimated_end_date: '2012-10-22T05:00:00Z',
      },
      commuterPost: {
        description: null,
        frequency: null,
      },
      post: {
        id: null,
        code: 'VE3000000',
        tour_of_duty: '3 YRS (2 R & R)',
        post_overview_url: null,
        post_bidding_considerations_url: null,
        cost_of_living_adjustment: null,
        differential_rate: 35,
        danger_pay: 20,
        rest_relaxation_point: null,
        has_consumable_allowance: null,
        has_service_needs_differential: null,
        obc_id: null,
        location: {
          country: 'Guadeloupe',
          code: 'VE3000000',
          city: 'Greensburg',
          state: '',
        },
      },
      latest_bidcycle: {
        id: 158,
        name: 'Now & Winter 2018/2019',
        cycle_start_date: null,
        cycle_deadline_date: null,
        cycle_end_date: null,
        active: null,
      },
      languages: [
        {
          language: 'Haitian Creole',
          reading_proficiency: '1',
          spoken_proficiency: '1',
          representation: 'Haitian Creole (HC) 1/1',
        },
        {
          language: 'Arabic Egyptian',
          reading_proficiency: '1',
          spoken_proficiency: '1',
          representation: 'Arabic Egyptian (AE) 1/1',
        },
      ],
    },
    {
      id: null,
      grade: '05',
      skill: 'ECON RESOURCES & COMMODITIES (5050)',
      skill_code: '5050',
      skill_secondary: null,
      skill_secondary_code: null,
      bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
      bureau_short_desc: 'EUR',
      organization: '(A) ASSISTANT SECRETARY FOR ADMINISTRATION',
      tour_of_duty: '3 YRS (2 R & R)',
      classifications: null,
      representation: null,
      availability: {
        availability: null,
        reason: null,
      },
      position_number: 'S6601900',
      title: 'COMMUNICATIONS PROGRAMS OFF',
      is_overseas: null,
      create_date: null,
      update_date: null,
      update_user: null,
      effective_date: null,
      posted_date: '2021-04-10T00:31:01.221000Z',
      description: {
        id: null,
        last_editing_user: null,
        is_editable_by_user: null,
        date_created: null,
        date_updated: '2021-04-09T14:31:00.733000Z',
        content: 'Updated July 2016:  The Information Programs Officer &#40;IPO -- formerly called Communications Programs Officer&#41; is a demanding and interesting position located in the Information Programs Center &#40;IPC&#41; at the Florida Regional Center &#40;FRC&#41;.  A unique operating environment, the FRC in Ft. Lauderdale, FL combines features of both domestic and overseas IT operations, giving the IPO the opportunity to support a wide range of network components and applications on both the classified and unclassified networks, including SQL and blackberry server administration, WebPass, SharePoint development, Data Off-Shoring, and server virtualization. The IPO supervises one IMS, supporting a large number of classified and unclassified IT programs; and three IMS rovers which provide WHA-wide communications support. As a member of the IRM management team at post, the IPO works closely with the IMO and ISO.  The IPO is also responsible for providing support and technical guidance to the Consulates in Hamilton and Curacao, including bi-monthly onsite visits. The FRC regularly pilots new technology for the Department and currently has several ongoing projects at various levels of testing.  This position is ideal for talented IRM individuals who enjoy working as part of a cohesive, highly productive team and are seeking an opportunity to exercise and enhance their technical, managerial, and supervisory skills. Please contact IMO Chuck Vinnedge, &#40;954&#41;630-1124 for additional information.&#13;&#10;',
        point_of_contact: null,
        website: null,
      },
      current_assignment: {
        user: null,
        user_perdet_seq_num: null,
        tour_of_duty: '3 YRS (2 R & R)',
        status: null,
        start_date: null,
        estimated_end_date: '2012-10-22T05:00:00Z',
      },
      commuterPost: {
        description: null,
        frequency: null,
      },
      post: {
        id: null,
        code: 'VE3000000',
        tour_of_duty: '3 YRS (2 R & R)',
        post_overview_url: null,
        post_bidding_considerations_url: null,
        cost_of_living_adjustment: null,
        differential_rate: 35,
        danger_pay: 20,
        rest_relaxation_point: null,
        has_consumable_allowance: null,
        has_service_needs_differential: null,
        obc_id: null,
        location: {
          country: 'Guadeloupe',
          code: 'VE3000000',
          city: 'Greensburg',
          state: '',
        },
      },
      latest_bidcycle: {
        id: 163,
        name: '2019 DCM/PO',
        cycle_start_date: null,
        cycle_deadline_date: null,
        cycle_end_date: null,
        active: null,
      },
      languages: [
        {
          language: 'Haitian Creole',
          reading_proficiency: '1',
          spoken_proficiency: '1',
          representation: 'Haitian Creole (HC) 1/1',
        },
        {
          language: 'Arabic Egyptian',
          reading_proficiency: '1',
          spoken_proficiency: '1',
          representation: 'Arabic Egyptian (AE) 1/1',
        },
      ],
    },
  ];
  const positionTableHeaders = [
    'Rank',
    'Position',
    'Post',
    'Skill',
    'Grade',
    'Bid Cycle',
    'TED',
    'Date of Submission',
  ];

  return (
    <div>
      <Link to={'/profile/public/4'}>Jenny Townpost</Link>
      <table className={'candidate-manager-table'}>
        <thead>
          <tr className={'bidder-information'}>
            <th>SPECIAL AGENT</th>
            <th>Js current post</th>
            <th>EXECUTIVE (CAREER) (0020)</th>
            <th>00</th>
            <th />
            <th />
            <th />
            <th />
          </tr>
          <tr className={'table-headers'}>
            {
              positionTableHeaders.map(item => (
                <th
                  key={item}
                  className="ab-headers"
                  scope="col"
                >
                  {item}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            posData.map(pos => (
              <tr>
                <td>7</td>
                <td>{pos.title}</td>
                <td>{pos.post.country}</td>
                <td>{pos.skill}</td>
                <td>{pos.grade}</td>
                <td>{pos.latest_bidcycle.name}</td>
                <td>{pos.current_assignment.estimated_end_date}</td>
                <td>April 22, 2021</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Link to={'/profile/public/6'}>Tarek Rehman</Link>
      <table className={'candidate-manager-table'}>
        <thead>
          <tr className={'bidder-information'}>
            <th>INFORMATION MANAGEMENT SPEC</th>
            <th>Ts current post</th>
            <th>CONSTRUCTIONS ENGINEERING (6218)</th>
            <th>02</th>
            <th />
            <th />
            <th />
            <th />
          </tr>
          <tr className={'table-headers'}>
            {
              positionTableHeaders.map(item => (
                <th
                  key={item}
                  className="ab-headers"
                  scope="col"
                >
                  {item}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            posData.map(pos => (
              <tr>
                <td>7</td>
                <td>{pos.title}</td>
                <td>{pos.post.country}</td>
                <td>{pos.skill}</td>
                <td>{pos.grade}</td>
                <td>{pos.latest_bidcycle.name}</td>
                <td>{pos.current_assignment.estimated_end_date}</td>
                <td>April 22, 2021</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <InteractiveElement
          className="usa-button btn-icon-to-spinner"
          type="button"
        >
          <span className="btn-icon-to-spinner-text">Submit Rankings</span>
        </InteractiveElement>
        {/* bc once a user is unranked they will be automatically removed off */}
        {/* the list, we want to have a submit button that will make the changes. */}
      </div>
    </div>
  );
};

CandidateManagerTable.propTypes = {
  userSelections: PropTypes.shape({}),
};

CandidateManagerTable.defaultProps = {
  userSelections: {},
};

export default CandidateManagerTable;
