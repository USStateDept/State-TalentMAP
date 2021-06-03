import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_GRADE, NO_POST, NO_SKILL } from 'Constants/SystemMessages';
import { getPostName } from 'utilities';

const HandshakeRegisterAnotherClientAlert = ({ bid, isUnregister }) => {
  const { position } = bid;
  const positionTitle = position.title;
  const post = getPostName(position.post, NO_POST);
  const skillCode = position.skill ? position.skill : NO_SKILL;
  const grade = position.grade ? position.grade : NO_GRADE;

  const classes = [
    'bid-tracker-alert-container',
    'bid-tracker-alert-container--register',
    isUnregister ? 'bid-tracker-alert-container--unregister' : '',
  ];

  const classes$ = classes.join(' ');

  const text = 'A HANDSHAKE HAS BEEN REGISTERED WITH ANOTHER BIDDER FOR: ';

  return (
    <div className={classes$}>
      <div className="usa-grid-full" style={{ display: 'flex' }}>
        <div className="register-another-client-container register-position-details" style={{ flex: 1 }}>
          {text}
          <div>
            {positionTitle}
          </div>
          <div>
            <span className="title">Location: </span>
            {post}
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
  isUnregister: PropTypes.bool,
//   userName: PropTypes.string,
};

HandshakeRegisterAnotherClientAlert.defaultProps = {
  isUnregister: false,
//   userName: '',
};

export default HandshakeRegisterAnotherClientAlert;
