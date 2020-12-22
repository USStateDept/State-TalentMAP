import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Success = ({ messageBefore, link, messageAfter }) => (
  link && link.path && link.text ?
    <div>
      {messageBefore}
      <div>
        <Link to={get(link, 'path')}>{get(link, 'text')}</Link>
      </div>
      {messageAfter}
    </div>
    :
    <span>{messageBefore}</span>
);

Success.propTypes = {
  messageBefore: PropTypes.string,
  link: PropTypes.shape({
    path: PropTypes.string,
    text: PropTypes.string,
  }),
  messageAfter: PropTypes.string,
};

Success.defaultProps = {
  messageBefore: '',
  link: PropTypes.shape({
    path: '',
    text: '',
  }),
  messageAfter: '',
};

export default Success;
