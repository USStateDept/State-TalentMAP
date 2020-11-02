import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import RescheduledIcon from './RescheduledIcon';

const assignClasses = (isComplete, needsAction, isCurrent) => {
  const classes = ['number-icon'];

  if (!needsAction) {
    classes.push('number-icon-incomplete');
  }

  if (!needsAction && isCurrent) {
    classes.push('number-icon-is-current-no-action');
  }

  if (needsAction && isCurrent) {
    classes.push('number-icon-needs-action');
  }

  return classes.join(' ');
};

const getTooltipText = (a, b) => (
  <div>
    <div className={'tooltip-title'}>
      {a}
    </div>
    <div className={'tooltip-text'}>
      {b}
    </div>
  </div>
);

const BidStepIcon = ({ isComplete, needsAction, isCurrent, number,
  hasRescheduledTooltip, tooltipTitle, tooltipText }) => (
  <span className={isComplete ? 'icon-complete' : 'icon-incomplete'}>
    { !isComplete
      ?
      <div className="icon-container">
        <span
          className={assignClasses(isComplete, needsAction, isCurrent)}
        >
          {number > 0 ? number : null}
        </span>
        { hasRescheduledTooltip && <RescheduledIcon />}
        { !hasRescheduledTooltip && tooltipTitle && tooltipText &&
          <Tooltip
            html={getTooltipText(tooltipTitle, tooltipText)}
            theme="bidtracker-status"
            arrow
            tabIndex="0"
            interactive
            useContext
          />
        }
      </div> :
      <div>
        { tooltipTitle && tooltipText
          ?
          <Tooltip
            html={getTooltipText(tooltipTitle, tooltipText)}
            theme="bidtracker-status"
            arrow
            tabIndex="0"
            interactive
            useContext
          >
            <FontAwesome name="check" />
          </Tooltip>
          :
          <FontAwesome name="check" />
        }
      </div>
    }
  </span>
);

BidStepIcon.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  needsAction: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  number: PropTypes.number,
  hasRescheduledTooltip: PropTypes.bool,
  tooltipTitle: PropTypes.string,
  tooltipText: PropTypes.string,
};

BidStepIcon.defaultProps = {
  number: 0,
  hasRescheduledTooltip: false,
  tooltipTitle: '',
  tooltipText: '',
};

export default BidStepIcon;
