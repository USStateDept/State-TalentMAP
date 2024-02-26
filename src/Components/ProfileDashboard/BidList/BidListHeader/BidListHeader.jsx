import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { formatDate } from '../../../../utilities';
import SectionHeader from '../../SectionHeader';

// Due date is static for now
const BidListHeader = ({ date }) => {
  const title = ` All bids are due ${formatDate(date)}`;
  const buttonText = 'More Info';
  const icon = 'clock-o';
  const props = { title, buttonText, icon };
  return (
    <SectionHeader {...props} />
  );
};

BidListHeader.propTypes = {
  date: PropTypes.string,
};

BidListHeader.defaultProps = {
  date: dateFns.format('07/15/2019', 'MM/dd/yyyy'),
};

export default BidListHeader;
