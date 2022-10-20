// import PropTypes from 'prop-types';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { formatDate } from 'utilities';

const PanelMeetingAgenda = () => {
  const preliminaryCutoff = formatDate('2024-05-20T16:00:00Z', 'MM/DD/YYYY HH:mm:ss');
  const addendumCutoff = formatDate('2024-05-21T17:00:00Z', 'MM/DD/YYYY HH:mm:ss');

  return (
    <div className="panel-meeting-agenda-page">
      <div className="usa-grid-full panel-meeting-agenda-upper-section results-search-bar-container">
        <ProfileSectionTitle title="Panel Meeting Agenda" icon="tasks" />
        <div className="cutoff-date-container">
          <div>
            <span>
              Preliminary Cut-off:
            </span>
            <span className="preliminary-cut-off-date">
              {preliminaryCutoff}
            </span>
          </div>
          <div>
            <span>
              Addendum Cut-off:
            </span>
            <span className="addendum-cut-off-date">
              {addendumCutoff}
            </span>
          </div>
        </div>
        <PositionManagerSearch
          label="Find Panel Meeting Agenda Item"
          placeHolder="Search using Panel Meeting Agenda Info"
        />
      </div>
    </div>
  );
};

// PanelMeetingAgenda.propTypes = {
// };

// PanelMeetingAgenda.defaultProps = {
// };

export default PanelMeetingAgenda;
