/* eslint-disable */
import { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import { Column, Row } from 'Components/Layout';
import Alert from 'Components/Alert';
import { bureauExceptionsFetchData, bureauExceptionsRefDataBureausFetchData } from 'actions/bureauExceptions';
import BureauExceptionsCard from './BureauExceptionsCard';
import {Link} from "react-router-dom";
import FA from "react-fontawesome";


const BureauExceptions = () => {
  const dispatch = useDispatch();

  const bureauExceptionsHasErrored = useSelector(state => state.bureauExceptionsHasErrored);
  const bureauExceptionsIsLoading = useSelector(state => state.bureauExceptionsIsLoading);
  const bureauExceptions = useSelector(state => state.bureauExceptions);
  const bureauExceptionsRefDataBureausHasErrored = useSelector(state => state.bureauExceptionsRefDataBureausHasErrored);
  const bureauExceptionsRefDataBureausIsLoading = useSelector(state => state.bureauExceptionsRefDataBureausIsLoading);
  const bureauExceptionsRefDataBureaus = useSelector(state => state.bureauExceptionsRefDataBureaus);

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
            <div className="bureau-card box-shadow-standard">
              <div className="pl-10">Name</div>
              <div>Access</div>
            </div>

            {bureauExceptions?.map(data => (
              <BureauExceptionsCard
                key={data?.hruId}
                userData={data}
                bureaus={bureauExceptionsRefDataBureaus}
                bureausHasErrored={bureauExceptionsRefDataBureausHasErrored}
                bureausIsLoading={bureauExceptionsRefDataBureausIsLoading}
              />),
            )}
          </div>
      }
    </div>
  );
};

export default withRouter(BureauExceptions);
