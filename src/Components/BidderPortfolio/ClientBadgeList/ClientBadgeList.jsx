import React from 'react';
// import { } from 'lodash';
import ClientBadge from '../ClientBadge';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const ClientBadgeList = ({ classifications, clientClassifications }) => (
  <div className="usa-grid-full client-badge-list">
    {classifications.sort(c => (clientClassifications.includes(c.code) ? -1 : 1))
                    .slice(0, 4)
                    .map(c => (
                      <ClientBadge
                        type={c.code}
                        status={clientClassifications.indexOf(c.code) > -1}
                      />
                    ))
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
