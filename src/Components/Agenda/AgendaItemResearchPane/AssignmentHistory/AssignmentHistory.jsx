import { BID_RESULTS } from 'Constants/PropTypes';
import BorderedList from 'Components/BorderedList';
import AssignmentsListResultsCard from 'Components/ProfileDashboard/Assignments/AssignmentsListResultsCard';

const AgendaItemResearchPane = (props) => {
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

AgendaItemResearchPane.propTypes = {
  assignments: BID_RESULTS.isRequired,
};

AgendaItemResearchPane.defaultProps = {
  assignments: [],
};

export default AgendaItemResearchPane;
