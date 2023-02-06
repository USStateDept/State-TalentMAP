import PropTypes from 'prop-types';
import LinkButton from 'Components/LinkButton';
import { PANEL_MEETING } from 'Constants/PropTypes';
import { get, sortBy } from 'lodash';
import { formatDate } from 'utilities';

const FALLBACK = 'None listed';

const PanelMeetingSearchRow = ({ isCDO, pm, showCreate }) => {
  const meetingTypeCode = get(pm, 'pmt_code') || FALLBACK;
  const meetingTypeText = get(pm, 'pmt_desc_text') || '';
  const meetingStatus = get(pm, 'pms_desc_text') || FALLBACK;
  const meetingDates = get(pm, 'panelMeetingDates') || [];
  const meetingDates$ = sortBy(meetingDates, ['mdt_order_num']);

  const userRole = isCDO ? 'cdo' : 'ao';

  return (
    <div className="usa-grid-full panel-meeting-stat-row">
      <div className="meeting-type-circle-container">
        <div className="meeting-type-circle">
          {meetingTypeCode}
        </div>
      </div>
      <div className="panel-meeting-row-name">
        {meetingTypeText}
      </div>
      <div className="panel-meeting-row-data-container">
        <div className="panel-meeting-row-data-points">
          <div className="panel-meeting-row-data-point">
            <dt>Meeting Status:</dt>
            <dd>{meetingStatus}</dd>
          </div>
          {meetingDates$.map(pmd => {
            if (get(pmd, 'mdt_desc_text')) {
              return (
                <div className="panel-meeting-row-data-point">
                  <dt>{get(pmd, 'mdt_desc_text')}:</dt>
                  <dd>{formatDate(get(pmd, 'pmd_dttm'), 'MM/DD/YYYY HH:mm') || FALLBACK}</dd>
                </div>
              );
            }
            return false;
          })}
        </div>
        <div className="button-container">
          {
            !!showCreate &&
            <div className="button-box-container">
              <LinkButton className="button-box" toLink={`/profile/${userRole}/panelmeetingagendas/`}>Go to Panel</LinkButton>
            </div>
          }
        </div>

      </div>
    </div>
  );
};

PanelMeetingSearchRow.propTypes = {
  isCDO: PropTypes.bool,
  pm: PANEL_MEETING,
  showCreate: PropTypes.bool,
};

PanelMeetingSearchRow.defaultProps = {
  isCDO: false,
  pm: {},
  showCreate: true,
};

export default PanelMeetingSearchRow;
