import PropTypes from 'prop-types';
import LinkButton from '../../../LinkButton';


const ClosedAlert = ({ title, date, bidIdUrl }, { condensedView }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--closed">
    <div className="top-text">
        The position {title} is no longer available.
    </div>
    {
      date &&
        <div className="date-text">
          {date}
        </div>
    }
    {
      condensedView &&
      <div className="usa-grid-full">
        <LinkButton toLink={bidIdUrl} className="tm-button-transparent">
          Go to Bid Tracker
        </LinkButton>
      </div>
    }
  </div>
);

ClosedAlert.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  bidIdUrl: PropTypes.string,
};

ClosedAlert.defaultProps = {
  date: '',
  bidIdUrl: '',
};

ClosedAlert.contextTypes = {
  condensedView: PropTypes.bool,
};

export default ClosedAlert;
