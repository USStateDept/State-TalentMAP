import React from 'react';
import { Link } from 'react-router-dom';
import * as SystemMessages from '../../Constants/SystemMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import LanguageList from '../../Components/LanguageList/LanguageList';

const PositionDetailsItem = ({ details }) => (
  <div className="usa-grid-full">
    <div className="usa-width-one-whole">
      <div className="position-details-description-container">
        <div className="usa-width-one-whole position-details-description">
          <strong>POST DESCRIPTION</strong>
          <br />
          <div className="usa-width-one-whole">
            <div className="usa-width-one-fourth position-details-description-section">
              <div className="title">ORGANIZATION</div>
              <div className="description">
                {details.organization || SystemMessages.NO_ORG}
              </div>
            </div>
            <div className="usa-width-one-fourth position-details-description-section">
              <div className="title">POST</div>
              <div className="description">
                {
                  details.post && details.post.id ?
                    <Link to={`/post/${details.post.id}`}>{details.post.description}</Link>
                    : SystemMessages.NO_POST
                }
              </div>
            </div>
            <div className="usa-width-one-fourth position-details-description-section">
              <div className="title">BUREAU</div>
              <div className="description">
                {details.bureau || SystemMessages.NO_BUREAU}
              </div>
            </div>
            <div className="usa-width-one-fourth position-details-description-section">
              <div className="title">POST DIFFERENTIAL</div>
              <div className="description">
                {
                  details.post && details.post.differential_rate ?
                    details.post.differential_rate
                    : SystemMessages.NO_POST_DIFFERENTIAL
                }
              </div>
            </div>
            <div className="usa-width-one-fourth position-details-description-section">
              <div className="title">OVERSEAS</div>
              <div className="description">
                {details.is_overseas ? 'Yes' : 'No'}
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
              <div className="description">
                <LanguageList languages={details.languages} />
              </div>
            </div>
            <div className="usa-width-one-fourth position-details-description-section">
              <div className="title">SKILLS</div>
              <div className="description">Information Management</div>
            </div>
            <div className="usa-width-one-fourth position-details-description-section">
              <div className="title">DANGER PAY</div>
              <div className="description">
                {details.post ? details.post.danger_pay : SystemMessages.NO_DANGER_PAY}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

PositionDetailsItem.propTypes = {
  details: POSITION_DETAILS,
};

PositionDetailsItem.defaultProps = {
  details: null,
};

export default PositionDetailsItem;
