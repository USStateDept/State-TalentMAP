import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { assignmentFetchData } from 'actions/assignment';
import Spinner from 'Components/Spinner';
import { checkFlag } from 'flags';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import AssignmentsListResultsCard from './AssignmentsListResultsCard';

const useMaintainAssignments = () => checkFlag('flags.maintain_assignment');

const AssignmentList = ({ id, showMaintainAssignmentLink }) => {
  // if ID is passed down will render that user's Assignments
  // no ID will return the logged in user's Assignments
  const showMaintainAssignments = useMaintainAssignments();

  const dispatch = useDispatch();
  const assignments = useSelector(state => state.assignment);
  const assignmentsLoading = useSelector(state => state.assignmentIsLoading);

  useEffect(() => {
    dispatch(assignmentFetchData(id));
  }, [id]);

  const positionArray = [];
  assignments.forEach(assignment => (
    positionArray.push(
      <AssignmentsListResultsCard
        assignment={assignment}
        condensedView
        /* pass a parentClassName that we can use from the BorderedList component */
        parentClassName={`${assignment?.status !== 'EF' ? 'hide-border' : ''}`}
      />,
    )
  ));

  return (
    assignmentsLoading ? <Spinner type="saved-searches" size="big" /> :
      (
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
          {
            showMaintainAssignmentLink && showMaintainAssignments &&
              <div className="section-padded-inner-container small-link-container view-more-link-centered">
                <Link to={`/profile/ao/${id}/assignments`}>Maintain Assignments</Link>
              </div>
          }
        </div>
      )
  );
};

AssignmentList.propTypes = {
  id: PropTypes.string,
  showMaintainAssignmentLink: PropTypes.bool,
};

AssignmentList.defaultProps = {
  id: null,
  showMaintainAssignmentLink: false,
};

export default AssignmentList;
