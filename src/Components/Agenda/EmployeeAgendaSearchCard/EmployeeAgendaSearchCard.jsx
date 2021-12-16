import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { Handshake } from 'Components/Ribbon';
import LinkButton from 'Components/LinkButton';
import { get } from 'lodash';
import BoxShadow from '../../BoxShadow';

const EmployeeAgendaSearchCard = ({ isCDO, result }) => {
  // will need to update during integration
  const agendaStatus = get(result, 'agendaStatus') || 'None listed';
  const author = get(result, 'author') || 'None listed';
  const bidder = get(result, 'bidder') || 'None listed';
  const cdo = get(result, 'cdo') || 'None listed';
  const currentPost = get(result, 'currentPost') || 'None listed';
  const futurePost = get(result, 'futurePost') || 'None listed';
  const panelDate = get(result, 'panelDate') || 'None listed';
  const showHandshakeIcon = get(result, 'hs_accepted') || false;
  const ted = get(result, 'ted') || 'None listed';
  const userRole = isCDO ? 'cdo' : 'ao';
  const useCDOBidding = () => checkFlag('flags.cdo_bidding');

  return (
    <BoxShadow className="employee-agenda-stat-card">
      <div className="employee-agenda-card-inner">
        <div className="employee-agenda-card-top">
          <div className="employee-ribbon-container">
            <div className="ribbon-container-condensed">
              {showHandshakeIcon &&
                  <Tooltip
                    title="Handshake"
                    arrow
                    offset={-60}
                  >
                    <Handshake showText={false} className="ribbon-condensed-card" />
                  </Tooltip>
              }
            </div>
          </div>
        </div>
        <div>
          <h3>
            <Link to="/profile/public/6">{bidder}</Link>
          </h3>
        </div>
        <div className="employee-agenda-card-data-point-top">
          <div className="employee-card-data-point">
            <FA name="building-o" />
            <dt>Org:</dt>
            <dd>
              {currentPost}
              <FA className="org-fa-arrow" name="long-arrow-right" />
              {futurePost}
            </dd>
          </div>
          <div className="employee-card-data-point">
            <FA name="clock-o" />
            <dt>TED:</dt>
            <dd>{ted}</dd>
          </div>
          <div className="employee-card-data-point">
            <FA name="user-o" />
            <dt>CDO:</dt>
            <dd>{cdo}</dd>
          </div>
        </div>
        <div className="employee-card-data-point">
          <FA name="pencil-square" />
          <dt>Author:</dt>
          <dd>{author}</dd>
        </div>
        <div className="employee-card-data-point">
          <FA name="calendar-o" />
          <dt>Panel Meeting Date:</dt>
          <dd>{panelDate}</dd>
        </div>
        <div className="employee-card-data-point">
          <FA name="sticky-note-o" />
          <dt>Agenda Status:</dt>
          <dd>{agendaStatus}</dd>
        </div>
      </div>
      <div className="employee-agenda-card-bottom">
        {/* will need to add a flag for both buttons during integration */}
        <div className="button-container">
          <div className="view-agenda-item-container">
            <LinkButton className="view-agenda-item-button" toLink={`/profile/${userRole}/agendaitemhistory/perdet`}>View History</LinkButton>
          </div>
          {/* update the flag during integration */}
          {useCDOBidding() &&
            <div className="create-ai-box-container">
              <LinkButton className="create-ai-box-button" toLink="#">Create Agenda Item</LinkButton>
            </div>
          }
        </div>
      </div>
    </BoxShadow>
  );
};

EmployeeAgendaSearchCard.propTypes = {
  isCDO: PropTypes.bool,
  result: PropTypes.arrayOf(PropTypes.shape({})),
};

EmployeeAgendaSearchCard.defaultProps = {
  isCDO: false,
  result: [],
};

export default EmployeeAgendaSearchCard;
