import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import FA from 'react-fontawesome';
import { useDataLoader } from 'hooks';
import PropTypes from 'prop-types';
// import InteractiveElement from 'Components/InteractiveElement';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import { assignmentFetchData } from 'actions/assignment';
import AssignmentCard from './AssignmentCard';
// import { formatDate } from 'utilities';
import api from '../../api';
import NotificationCard from './NotificationCard/NotificationCard';

const useNotification = () => checkFlag('flags.assignment_notification');
const useMemo = () => checkFlag('flags.assignment_memo');

const Assignments = (props) => {
  const assignments = useSelector(state => state.assignment);
  const assignmentsErrored = useSelector(state => state.assignmentHasErrored);
  const assignmentsLoading = useSelector(state => state.assignmentIsLoading);

  // default || newAsgSep || memo || notification
  const [cardMode, setCardMode] = useState('default');

  const id = props?.match.params.id;

  // TO-DO: replace fake data
  const fakeStatuses = [
    { code: 1, name: 'AP' },
    { code: 2, name: 'BR' },
    { code: 3, name: 'CP' },
    { code: 4, name: 'EF' },
  ];
  const fakeActions = [
    { code: 1, name: 'Action A' },
    { code: 2, name: 'Action B' },
    { code: 3, name: 'Action C' },
    { code: 4, name: 'Action D' },
  ];
  const fakeTods = [
    { code: 1, name: 'TOD A' },
    { code: 2, name: 'TOD B' },
    { code: 3, name: 'TOD C' },
    { code: 4, name: 'TOD D' },
  ];
  const fakeTravels = [
    { code: 1, name: 'Travel A' },
    { code: 2, name: 'Travel B' },
    { code: 3, name: 'Travel C' },
    { code: 4, name: 'Travel D' },
  ];
  const fakeFundings = [
    { code: 1, name: 'Funding A' },
    { code: 2, name: 'Funding B' },
    { code: 3, name: 'Funding C' },
    { code: 4, name: 'Funding D' },
  ];
  const fakeWaivers = [
    { code: 1, name: 'Denied' },
    { code: 2, name: 'Requested' },
    { code: 3, name: 'Granted' },
    { code: 4, name: 'Not Used' },
  ];
  // const {
  // data: statuses,
  // error: statusesError,
  // loading: statusesLoading
  // } = useDataLoader(api().get, '/fsbid/assignments/statuses/');
  // const {
  // data: actions,
  // error: actionsError,
  // loading: actionsLoading
  // } = useDataLoader(api().get, '/fsbid/assignments/actions/');
  // const {
  // data: tods,
  // error: todsError,
  // loading: todsLoading
  // } = useDataLoader(api().get, '/fsbid/assignments/tods/');
  // const {
  // data: travel,
  // error: travelError,
  // loading: travelLoading
  // } = useDataLoader(api().get, '/fsbid/assignments/travel/');
  // const {
  // data: fundings,
  // error: fundingsError,
  // loading: fundingsLoading
  // } = useDataLoader(api().get, '/fsbid/assignments/fundings/');
  // const {
  // data: waivers,
  // error: waiversError,
  // loading: waiversLoading
  // } = useDataLoader(api().get, '/fsbid/assignments/waivers/');

  // eslint-disable-next-line no-unused-vars
  const { data: employeeData, error: employeeDataError, loading: employeeDataLoading } = useDataLoader(api().get, `/fsbid/client/${id}/`);

  const employeeData$ = employeeData?.data;
  const employeeName = employeeDataLoading ? '' : employeeData$?.name;

  const refFilters = {
    statusOptions: fakeStatuses,
    actionOptions: fakeActions,
    todOptions: fakeTods,
    travelOptions: fakeTravels,
    fundingOptions: fakeFundings,
    waiverOptions: fakeWaivers,
  };

  // eslint-disable-next-line no-unused-vars
  const hideBreadcrumbs = checkFlag('flags.breadcrumbs');
  // cleanup role check links for breadcrumbs
  const breadcrumbLinkRole = 'ao';

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(assignmentFetchData(id));
  }, [id]);

  const noResults = assignments?.length === 0;

  const getOverlay = () => {
    let overlay;
    if (assignmentsLoading || employeeDataLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (assignmentsErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'No assignments for this user.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const getCardMode = () => {
    switch (cardMode) {
      case 'newAsgSep':
        return <AssignmentCard isNew setNewAsgSep={setCardMode} refFilters={refFilters} />;
      case 'notification':
        return <NotificationCard />;
      case 'memo':
        return <NotificationCard />;
      default:
        return assignments?.map(data =>
          <AssignmentCard data={data} refFilters={refFilters} />);
    }
  };

  return (
    getOverlay() ||
    <div className="assignments-maintenance-page position-search">
      <div className="asg-content">
        {false &&
          <div className="breadcrumb-container">
            <Link to={`/profile/public/${breadcrumbLinkRole}/`} className="breadcrumb-active">
              Bidder Portfolio
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <span>{id}</span>
          </div>
        }
        <div className="asg-header">
          <FA name="clipboard" className="fa-lg" />
          Assignments
          <span className="asg-title-dash">
            {'- '}
            <Link to={`/profile/public/${id}/ao`}>
              <span className="asg-title">
                {`${employeeName}`}
              </span>
            </Link>
          </span>
        </div>
        <div className="pt-20 asg-subheader">
          Review the current assignments or add assignments for {employeeName}
          <div>
            <div className="create-new-button">
              <a role="button" className="width-300" tabIndex={0} onClick={() => setCardMode('newAsgSep')}>
                <FA name="briefcase" />
                Add New Assignment/Separation
              </a>
            </div>
            {useNotification() &&
              <div className="create-new-button align-left">
                <a role="button" className="width-300" tabIndex={0} onClick={() => setCardMode('notification')}>
                  <FA name="briefcase" />
                  Add Notification
                </a>
              </div>
            }
            {useMemo() &&
              <div className="create-new-button align-left">
                <a role="button" className="width-300" tabIndex={0} onClick={() => setCardMode('memo')}>
                  <FA name="briefcase" />
                  Add Memo
                </a>
              </div>
            }
          </div>
        </div>
        <div className="asg-lower-section">
          {getCardMode()}
        </div>
      </div>
    </div>
  );
};

Assignments.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

Assignments.defaultProps = {
  match: {},
};

export default Assignments;
