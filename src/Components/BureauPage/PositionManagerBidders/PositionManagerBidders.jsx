import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, keys } from 'lodash';
import { NO_DATE, NO_GRADE } from 'Constants/SystemMessages';
import { BUREAU_BIDDER_SORT, BUREAU_BIDDER_FILTERS } from 'Constants/Sort';
import LanguageList from 'Components/LanguageList';
import SelectForm from 'Components/SelectForm';
import { propOrDefault } from 'utilities';
import SkillCodeList from '../../SkillCodeList';
import MailToButton from '../../MailToButton';


class PositionManagerBidders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // add any state here
    };
  }

  render() {
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

    const languages = [
      {
        id: 1,
        language: 'Arabic (Modern Standard) (AD)',
        reading_proficiency: '0',
        spoken_proficiency: '0',
        representation: 'Arabic (Modern Standard) (AD) 0/0',
      },
      {
        id: 15,
        language: 'Mandarin (CM)',
        reading_proficiency: '0',
        spoken_proficiency: '2',
        representation: 'Mandarin (CM) 0/2',
      },
      {
        id: 24,
        language: 'Arabic (Modern Standard) (AD)',
        reading_proficiency: '0',
        spoken_proficiency: '1',
        representation: 'Arabic (Modern Standard) (AD) 0/1',
      },
      {
        id: 32,
        language: 'Turkish (TU)',
        reading_proficiency: '2',
        spoken_proficiency: '2',
        representation: 'Turkish (TU) 2/2',
      },
    ];

    const name = (<Link to={'www.google.com'}>{propOrDefault(bidder, 'name')}</Link>);
    const skills = (<SkillCodeList skillCodes={bidder.skills} />);
    const language = (<LanguageList languages={languages} propToUse="representation" />);
    const cdo = (<MailToButton email={get(bidder, 'cdo.email')} textAfter={get(bidder, 'cdo.name')} />);
    const sections = {
      // RetainedSpace: '',
      Name: name,
      Skill: skills,
      Grade: get(bidder, 'grade', NO_GRADE),
      Language: language,
      TED: get(bidder, 'current_assignment.end_date', NO_DATE),
      CDO: cdo,
    };
    const tableHeaders = keys(sections).map(item => (
      <th scope="col">{item}</th>
    ));
    const tableRows = (
      <tr>
        {keys(sections).map(i => (
          <td>{sections[i]}</td>
        ))}
      </tr>
    );
    return (
      <div className="usa-width-one-whole position-manager-bidders">
        <div className="bidders-controls">
          <SelectForm
            id="sort"
            label="Sort by:"
            onSelectOption={() => {}}
            options={BUREAU_BIDDER_SORT.options}
            disabled={false}
          />
          <SelectForm
            id="filter"
            options={BUREAU_BIDDER_FILTERS.options}
            label="Filter By:"
            defaultSort={''}
            disabled={false}
          />
        </div>
        <table className="position-manager-bidders-table">
          <thead>
            <tr>
              <h1>Candidates</h1>
            </tr>
            <tr>
              {tableHeaders}
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line no-unused-vars */}
            {[...Array(10).keys()].map((m) => (
              tableRows
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PositionManagerBidders;
