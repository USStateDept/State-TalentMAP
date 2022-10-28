import PropTypes from 'prop-types';
import LinkButton from 'Components/LinkButton';
import { get } from 'lodash';
import { formatDate } from 'utilities';

const FALLBACK = 'None listed';

const PanelMeetingSearchRow = ({ isCDO, result, showCreate }) => {
  // will need to update during integration
  const meetingType = get(result, 'meeting_type') || FALLBACK;
  const meetingTypeAbbreviation = get(result, 'short_desc_text') || FALLBACK;
  const meetingDate = get(result, 'meeting_date') ? formatDate(result.meeting_date, 'MM/DD/YYYY HH:mm:ss') : FALLBACK;
  const meetingStatus = get(result, 'meeting_status') || FALLBACK;
  const preliminaryCutoff = get(result, 'preliminary_cutoff') ?
    formatDate(result.preliminary_cutoff, 'MM/DD/YYYY HH:mm:ss') : FALLBACK;
  const addendum_cutoff = get(result, 'addendum_cutoff') ?
    formatDate(result.addendum_cutoff, 'MM/DD/YYYY HH:mm:ss') : FALLBACK;
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
            <dt>Meeting Date:</dt>
            <dd>{meetingDate}</dd>
          </div>
          <div className="panel-meeting-row-data-point">
            <dt>Meeting Status:</dt>
            <dd>{meetingStatus}</dd>
          </div>
          <div className="panel-meeting-row-data-point">
            <dt>Preliminary Cut-Off:</dt>
            <dd>{preliminaryCutoff}</dd>
          </div>
          <div className="panel-meeting-row-data-point">
            <dt>Addendum Cut-Off:</dt>
            <dd>{addendum_cutoff}</dd>
          </div>
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
