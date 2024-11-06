import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { useDataLoader } from 'hooks';
import { altAssignmentsSeparations } from 'actions/assignment';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import api from '../../../api';
import { history } from '../../../store';
import NotificationCard from '../NotificationCard';

const AssignmentNotification = (props) => {
  const location = props.location?.pathname;
  const params = location.split('/');
  const viewType = params[2];
  const noteType = params[5];
  const clientId = props?.match.params.id;
  const noteId = props?.match.params.noteMemoID;

  const dispatch = useDispatch();

  // ====================== Data Retrieval ======================

  const results = useSelector(state => state.altAssignmentsSeparations);
  const resultsErrored = useSelector(state => state.altAssignmentsSeparationsErrored);
  const resultsLoading = useSelector(state => state.altAssignmentsSeparationsLoading);
  const noResults = results?.length === 0;

  const note = useSelector(state => state.noteCableFetchData);
  const noteErrored = useSelector(state => state.noteCableFetchDataErrored);
  const noteLoading = useSelector(state => state.noteCableFetchDataLoading);

  useEffect(() => {
    dispatch(altAssignmentsSeparations(clientId));
  }, [clientId]);

  const { data: employeeData, error: employeeDataError, loading: employeeDataLoading } = useDataLoader(api().get, `/fsbid/client/${clientId}/`);
  const employeeData$ = employeeData?.data;
  const employeeName = employeeDataLoading ? '' : employeeData$?.name;


  // ====================== UI State Management ======================

  useEffect(() => {
    if (noteId && note?.length < 1) {
      history.push(`/profile/${viewType}/${clientId}/assignmentsseparations`);
    }
  }, []);

  const getOverlay = () => {
    let overlay;
    if (resultsLoading || employeeDataLoading || noteLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (resultsErrored || noteErrored || employeeDataError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'No assignments for this user.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (getOverlay() ||
    <div className="assignments-maintenance-page position-search">
      <div className="asg-content">
        {false &&
          <div className="breadcrumb-container">
            <Link to={`/profile/public/${viewType}/`} className="breadcrumb-active">
              Bidder Portfolio
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <span>{clientId}</span>
          </div>
        }
        <div className="asg-header">
          <FA name="clipboard" className="fa-lg" />
          Assignments and Separations
          <span className="asg-title-dash">
            {'- '}
            <Link to={`/profile/public/${clientId}/${viewType}`}>
              <span className="asg-title">
                {`${employeeName}`}
              </span>
            </Link>
          </span>
        </div>
        {noteId &&
          <NotificationCard
            note={note[0]}
            onCancel={() => history.push(`/profile/${viewType}/${clientId}/assignmentsseparations`)}
            memo={noteType === 'memo'}
          />
        }
      </div>
    </div>
  );
};

AssignmentNotification.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      noteMemoID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

AssignmentNotification.defaultProps = {
  match: {},
  location: {},
};

export default withRouter(AssignmentNotification);
