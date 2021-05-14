import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import { stopProp } from 'utilities';
import { Column, Row } from '../../../Layout';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';
import InteractiveElement from '../../../InteractiveElement';

const LogsPage = (props) => {
  const {
    name, onClick, isSelected,
  } = props;

  const onDownloadClick$ = (e) => {
    stopProp(e);
    props.onDownloadClick(props.name);
  };

  const onClick$ = (e) => {
    if (get(e, 'target.name') !== 'download') {
      onClick(props.name);
    }
  };

  return (
    <InteractiveElement
      onClick={onClick$}
      title={`View contents of ${name}`}
      type={Row}
      role="radio"
      aria-checked={isSelected}
      className={`usa-grid-full log-list-row ${isSelected ? 'log-list-row--selected' : ''}`}
    >
      <Column columns={1}>
        <FA name={isSelected ? 'dot-circle-o' : 'circle-o'} />
      </Column>
      <Column columns={9}>
        <span>{name}</span>
      </Column>
      <Column columns={2} className="log-list-row--download">
        <button name="download" className="usa-button" onClick={onDownloadClick$}>Download</button>
      </Column>
    </InteractiveElement>
  );
};

LogsPage.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onDownloadClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

LogsPage.defaultProps = {
  onClick: EMPTY_FUNCTION,
  onDownloadClick: EMPTY_FUNCTION,
  isSelected: false,
};

export default LogsPage;
