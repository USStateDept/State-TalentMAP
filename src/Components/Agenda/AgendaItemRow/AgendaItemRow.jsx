import { useState } from 'react';
import PropTypes from 'prop-types';

const AgendaItemRow = props => {
  const {
    result,
    isFirst,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);

  return (
    <div>
      result: {result}
      {
        isFirst &&
          ' FirstCard'
      }
    </div>
  );
};

AgendaItemRow.propTypes = {
  result: PropTypes.number,
  isFirst: PropTypes.bool,
};


AgendaItemRow.defaultProps = {
  result: 1,
  isFirst: false,
};

export default AgendaItemRow;
