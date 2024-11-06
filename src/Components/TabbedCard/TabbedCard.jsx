import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import NavTabs from '../NavTabs/NavTabs';

const TabbedCard = ({ tabs, className }) => {
  const tabRef = useRef();

  const existingTabs = tabs.filter(t => t);

  const [activeTab, setActiveTab] = useState(existingTabs?.[0]?.value || '');
  return (
    <Row fluid className={`tabbed-card box-shadow-standard ${className}`}>
      <Row fluid className="tabbed-card--header">
        <NavTabs
          tabs={existingTabs}
          ref={tabRef}
          value={activeTab}
          passNavValue={setActiveTab}
          styleVariant="lightBorderBottom"
        />
      </Row>
      {existingTabs?.find(tab => activeTab === tab.value)?.content}
    </Row>
  );
};

TabbedCard.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      content: PropTypes.element,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  className: PropTypes.string,
};

TabbedCard.defaultProps = {
  className: '',
};

export default TabbedCard;
