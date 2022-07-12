import PropTypes from 'prop-types';

const PanelMeetingSearch = ({ isCDO }) => {
  const text = isCDO ? 'yes CDO' : 'no AO';
  return (
    <h1>
      Panel Meeting Search Page
      <div>
        Headers/Filters TBD
      </div>
      <div>
        isCDO: {text}
      </div>
    </h1>
  );
};

PanelMeetingSearch.propTypes = {
  isCDO: PropTypes.bool,
};

PanelMeetingSearch.defaultProps = {
  isCDO: false,
};

export default PanelMeetingSearch;
