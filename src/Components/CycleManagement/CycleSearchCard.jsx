import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Column, Row } from 'Components/Layout';
import { formatDate } from 'utilities';

const CycleSearchCard = (props) => {
  const {
    id,
    cycle_name,
    cycle_status,
    cycle_category,
    cycle_begin_date,
    cycle_end_date,
    cycle_excl_position,
    cycle_post_view,
  } = props;

  const cycleLink = `/profile/bureau/cyclemanagement/${id}`;

  return (
    <Row fluid className="cycle-search-card">
      <Row fluid className="cyc-card--row">
        <Column columns={3}>
          {cycle_name}
        </Column>
        <Column columns={12} className="cyc-card--middle-cols">
          <Column>
            {`Cycle Start: ${cycle_begin_date ? formatDate(cycle_begin_date) : ''}`}
          </Column>
          <Column>
            {`Bid Due: ${cycle_end_date ? formatDate(cycle_end_date) : ''}`}
          </Column>
          <Column>
            {cycle_status}
          </Column>
          <Column>
            {`Status: ${cycle_category}`}
          </Column>
          <Column>
            {`Exluded: ${cycle_excl_position}`}
          </Column>
          <Column>
            {`Post View: ${cycle_post_view}`}
          </Column>
        </Column>
        <Column columns={3} className="cyc-card--link-col">
          <span>
            {<Link to={cycleLink}>
              View Cycle Positions
            </Link>}
          </span>
        </Column>
      </Row>
    </Row>
  );
};

CycleSearchCard.propTypes = {
  id: PropTypes.string.isRequired,
  cycle_name: PropTypes.string,
  cycle_status: PropTypes.string,
  cycle_category: PropTypes.string,
  cycle_begin_date: PropTypes.string,
  cycle_end_date: PropTypes.string,
  cycle_excl_position: PropTypes.string,
  cycle_post_view: PropTypes.string,
};

CycleSearchCard.defaultProps = {
  cycle_name: '',
  cycle_status: '',
  cycle_category: '',
  cycle_begin_date: '',
  cycle_end_date: null,
  cycle_excl_position: null,
  cycle_post_view: '',
};

export default CycleSearchCard;
