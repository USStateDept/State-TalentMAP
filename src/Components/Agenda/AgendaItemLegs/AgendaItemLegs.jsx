import { useState } from 'react';
import PropTypes from 'prop-types';

const AgendaItemLegs = props => {
  const {
    result,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);

  return (
    <div>
      in AgendaItemLegs {result}
    </div>
  );
};

AgendaItemLegs.propTypes = {
  result: PropTypes.number,
};


AgendaItemLegs.defaultProps = {
  result: 1,
};

export default AgendaItemLegs;
