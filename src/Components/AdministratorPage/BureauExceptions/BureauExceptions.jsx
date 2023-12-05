import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import Alert from 'Components/Alert';
import { bureauExceptionsFetchData, bureauExceptionsRefDataBureausFetchData } from 'actions/bureauExceptions';
import BureauExceptionsCard from './BureauExceptionsCard';

const BureauExceptions = () => {
  const dispatch = useDispatch();

  const bureauExceptionsHasErrored = useSelector(state => state.bureauExceptionsHasErrored);
  const bureauExceptionsIsLoading = useSelector(state => state.bureauExceptionsIsLoading);
  const bureauExceptions = useSelector(state => state.bureauExceptions);
  const bureauExceptionsRefDataBureausHasErrored =
    useSelector(state => state.bureauExceptionsRefDataBureausHasErrored);
  const bureauExceptionsRefDataBureausIsLoading =
    useSelector(state => state.bureauExceptionsRefDataBureausIsLoading);
  const bureauExceptionsRefDataBureaus = useSelector(state => state.bureauExceptionsRefDataBureaus);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(bureauExceptionsFetchData());
    dispatch(bureauExceptionsRefDataBureausFetchData());
  }, []);

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
            {
              editMode &&
              <Alert
                type="warning"
                title={'Edit Mode'}
                messages={[{
                  body: 'Save or discard your edits to enable editing on another user\'s Bureau Exceptions.',
                },
                ]}
              />
            }
            <div className={`bureau-exceptions-card box-shadow-standard ${editMode ? '' : 'sticky'}`}>
              <div>Name</div>
              <div>Access</div>
            </div>

            {bureauExceptions?.map(data => (
              <BureauExceptionsCard
                key={data?.hruId}
                userData={data}
                onEditModeSearch={editState =>
                  setEditMode(editState)}
                disableEdit={editMode}
                refBureaus={bureauExceptionsRefDataBureaus}
                refBureausHasErrored={bureauExceptionsRefDataBureausHasErrored}
                refBureausIsLoading={bureauExceptionsRefDataBureausIsLoading}
              />),
            )}
          </div>
      }
    </div>
  );
};

export default withRouter(BureauExceptions);
