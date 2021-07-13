import { orderBy } from 'lodash';
import { orderClassifications } from '../helpers';
import ClientBadge from '../ClientBadge';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const ClientBadgeList = ({ classifications, clientClassifications }) => (
  <div className="usa-grid-full client-badge-list">
    {orderBy(orderClassifications(classifications), c => clientClassifications.includes(c.code), ['desc'])
      .slice(0, 4)
      .map((c) => {
        let checked = false;
        clientClassifications.forEach((item) => {
          c.seasons.forEach((cs) => { if (cs.id === item) checked = true; });
        });
        return (
          <ClientBadge
            key={c.code}
            type={c}
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
