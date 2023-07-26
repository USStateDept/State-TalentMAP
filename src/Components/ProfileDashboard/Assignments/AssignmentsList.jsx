import PropTypes from 'prop-types';
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
          <SectionTitle title="Assignment History" icon="clipboard" />
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
  assignments: PropTypes.arrayOf(PropTypes.shape({})),
};

AssignmentList.defaultProps = {
  assignments: [],
};

export default AssignmentList;
