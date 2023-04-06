import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tippy';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { Icons } from 'Constants/Classifications';
import InteractiveElement from '../../InteractiveElement';

const status$ = ['none', 'success'];

const ClientBadge = ({ type, status, showShortCode, editView, onChange, id }) => {
  const isHighlighted = status === true ? 'success' : 'none';
  const ariaLabel = `type of "${type.code}" with status of "${status$[status]}"`;
  const icon = get(Icons, type.code, 'None');
  const text = get(icon, 'text', 'None');
  return (
    <div className={`usa-grid-full client-badge-container client-badge-container--${Icons[type.code] && Icons[type.code].isIcon ? 'icon' : 'text'} client-badge-container--${isHighlighted}`}>
      { editView &&
        <InteractiveElement onClick={() => onChange(id)}>
          <div className="client-badge">
            <FontAwesomeIcon
              aria-label={ariaLabel}
              icon={get(icon, 'name', 'None')}
            />
          </div>
        </InteractiveElement>
      }
      { showShortCode &&
        <>
          <div className="client-badge">
            <Tooltip
              title={text}
              arrow
              offset={-95}
              position="top-end"
              tabIndex="0"
            >
              <FontAwesomeIcon
                aria-label={ariaLabel}
                icon={get(icon, 'name', 'None')}
              />
            </Tooltip>
          </div>
          <div className="client-badge-text">
            <span>{get(icon, 'shortCode', 'None')}</span>
          </div>
        </>
      }
      {
        !showShortCode && !editView &&
          <div className="client-badge">
            <FontAwesomeIcon
              aria-label={ariaLabel}
              icon={get(icon, 'name', 'None')}
            />
          </div>
      }
    </div>
  );
};

ClientBadge.propTypes = {
  type: PropTypes.shape({
    code: PropTypes.oneOf(['3', '4', 'R', '6', 'A', 'C', 'C1', 'CC', 'D', 'F', 'F1', 'F2', 'M', 'P', 'T', '8']),
    seasons: PropTypes.arrayOf(PropTypes.shape({})),
    glossary_term: PropTypes.string,
  }),
  status: PropTypes.bool,
  showShortCode: PropTypes.bool,
  editView: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.number,
};

ClientBadge.defaultProps = {
  type: [],
  status: false,
  showShortCode: true,
  editView: false,
  onChange: EMPTY_FUNCTION,
  id: 0,
};

export default ClientBadge;
