import { Component } from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_GRADE, NO_POSITION_TITLE, NO_POST, NO_SKILL, NO_TOUR_END_DATE } from 'Constants/SystemMessages';
import { get } from 'lodash';
import { formatDate, getPostName } from 'utilities';
import swal from '@sweetalert/with-react';
import InteractiveElement from 'Components/InteractiveElement';
import ChecklistModal from 'Components/Handshake/ChecklistModal/ChecklistModal';
import HS_REGISTER_CHECKLIST from 'Constants/RegisterChecklist';

class HandshakeRegisterAlert extends Component {
  onRegisterHandshake = () => {
    const { registerHandshake, bid } = this.props;
    registerHandshake(bid.position_info.id);
    swal.close();
  };

  onUnregisterHandshake = () => {
    const { unregisterHandshake, bid } = this.props;
    unregisterHandshake(bid.position_info.id);
  };

  render() {
    const { bid, isUnregister, userName } = this.props;
    const { readOnly } = this.context;
    const position = get(bid, 'position_info.position');
    const positionTitle = get(position, 'title') || NO_POSITION_TITLE;
    const post = getPostName(get(position, 'post'), NO_POST);
    const skillCode = get(position, 'skill') || NO_SKILL;
    const grade = get(position, 'grade') || NO_GRADE;
    const ted = formatDate(get(bid, 'position_info.ted')) || NO_TOUR_END_DATE;
    let mainText;
    if (!isUnregister) {
      if (!readOnly) {
        mainText = 'Would you like to register this handshake?';
      } else { mainText = 'This handshake needs to be registered'; }
    } else {
      mainText = `${userName || 'This user'}'s handshake has been registered`;
    }

    const buttonText = isUnregister ? 'Undo Register Handshake' : 'Register Handshake';

    // eslint-disable-next-line max-len
    const HS_REGISTER_CHECKLIST$ = HS_REGISTER_CHECKLIST.map(z => ({ text: z, checked: false }));

    // eslint-disable-next-line no-console
    console.log(HS_REGISTER_CHECKLIST$);

    const hsRegisterModal = () => {
      swal({
        title: 'BEFORE entering/registering a HS:',
        button: false,
        content: (
          <ChecklistModal
            onSubmit={this.onRegisterHandshake}
            submitBtnText={buttonText}
            checkList={HS_REGISTER_CHECKLIST$}
            rowDivider
          />
        ),
      });
    };

    const classes = [
      'bid-tracker-alert-container',
      'bid-tracker-alert-container--register',
      isUnregister ? 'bid-tracker-alert-container--unregister' : '',
    ];

    const classes$ = classes.join(' ');

    return (
      <div className={classes$}>
        <div className="usa-grid-full" style={{ display: 'flex' }}>
          <div className="register-submission-container" style={{ flex: 1 }}>
            <div className="sub-submission-text">
              {mainText}
            </div>
            <div className="usa-grid-full register-submission-buttons-container">
              { isUnregister ?
                <button
                  className="tm-button-transparent tm-button-submit-bid"
                  onClick={this.onUnregisterHandshake}
                >
                  {buttonText}
                </button>
                :
                <InteractiveElement onClick={hsRegisterModal}>
                  <button
                    className="tm-button-transparent tm-button-submit-bid"
                  >
                    {buttonText}
                  </button>
                </InteractiveElement>
              }
            </div>
          </div>
          <div className="register-position-details" style={{ flex: 1 }}>
            <div>
              {positionTitle}
            </div>
            <div>
              <span className="title">Location: </span>
              {post}
            </div>
            <div>
              <span className="title">TED: </span>
              {ted}
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
  }
}

HandshakeRegisterAlert.contextTypes = {
  readOnly: PropTypes.bool,
};

HandshakeRegisterAlert.propTypes = {
  bid: BID_OBJECT.isRequired,
  registerHandshake: PropTypes.func.isRequired,
  unregisterHandshake: PropTypes.func.isRequired,
  isUnregister: PropTypes.bool,
  userName: PropTypes.string,
};

HandshakeRegisterAlert.defaultProps = {
  isUnregister: false,
  userName: '',
};

export default HandshakeRegisterAlert;
