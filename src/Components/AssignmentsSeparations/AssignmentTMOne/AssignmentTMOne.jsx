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
import TMOneCard from './TMOneCard';

const AssignmentTMOne = (props) => {
  const location = props.location?.pathname;
  const params = location.split('/');
  const viewType = params[2];
  const noteType = params[5];
  const clientId = props?.match.params.id;
  const noteId = props?.match.params.noteMemoID;

  const dispatch = useDispatch();

  // ====================== Data Retrieval ======================

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

  const getOverlay = () => {
    let overlay;
    if (noteId && note?.length < 1) {
      overlay = (
        <Alert
          type="error"
          title="Error Retrieving Cable Data"
          messages={[{ body: 'Please return to Maintain Assignments to select assignments and try adding the Notification/Memo again.' }]}
        />
      );
    } else if (employeeDataLoading || noteLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (noteErrored || employeeDataError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return (
      <div className="pl-10 pr-10">
        <button
          onClick={() => history.push(`/profile/${viewType}/${clientId}/assignmentsseparations`)}
          className="mt-30"
        >
          Back to Maintain Assignments
        </button>
        {overlay}
      </div>
    );
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
          <TMOneCard
            note={note[0]}
            onCancel={() => history.push(`/profile/${viewType}/${clientId}/assignmentsseparations`)}
            memo={noteType === 'memo'}
          />
        }
      </div>
    </div>
  );
};

AssignmentTMOne.propTypes = {
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

AssignmentTMOne.defaultProps = {
  match: {},
  location: {},
};

export default withRouter(AssignmentTMOne);
