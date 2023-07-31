import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { Column, Row } from 'Components/Layout';
import { formatDate } from 'utilities';

const CycleSearchCard = (props) => {
  const {
    id,
    cycle_name,
    cycle_category,
    cycle_begin_date,
    cycle_end_date,
    cycle_excl_position,
    isAO,
  } = props;

  const cycleLink = `/profile/${isAO ? 'ao' : 'bureau'}/cyclepositionsearch/${id}`;

  return (
    <Row fluid className="cycle-search-card box-shadow-standard">
      <Row fluid className="cyc-card--row">
        <Column columns={3}>
          {cycle_name}
        </Column>
        <Column columns={12} className="cyc-card--middle-cols">
          <Column>
            {`Start Date: ${cycle_begin_date ? formatDate(cycle_begin_date) : ''}`}
          </Column>
          <Column>
            {`End Date: ${cycle_end_date ? formatDate(cycle_end_date) : ''}`}
          </Column>
          <Column>
            {`Panel Cutoff: ${cycle_category}`}
          </Column>
          <Column>
            {`Future Vacancy: ${cycle_excl_position}`}
          </Column>
        </Column>
        <Column columns={3} className="cyc-card--link-col">
          <span>
            {<Link to={cycleLink}>
              <FA className="fa-solid fa-plus" />
              {' Edit'}
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
  cycle_category: PropTypes.string,
  cycle_begin_date: PropTypes.string,
  cycle_end_date: PropTypes.string,
  cycle_excl_position: PropTypes.string,
  isAO: PropTypes.bool,
};

CycleSearchCard.defaultProps = {
  cycle_name: '',
  cycle_category: '',
  cycle_begin_date: '',
  cycle_end_date: null,
  cycle_excl_position: null,
  isAO: false,
};

export default CycleSearchCard;
