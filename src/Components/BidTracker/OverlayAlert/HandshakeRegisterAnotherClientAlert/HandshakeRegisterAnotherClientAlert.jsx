import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_GRADE, NO_POSITION_TITLE, NO_POST, NO_SKILL } from 'Constants/SystemMessages';
import { getPostName } from 'utilities';
import { get } from 'lodash';

const HandshakeRegisterAnotherClientAlert = ({ bid }) => {
  const position = get(bid, 'position_info.position');
  const positionTitle = get(position, 'title') || NO_POSITION_TITLE;
  const post = getPostName(get(position, 'post'), NO_POST);
  const skillCode = get(position, 'skill') || NO_SKILL;
  const grade = get(position, 'grade') || NO_GRADE;

  const classes = [
    'bid-tracker-alert-container',
    'bid-tracker-alert-container--register',
  ];

  const classes$ = classes.join(' ');

  const text = 'A HANDSHAKE HAS BEEN REGISTERED WITH ANOTHER BIDDER FOR: ';

  return (
    <div className={classes$}>
      <div className="usa-grid-full" style={{ display: 'flex' }}>
        <div className="register-another-client-container register-position-details">
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
  // isCDO: PropTypes.bool,
  // userName: PropTypes.string,
};

HandshakeRegisterAnotherClientAlert.defaultProps = {
  // isCDO: false,
//   userName: '',
};

export default HandshakeRegisterAnotherClientAlert;
