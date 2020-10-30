import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { get } from 'lodash';
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

const getTooltipText = (tooltip) => (
  <span>
    <div>
      {get(tooltip, 'title', 'no title')}
    </div>
    <div>
      {get(tooltip, 'text', 'no text')}
    </div>
  </span>
);

const BidStepIcon = ({ isComplete, needsAction, isCurrent, number,
  hasRescheduledTooltip, tooltip }) => (
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
      </div> :
      <div>
        { tooltip &&
        <Tooltip
          html={getTooltipText(tooltip)}
          arrow
          tabIndex="0"
          interactive
          interactiveBorder={5}
          useContext
        >
          <span>
            <FontAwesome name="check" />
          </span>
        </Tooltip>}
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
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
};

BidStepIcon.defaultProps = {
  number: 0,
  hasRescheduledTooltip: false,
  tooltip: PropTypes.shape({
    title: '',
    text: '',
  }),
};

export default BidStepIcon;
