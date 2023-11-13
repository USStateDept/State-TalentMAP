import { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import Alert from 'Components/Alert';
import { bureauExceptionsFetchData } from 'actions/bureauExceptions';
import BureauExceptionsCard from './BureauExceptionsCard';


const BureauExceptions = () => {
  const dispatch = useDispatch();

  const bureauExceptionsHasErrored = useSelector(state => state.bureauExceptionsHasErrored);
  const bureauExceptionsIsLoading = useSelector(state => state.bureauExceptionsIsLoading);
  const bureauExceptions = useSelector(state => state.bureauExceptions);

  useEffect(() => {
    dispatch(bureauExceptionsFetchData());
  }, []);

  // Overlay for error, info, and loading state
  const getOverlay = () => {
    let overlay;
    if (bureauExceptionsIsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="medium" />;
    } else if (bureauExceptionsHasErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Bureau Exceptions" icon="users" className="xl-icon" />
      </div>
      {
        getOverlay() ||
          <div className="bel-lower-section">
            <table className="bel-table-head">
              <thead>
                <tr>
                  <th className="first-header">Name</th>
                  <th>Bureau Access</th>
                </tr>
              </thead>
            </table>
            {bureauExceptions?.filter((x => x.id != null)).map(data => (
              <BureauExceptionsCard
                key={data?.id}
                userData={data}
              />
            ),
            )
            }
          </div>
      }
    </div>
  );
};

export default withRouter(BureauExceptions);
