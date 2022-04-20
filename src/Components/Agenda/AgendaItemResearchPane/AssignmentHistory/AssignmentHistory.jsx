import { BID_RESULTS } from 'Constants/PropTypes';
import BorderedList from 'Components/BorderedList';
import AssignmentsListResultsCard from 'Components/ProfileDashboard/Assignments/AssignmentsListResultsCard';

const AssignmentHistory = (props) => {
  const { assignments } = props;
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
  );
};

AssignmentHistory.propTypes = {
  assignments: BID_RESULTS.isRequired,
};

AssignmentHistory.defaultProps = {
  assignments: [],
};

export default AssignmentHistory;
