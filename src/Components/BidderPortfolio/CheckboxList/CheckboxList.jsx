import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox';
import CLIENT_EDITS from '../../../Constants/ClientEdits';

const ClientBadgeList = ({ id }) => (
  <div className="client-checkbox-list">
    {CLIENT_EDITS.map(c => (
      <CheckBox
        id={`${id}-${c.value}`}
        label={c.label}
        small
        value={false}
        key={c.value}
      />
    ))}
  </div>
);

ClientBadgeList.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

ClientBadgeList.defaultProps = {
  statuses: {},
};

export default ClientBadgeList;
