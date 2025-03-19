import { Row } from 'Components/Layout';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SelectedCardsBanner = ({ selectedCards, viewType, className }) => (
  <Row className={`select-all-banner ${className} box-shadow-standard usa-grid-full`} >
    <div className="text-wrapper">
      {selectedCards.count} Cycle(s) Selected
    </div>
    <div className="button-wrapper">
      <Link
        to={{
          pathname: `/profile/${viewType}/cyclemanagement/positions`,
          state: {
            cycleIDs: selectedCards.cycleIds,
            cycles: selectedCards.cycles,
            activeTab: 'INFORMATION',
          },
        }}
      >
        <button className="usa-button-secondary" >View Cycle Positions</button>
      </Link>
      <Link
        to={{
          pathname: `/profile/${viewType}/cyclemanagement/positions`,
          state: {
            cycleIDs: selectedCards.cycleIds,
            cycles: selectedCards.cycles,
            activeTab: 'BIDDERS',
          },
        }}
      >
        <button className="usa-button-secondary">View Cycle Bidders</button>
      </Link>
    </div>
  </Row>
);

SelectedCardsBanner.propTypes = {
  selectedCards: PropTypes.shape({
    count: PropTypes.number.isRequired,
    cycleIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    cycles: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  viewType: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SelectedCardsBanner.defaultProps = {
  className: '',
};

export default SelectedCardsBanner;
