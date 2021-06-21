import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_GRADE, NO_POSITION_TITLE, NO_SKILL } from 'Constants/SystemMessages';
import { forEach, get } from 'lodash';
import { Link } from 'react-router-dom';

const HandshakeRegisterAnotherClientAlert = ({ bid, showAnotherClient, cdoView }) => {
  const position = get(bid, 'position_info.position');
  const positionTitle = get(position, 'title') || NO_POSITION_TITLE;
  const skillCode = get(position, 'skill') || NO_SKILL;
  const grade = get(position, 'grade') || NO_GRADE;

  const classes = [
    'bid-tracker-alert-container',
    'bid-tracker-alert-container--register',
  ];

  const classes$ = classes.join(' ');

  let text = '';
  let perdet = '';
  let bidderName = '';
  if (cdoView) {
    text = 'A HANDSHAKE HAS BEEN REGISTERED WITH ANOTHER BIDDER FOR: ';
    forEach(bid.bid_info, (bidderInfo) => {
      if (bidderInfo.has_handshake_offered === true) {
        bidderName = bidderInfo.name;
        perdet = bidderInfo.emp_id;
      }
    });
  }

  return (
    <div className={classes$}>
      <div className="usa-grid-full" style={{ display: 'flex' }}>
        {showAnotherClient &&
          <div className="register-submission-container">
            <div className="sub-submission-text">
              <span>
                {text}
                <Link to={`/profile/public/${perdet}`}>{bidderName}</Link>
              </span>
              <div>
                {positionTitle}
              </div>
              <div>
                <span className="title">Skill: </span>
                {skillCode}
              </div>
              <div>
                <span className="title">Grade: </span>
                {grade}
              </div>
            </div>
          </div>
        }
        <div className="register-another-client-container register-position-details">
          {text} <Link to={`/profile/public/${perdet}`}>{bidderName}</Link>
          <div>
            {positionTitle}
          </div>
          <div>
            <span className="title">Skill: </span>
            {skillCode}
          </div>
          <div>
            <span className="title">Grade: </span>
            {grade}
          </div>
        </div>
      </div>
    </div>
  );
};

HandshakeRegisterAnotherClientAlert.contextTypes = {
  readOnly: PropTypes.bool,
};

HandshakeRegisterAnotherClientAlert.propTypes = {
  bid: BID_OBJECT.isRequired,
  showAnotherClient: PropTypes.bool,
  cdoView: PropTypes.bool,
  // userName: PropTypes.string,
};

HandshakeRegisterAnotherClientAlert.defaultProps = {
  showAnotherClient: false,
  cdoView: false,
//   userName: '',
};

export default HandshakeRegisterAnotherClientAlert;
