/* eslint-disable */
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import RescheduledIcon from './RescheduledIcon';

const assignClasses = (isComplete, needsAction, isCurrent, handshakeRegisterWithAnotherBidder) => {
  const classes = ['number-icon'];

  if (!needsAction) {
    classes.push('number-icon-incomplete');
  }

  if (!needsAction && isCurrent) {
    classes.push(handshakeRegisterWithAnotherBidder ? '' : 'number-icon-is-current-no-action')
  }

  if (needsAction && isCurrent) {
    classes.push('number-icon-needs-action');
  }
  return classes.join(' ');
};

const getTooltipText = (title, text) => (
  <div>
    <div className={'tooltip-title'}>{title}</div>
    <div className={'tooltip-text'}>{text}</div>
  </div>
);

const getCheckIcon = (title, text, isCondensed) => {
  if(title && text && !isCondensed ) {
    return (
        <Tooltip
            html={getTooltipText(title, text)}
            theme={text.length > 200 ? 'bidtracker-status-long' : 'bidtracker-status'}
            arrow
            tabIndex="0"
            interactive
            useContext
        >
          <FontAwesome name="check" />
        </Tooltip>
    )
  }
  return (
      <FontAwesome name="check" />
      )
};

const BidStepIcon = ({ isComplete, needsAction, isCurrent, number,
  hasRescheduledTooltip, tooltipTitle, tooltipText,
  handshakeRegisterWithAnotherBidder}, { condensedView }) => (
    <span className={isComplete ? 'icon-complete' : 'icon-incomplete'}>
    { !isComplete
        ?
        <div className="icon-container">
          { tooltipTitle && tooltipText && !condensedView ?
              <Tooltip
                  html={getTooltipText(tooltipTitle, tooltipText)}
                  theme={tooltipText.length > 200 ? 'bidtracker-status-long' : 'bidtracker-status'}
                  arrow
                  tabIndex="0"
                  interactive
                  useContext
              >
              <span
                  className={assignClasses(isComplete, needsAction, isCurrent, handshakeRegisterWithAnotherBidder)}
              >
                {number > 0 ? number : null}
              </span>
              </Tooltip>
              :
            <span
                className={assignClasses(isComplete, needsAction, isCurrent, handshakeRegisterWithAnotherBidder)}
            >
              {number > 0 ? number : null}
            </span>
          }
          { hasRescheduledTooltip && <RescheduledIcon />}
        </div> :
        getCheckIcon(tooltipTitle, tooltipText, condensedView)
     }
  </span>
);

BidStepIcon.contextTypes = {
  condensedView: PropTypes.bool,
};

BidStepIcon.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  needsAction: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  number: PropTypes.number,
  hasRescheduledTooltip: PropTypes.bool,
  tooltipTitle: PropTypes.string,
  tooltipText: PropTypes.string,
  handshakeRegisterWithAnotherBidder: PropTypes.bool.isRequired,
};

BidStepIcon.defaultProps = {
  number: 0,
  hasRescheduledTooltip: false,
  tooltipTitle: '',
  tooltipText: '',
};

export default BidStepIcon;
