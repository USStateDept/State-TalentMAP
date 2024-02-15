import { Row } from 'Components/Layout';
import DefinitionList from 'Components/DefinitionList';
import { NO_BUREAU, NO_ORG } from 'Constants/SystemMessages';
import { getResult } from 'utilities';

const OrgStatsCard = (props) => {
  const sections = {
    /* eslint-disable quote-props */
    heading: {
      'Bureau': getResult(props, 'bureau_short_desc') || NO_BUREAU,
      'Organization': getResult(props, 'organization') || NO_ORG,
    },
    body: {
      'Total POS': getResult(props, 'total_pos'),
      'Total Filled': getResult(props, 'total_filled'),
      '% Filled': getResult(props, 'total_percent'),
      'Overseas POS': getResult(props, 'overseas_pos'),
      'Overseas Filled': getResult(props, 'overseas_filled'),
      '% Overseas': getResult(props, 'overseas_percent'),
      'Domestic POS': getResult(props, 'domestic_pos'),
      'Domestic Filled': getResult(props, 'domestic_filled'),
      '% Domestic': getResult(props, 'domestic_percent'),
    },
    /* eslint-enable quote-props */
  };

  return (
    <Row fluid className="tabbed-card box-shadow-standard">
      <div className="position-content">
        <Row fluid className="position-content--section position-content--subheader no-space">
          <span className="title-link">
            {getResult(props, 'title')}
          </span>
          <div className="line-separated-fields">
            {Object.keys(sections.heading).map(field => (
              <div key={`subheading-${field}`}>
                <span>{field}:</span>
                <span>{sections.heading[field]}</span>
              </div>
            ))}
          </div>
        </Row>
        <Row fluid className="position-content--section position-content--details condensed">
          <DefinitionList
            itemProps={{ excludeColon: true }}
            items={sections.body}
          />
        </Row>
      </div>
    </Row>
  );
};

OrgStatsCard.propTypes = {
};

OrgStatsCard.defaultProps = {
};

export default OrgStatsCard;
