import { useState } from 'react';
import PropTypes from 'prop-types';

const AgendaItemRowView = props => {
  const {
    result,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);

  return (
    <div>
      in AgendaItemRowView {result}
    </div>
  );
};

AgendaItemRowView.propTypes = {
  result: PropTypes.number,
};


AgendaItemRowView.defaultProps = {
  result: 1,
};

export default AgendaItemRowView;
