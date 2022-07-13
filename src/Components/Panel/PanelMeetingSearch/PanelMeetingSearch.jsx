import PropTypes from 'prop-types';

const PanelMeetingSearch = ({ isCDO }) => {
  const text = isCDO ? 'yes CDO' : 'no AO';
  return (
    <div>
      Panel Meeting Search Page
      <div>
        Headers/Filters TBD
      </div>
      <div>
        isCDO: {text}
      </div>
    </div>
  );
};

PanelMeetingSearch.propTypes = {
  isCDO: PropTypes.bool,
};

PanelMeetingSearch.defaultProps = {
  isCDO: false,
};

export default PanelMeetingSearch;
