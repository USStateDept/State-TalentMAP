import PropTypes from 'prop-types';

const PanelMeetingSearch = ({ isCDO }) => {
  const text = isCDO ? 'yes' : 'no';
  return (
    <h1>
        Panel Meeting Search
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
