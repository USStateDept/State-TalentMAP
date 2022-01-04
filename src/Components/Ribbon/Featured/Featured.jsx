import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const Featured = ({ featuredType, ...props }) => {
  let text;
  switch (featuredType) {
    case 'volunteer':
      text = 'Volunteer';
      break;
    case 'urgentVacancy':
      text = 'Urgent';
      break;
    case 'featured':
    default:
      text = 'Featured';
      break;
  }
  return (
    <Ribbon icon="bolt" text={text} type="tertiary" {...props} />
  );
};

Featured.propTypes = {
  featuredType: PropTypes.oneOf(['featured', 'volunteer', 'urgentVacancy']),
};

Featured.defaultProps = {
  featuredType: 'featured',
};

export default Featured;
