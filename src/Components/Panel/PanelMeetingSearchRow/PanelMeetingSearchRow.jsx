import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import LinkButton from 'Components/LinkButton';
import { get } from 'lodash';
import { formatDate } from 'utilities';

const FALLBACK = 'None listed';

const PanelMeetingSearchRow = ({ isCDO, result, showCreate }) => {
  // will need to update during integration
  const meetingType = get(result, 'meeting_type') || FALLBACK;
  const meetingTypeAbbreviation = get(result, 'short_desc_text') || FALLBACK;
  const meetingDate = get(result, 'meeting_date') ? formatDate(result.meeting_date) : FALLBACK;
  const meetingStatus = get(result, 'meeting_status') || FALLBACK;
  const preliminaryCutoff = get(result, 'preliminary_cutoff') ? formatDate(result.preliminary_cutoff) : FALLBACK;
  const addendum_cutoff = get(result, 'addendum_cutoff') ? formatDate(result.addendum_cutoff) : FALLBACK;
  const userRole = isCDO ? 'cdo' : 'ao';

  return (
    <div className="usa-grid-full panel-meeting-stat-row">
      <div className="meeting-type-circle-container">
        <div className="meeting-type-circle">
          {meetingTypeAbbreviation}
        </div>
      </div>
      <div className="panel-meeting-row-name">
        <div className="row-name">{meetingType}</div>
      </div>
      <div className="panel-meeting-row-data-container">
        <div className="panel-meeting-row-data-points">
          <div className="panel-meeting-row-data-point">
            <FA name="calendar-o" />
            <dt>Meeting Date:</dt>
            <dd>{meetingDate}</dd>
          </div>
          <div className="panel-meeting-row-data-point">
            <FA name="thermometer" />
            <dt>Meeting Status:</dt>
            <dd>{meetingStatus}</dd>
          </div>
          <div className="panel-meeting-row-data-point">
            <FA name="user-o" />
            <dt>Preliminary Cut-Off:</dt>
            <dd>{preliminaryCutoff}</dd>
          </div>
          <div className="panel-meeting-row-data-point">
            <FA name="plus-square" />
            <dt>Addendum Cut-Off:</dt>
            <dd>{addendum_cutoff}</dd>
          </div>
        </div>
        <div className="button-container">
          {
            !!showCreate &&
            <div className="create-ai-box-container">
              <LinkButton className="create-ai-box-button" toLink={`/profile/${userRole}/panel/`}>Go to Panel</LinkButton>
            </div>
          }
        </div>

      </div>
    </div>
  );
};

PanelMeetingSearchRow.propTypes = {
  isCDO: PropTypes.bool,
  result: PropTypes.PropTypes.shape({
    meeting_type: PropTypes.string,
    short_desc_text: PropTypes.string,
    meeting_date: PropTypes.string,
    meeting_status: PropTypes.string,
    preliminary_cutoff: PropTypes.string,
    addendum_cutoff: PropTypes.string,
  }),
  showCreate: PropTypes.bool,
};

PanelMeetingSearchRow.defaultProps = {
  isCDO: false,
  result: {},
  showCreate: true,
};

export default PanelMeetingSearchRow;
