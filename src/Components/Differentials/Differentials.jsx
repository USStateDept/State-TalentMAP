import React from 'react';
import PropTypes from 'prop-types';
import { isNumeric } from 'utilities';
import OBCUrl from 'Components/OBCUrl';
import { NO_DANGER_PAY, NO_POST_DIFFERENTIAL } from 'Constants/SystemMessages';

const DefinitionList = ({ dangerPay, postDifferential, obcUrl }) => (
  <div>
    <span>{isNumeric(postDifferential) ? `${postDifferential}%` : 'N/A'} | </span>
    <span>{isNumeric(dangerPay) ? `${dangerPay}%` : 'N/A'}</span>
    {
      !!obcUrl &&
      <span style={{ paddingLeft: 5, position: 'absolute' }}><OBCUrl url={obcUrl} type="post-data" label="OBC Details" /></span>
    }
  </div>
);

DefinitionList.propTypes = {
  dangerPay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  postDifferential: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  obcUrl: PropTypes.string,
};

DefinitionList.defaultProps = {
  dangerPay: NO_DANGER_PAY,
  postDifferential: NO_POST_DIFFERENTIAL,
  obcUrl: '',
};

export default DefinitionList;
