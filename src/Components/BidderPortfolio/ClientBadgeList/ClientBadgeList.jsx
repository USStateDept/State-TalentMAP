import React from 'react';
import { orderBy } from 'lodash';
import ClientBadge from '../ClientBadge';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const ClientBadgeList = ({ classifications, clientClassifications }) => (
  <div className="usa-grid-full client-badge-list">
    {orderBy(classifications, c => clientClassifications.includes(c.code), ['desc'])
      .slice(0, 4)
      .map((c) => {
        const checked = clientClassifications.includes(c.code);
        return (
          <ClientBadge
            key={c.code}
            type={c.code}
            status={checked}
          />
        );
      })
    }
  </div>
);

ClientBadgeList.propTypes = {
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
};

ClientBadgeList.defaultProps = {
  classifications: [],
  clientClassifications: [],
};

export default ClientBadgeList;
