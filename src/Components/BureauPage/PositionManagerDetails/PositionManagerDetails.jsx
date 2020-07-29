import React, { Component } from 'react';
import { get } from 'lodash';
import PositionDetailsItem from 'Components/PositionDetailsItem';
import ExportButton from 'Components/ExportButton';
import OBCUrl from 'Components/OBCUrl';
import { getPostName } from 'utilities';
import { NO_POST } from 'Constants/SystemMessages';
import { downloadBidderData } from 'actions/bureauPositions';
import PositionManagerBidders from '../PositionManagerBidders';

class PositionManagerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  exportBidders = () => {
    this.setState({ isLoading: true });
    downloadBidderData()
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading } = this.state;
    const result = { id: 22392, status: null, status_code: 'OP', ted: '2020-07-07T01:12:49.695000Z', posted_date: '2020-07-07T01:12:49.695000Z', availability: { availability: null, reason: null }, tandem_nbr: null, position: { id: null, grade: '08', skill: 'FINANCE & ECONOMIC DEVELOPMENT (5025)', skill_code: '5025', bureau: '(L) OFFICE OF THE LEGAL ADVISER', organization: '(A) ASSISTANT SECRETARY FOR ADMINISTRATION', tour_of_duty: '2 YRS (3 R & R)', classifications: null, representation: null, availability: { availability: null, reason: null }, position_number: '55364111', title: 'INFORMATION SYSTEMS OFFICER', is_overseas: null, is_highlighted: false, create_date: null, update_date: null, effective_date: null, posted_date: '2020-07-07T01:12:49.695000Z', description: { id: null, last_editing_user: null, is_editable_by_user: null, date_created: null, date_updated: '2020-07-06T15:12:49.325000Z', content: 'ISO:Information Systems Office &#40;ISO&#41; in Vladivostok is staffed by two direct-hire Americans. It is responsible for the full range of IMO/IPO/ISSO functions, including unclassified and SBU classified pouch, high frequency and VHF/UHF radio systems, Iridium satellite phones, unclassified SBU OpenNet, Meridian Nortel 11C digital phone system, and 3 separate dedicated internet networks. The ISO section has direct liaison with RIMCs in Bangkok, Frankfurt, and Moscow and handles SBU classified pouch delivery through SRDCH Seoul. The Information Systems Officer &#40;ISO&#41; and Information Management Specialist &#40;IMS&#41; both cover all areas of the ISC. Additionally, the ISO is responsible for OpenNet project administration, application and customer service support, and also serves as the ISSO. The ISO reports to and acts as backup to the Management Officer. The ISO provides direct supervision to the IMS. **Please note - we have requested the removal of this language designation** POC Michael Gillen. gillenml&#64;state.gov. We are collecting lobbying documents through the EUR-IO 360 Lobbying Center. Please submit your lobbying information at http://eur.p.state.sbu/sites/apps/EURApps/EUR360Center/', point_of_contact: null, website: null }, current_assignment: { user: null, tour_of_duty: '2 YRS (3 R & R)', status: null, start_date: null, estimated_end_date: '2010-10-27T05:00:00Z' }, commuterPost: { description: null, frequency: null }, post: { id: null, code: 'ZI8000000', tour_of_duty: '2 YRS (3 R & R)', post_overview_url: { internal: 'http://www.google.com', external: 'http://www.google.com' }, post_bidding_considerations_url: null, cost_of_living_adjustment: null, differential_rate: 10, danger_pay: 20, rest_relaxation_point: null, has_consumable_allowance: null, has_service_needs_differential: null, obc_id: null, location: { country: 'Macau', code: 'ZI8000000', city: 'Spelter', state: '' } }, latest_bidcycle: { id: 158, name: 'Now & Winter 2018/2019', cycle_start_date: null, cycle_deadline_date: null, cycle_end_date: null, active: null }, languages: [{ language: 'Chinese-Mandar', reading_proficiency: '1', spoken_proficiency: '1', representation: 'Chinese-Mandar (CM) 1/1' }, { language: 'Uzbek', reading_proficiency: '1', spoken_proficiency: '1', representation: 'Uzbek (UX) 1/1' }] }, bidcycle: { id: 158, name: 'Now & Winter 2018/2019', cycle_start_date: null, cycle_deadline_date: null, cycle_end_date: null, active: null }, bid_statistics: [{ id: null, total_bids: 0, in_grade: 0, at_skill: 0, in_grade_at_skill: 0, has_handshake_offered: false, has_handshake_accepted: null }], unaccompaniedStatus: '', isConsumable: true, isServiceNeedDifferential: false, isDifficultToStaff: false, isEFMInside: false, isEFMOutside: true };
    const isProjectedVacancy = false;
    const isArchived = false;
    const OBCUrl$ = get(result, 'position.post.post_overview_url');

    return (
      <div className="usa-grid-full profile-content-container position-manager-details">
        <div className="usa-grid-full profile-content-inner-container">
          <div className="usa-grid-full">
            <div className="usa-width-one-whole">
              <div className="left-col">
                <button>Back to Positions</button>
              </div>
              <div className="right-col">
                <button>Print</button>
                <div className="export-button-container">
                  <ExportButton onClick={this.exportBidders} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-content-inner-container position-manager-details--content">
            <div className="usa-grid-full header-title-container padded-main-content">
              <div className="position-details-header-title">
                {isProjectedVacancy && <span>Projected Vacancy</span>}
                {isArchived && <span>Filled Position</span>}
                <h1>{result.position.title}</h1>
              </div>
              <div className="post-title">
                Location: {getPostName(result.position.post, NO_POST)}
                { !!OBCUrl$ && <span> (<OBCUrl url={OBCUrl$} />)</span> }
              </div>
            </div>
            <PositionDetailsItem
              details={result}
              hideHeader
              hideContact
            />
            <div className="usa-grid-full">
              <PositionManagerBidders />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PositionManagerDetails;
