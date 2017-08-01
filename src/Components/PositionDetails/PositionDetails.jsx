import React from 'react';
import { Link } from 'react-router-dom';
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
            <div className="usa-width-one-whole position-details-description">
              <strong>POST DESCRIPTION</strong>
              <br />
              <div className="usa-width-one-whole">
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">ORGANIZATION</div>
                  <div className="description">ORGANIZATION NAME</div>
                </div>
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">POST</div>
                  <div className="description">
                    <Link to={`/post/${details.post.id}`}>{details.post.description}</Link>
                  </div>
                </div>
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">BUREAU</div>
                  <div className="description">{details.bureau}</div>
                </div>
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">POST DIFFERENTIAL</div>
                  <div className="description">
                    {details.post.differential_rate}
                  </div>
                </div>
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">OVERSEAS</div>
                  <div className="description">
                    True
                  </div>
                </div>
                <div className="usa-width-one-fourth position-details-description-section">
                  <div className="title">REGION</div>
                  <div className="description">
                    Region
                  </div>
                </div>
              </div>
            </div>
            <hr width="85%" />
            <div className="usa-width-one-whole position-details-description">
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
        <div className="usa-grid position-details-additional" style={{ marginTop: '20px' }}>
          <div className="usa-width-two-thirds">
            <strong>ABOUT</strong>
            <p className="position-details-additional-body">
              Lorem Ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the industry
              standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the
              1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
              <br /><br />
              It is a long established fact that a reader will be
              distracted by the readable content of a page when looking
              at its layout. The point of using Lorem Ipsum is that it has
              a more-or-less normal distribution of letters, as opposed to using
              Content here, content here making it look like readable English.
              Many desktop publishing packages and web page editors now use Lorem
              Ipsum as their default model text, and a search for lorem ipsum
              will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
          </div>
          <div className="usa-width-one-third">
            <div className="map-container">
              <img src="/assets/img/map.png" alt="map" />
              <span className="map-title">Map location here</span>
            </div>
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
