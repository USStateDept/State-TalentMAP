import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import FavoritesButton from '../FavoritesButton/FavoritesButton';
import * as AlertMessages from '../../Constants/AlertMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
// import Share from '../Share/Share';
import LanguageList from '../LanguageList/LanguageList';
import Loading from '../Loading/Loading';
import PositionTitle from '../PositionTitle/PositionTitle';

const PositionDetails = ({ details, isLoading, hasErrored }) => (
  <div>
    {(details && !isLoading && !hasErrored) &&
      <div>
        <PositionTitle details={details} />
        <div className="usa-grid-full">
          <div className="usa-width-one-whole" style={{ marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
            <div className="usa-width-one-whole position-details-description" style={{ marginLeft: '9%' }}>
              <strong>POSITION DESCRIPTION</strong>
              <br />
              <div className="usa-width-one-whole">
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">GRADE</div>
                  <div className="description">{details.grade}</div>
                </div>
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">LANGUAGE</div>
                  <div className="description"><LanguageList languages={details.languages} /></div>
                </div>
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">SKILLS</div>
                  <div className="description">Information Management</div>
                </div>
              </div>
              <div className="usa-width-one-whole">
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">DANGER PAY</div>
                  <div className="description">
                    {details.post ? details.post.danger_pay : AlertMessages.NO_DANGER_PAY}
                  </div>
                </div>
              </div>
            </div>
            {/* <FavoritesButton refKey={details.position_number} type="fav" />
            <Share api={api} identifier={details.id} /> */}
          </div>
        </div>
      </div>}
    {isLoading && <Loading isLoading={isLoading} hasErrored={hasErrored} />}
  </div>
  );

PositionDetails.propTypes = {
  details: POSITION_DETAILS,
  // api: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
};

PositionDetails.defaultProps = {
  details: null,
  isLoading: true,
  hasErrored: false,
};

export default PositionDetails;
