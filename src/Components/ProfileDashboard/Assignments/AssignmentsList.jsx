import React from 'react';
import { BID_RESULTS } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import AssignmentsListResultsCard from './AssignmentsListResultsCard';

const AssignmentList = ({ assignments }) => {
  const positionArray = [];
  assignments.forEach(assignment => (
    positionArray.push(
      <AssignmentsListResultsCard
        assignment={assignment}
        condensedView
        /* pass a parentClassName that we can use from the BorderedList component */
        parentClassName="parent-list-container"
      />,
    )
  ));
  return (
    <div className="usa-grid-full profile-section-container">
      <div className="usa-grid-full section-padded-inner-container">
        <div className="usa-width-one-whole">
          <SectionTitle title="Position and Detail History" icon="clipboard" />
        </div>
      </div>
      <div className="favorites-list-container">
        {
          positionArray.length === 0 ?
            <div className="usa-grid-full section-padded-inner-container">
              No assignments associated with this user.
            </div>
          :
            <BorderedList contentArray={positionArray} />
        }
      </div>
    </div>
  );
};

AssignmentList.propTypes = {
  assignments: BID_RESULTS.isRequired,
};

AssignmentList.defaultProps = {
  assignments: new Array(5).fill( // TODO - remove this
    {
      id: 1,
      start_date: '2020-02-07T20:35:05.987000Z',
      estimated_end_date: '2020-02-10T20:35:05.987000Z',
      position: {
        title: 'Position 1',
        position_number: '85190',
        skill: 'FINANCE & ECONOMIC DEVELOPMENT (5025)',
        skill_code: '5025',
        post: {
          location: {
            city: 'Washington',
            state: 'DC',
            country: 'USA',
          },
        },
        languages: [
          {
            language: 'Georgian',
            reading_proficiency: '1',
            spoken_proficiency: '1',
            representation: 'Georgian (GG) 1/1',
          },
          {
            language: 'Ukrainian',
            reading_proficiency: '1',
            spoken_proficiency: '1',
            representation: 'Ukrainian (UK) 1/1',
          },
        ],
      },
    },
  ),
};

export default AssignmentList;
