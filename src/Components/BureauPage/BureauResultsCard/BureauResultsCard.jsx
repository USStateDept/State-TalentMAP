import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import { COMMON_PROPERTIES } from 'Constants/EndpointParams';
import { Row } from 'Components/Layout';
import DefinitionList from 'Components/DefinitionList';
import InteractiveElement from 'Components/InteractiveElement';
import { getResult, getBidStatsToUse, getDifferentials, renderBidCountMobile } from 'Components/ResultsCard/ResultsCard';
import LanguageList from 'Components/LanguageList';
import { getPostName, getBidStatisticsObject, propOrDefault, shortenString } from 'utilities';
import {
  NO_BUREAU, NO_GRADE, NO_POSITION_NUMBER,
  NO_POST, NO_SKILL, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';

class BureauResultsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }
  render() {
    const { showMore } = this.state;
    const { isProjectedVacancy } = this.props;

    const result = { id: 22392, status: null, status_code: 'OP', ted: '2020-07-07T01:12:49.695000Z', posted_date: '2020-07-07T01:12:49.695000Z', availability: { availability: null, reason: null }, tandem_nbr: null, position: { id: null, grade: '08', skill: 'FINANCE & ECONOMIC DEVELOPMENT (5025)', skill_code: '5025', bureau: '(L) OFFICE OF THE LEGAL ADVISER', organization: '(A) ASSISTANT SECRETARY FOR ADMINISTRATION', tour_of_duty: '2 YRS (3 R & R)', classifications: null, representation: null, availability: { availability: null, reason: null }, position_number: '55364111', title: 'INFORMATION SYSTEMS OFFICER', is_overseas: null, is_highlighted: false, create_date: null, update_date: null, effective_date: null, posted_date: '2020-07-07T01:12:49.695000Z', description: { id: null, last_editing_user: null, is_editable_by_user: null, date_created: null, date_updated: '2020-07-06T15:12:49.325000Z', content: 'ISO:Information Systems Office &#40;ISO&#41; in Vladivostok is staffed by two direct-hire Americans. It is responsible for the full range of IMO/IPO/ISSO functions, including unclassified and SBU classified pouch, high frequency and VHF/UHF radio systems, Iridium satellite phones, unclassified SBU OpenNet, Meridian Nortel 11C digital phone system, and 3 separate dedicated internet networks. The ISO section has direct liaison with RIMCs in Bangkok, Frankfurt, and Moscow and handles SBU classified pouch delivery through SRDCH Seoul. The Information Systems Officer &#40;ISO&#41; and Information Management Specialist &#40;IMS&#41; both cover all areas of the ISC. Additionally, the ISO is responsible for OpenNet project administration, application and customer service support, and also serves as the ISSO. The ISO reports to and acts as backup to the Management Officer. The ISO provides direct supervision to the IMS. **Please note - we have requested the removal of this language designation** POC Michael Gillen. gillenml&#64;state.gov. We are collecting lobbying documents through the EUR-IO 360 Lobbying Center. Please submit your lobbying information at http://eur.p.state.sbu/sites/apps/EURApps/EUR360Center/', point_of_contact: null, website: null }, current_assignment: { user: null, tour_of_duty: '2 YRS (3 R & R)', status: null, start_date: null, estimated_end_date: '2010-10-27T05:00:00Z' }, commuterPost: { description: null, frequency: null }, post: { id: null, code: 'ZI8000000', tour_of_duty: '2 YRS (3 R & R)', post_overview_url: null, post_bidding_considerations_url: null, cost_of_living_adjustment: null, differential_rate: 10, danger_pay: 20, rest_relaxation_point: null, has_consumable_allowance: null, has_service_needs_differential: null, obc_id: null, location: { country: 'Macau', code: 'ZI8000000', city: 'Spelter', state: '' } }, latest_bidcycle: { id: 158, name: 'Now & Winter 2018/2019', cycle_start_date: null, cycle_deadline_date: null, cycle_end_date: null, active: null }, languages: [{ language: 'Chinese-Mandar', reading_proficiency: '1', spoken_proficiency: '1', representation: 'Chinese-Mandar (CM) 1/1' }, { language: 'Uzbek', reading_proficiency: '1', spoken_proficiency: '1', representation: 'Uzbek (UX) 1/1' }] }, bidcycle: { id: 158, name: 'Now & Winter 2018/2019', cycle_start_date: null, cycle_deadline_date: null, cycle_end_date: null, active: null }, bid_statistics: [{ id: null, total_bids: 0, in_grade: 0, at_skill: 0, in_grade_at_skill: 0, has_handshake_offered: false, has_handshake_accepted: null }], unaccompaniedStatus: '', isConsumable: true, isServiceNeedDifferential: false, isDifficultToStaff: false, isEFMInside: false, isEFMOutside: true };

    const pos = result.position || result;

    const title = propOrDefault(pos, 'title');
    const position = getResult(pos, 'position_number', NO_POSITION_NUMBER);
    const languages = getResult(pos, 'languages', []);

    const language = (<LanguageList languages={languages} propToUse="representation" />);

    const postShort = getPostName(pos.post, NO_POST);

    const bidStatsToUse = getBidStatsToUse(result, pos);
    const stats = getBidStatisticsObject(bidStatsToUse);

    const description = shortenString(get(pos, 'description.content') || 'No description.', 2000);

    const detailsLink = <Link to={`/profile/bureau/positionmanager/${isProjectedVacancy ? 'vacancy' : 'available'}/${result.id}`}><h3>{title}</h3></Link>;

    const sections = [
    /* eslint-disable quote-props */
      {
        'Position number': position,
        'Skill': getResult(pos, 'skill_code', NO_SKILL),
        'Grade': getResult(pos, 'grade', NO_GRADE),
        'Bureau': getResult(pos, 'bureau', NO_BUREAU),
        'Tour of duty': getResult(pos, 'post.tour_of_duty', NO_TOUR_OF_DUTY),
        'Language': language,
        'Post differential | Danger Pay': getDifferentials(pos),
        'TED': getResult(result, 'ted', NO_DATE),
        'Incumbent': getResult(pos, 'current_assignment.user', NO_USER_LISTED),
        'Posted': getResult(result, COMMON_PROPERTIES.posted, NO_UPDATE_DATE),
      },
      {
        'Last Updated': 'N/A',
      },
    /* eslint-enable quote-props */
    ];

    if (isProjectedVacancy) { delete sections[2].Posted; }

    return (
      <Row fluid className="bureau-results-card">
        <Row fluid>
          <Row fluid className="bureau-card--section bureau-card--header">
            <div>{detailsLink}</div>
            <div>{postShort}</div>
            {renderBidCountMobile(stats)}
          </Row>
          <Row fluid className="bureau-card--section bureau-card--content">
            <DefinitionList itemProps={{ excludeColon: true }} items={sections[0]} className="bureau-definition" />
          </Row>
          <Row fluid className="bureau-card--section bureau-card--footer">
            <DefinitionList items={sections[1]} className="bureau-definition" />
            <div className="usa-grid-full toggle-more-container">
              <InteractiveElement className="toggle-more" onClick={() => this.setState({ showMore: !showMore })}>
                <span>View {showMore ? 'less' : 'more'} </span>
                <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
              </InteractiveElement>
            </div>
          </Row>
        </Row>
        {
          showMore &&
          <Row fluid className="bureau-card--description">
            <Linkify properties={{ target: '_blank' }}>
              {description}
            </Linkify>
          </Row>
        }
      </Row>
    );
  }
}

BureauResultsCard.propTypes = {
  isProjectedVacancy: PropTypes.bool,
};

BureauResultsCard.defaultProps = {
  isProjectedVacancy: false,
};

export default BureauResultsCard;
