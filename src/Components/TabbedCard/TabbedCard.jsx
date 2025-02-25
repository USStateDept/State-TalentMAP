import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import NavTabs from 'Components/NavTabs/NavTabs';

const TabbedCard = ({ tabs, initialActiveTab, onTabChange, className, customComponent }) => {
  const tabRef = useRef();

  const existingTabs = tabs.filter(t => t);

  const [activeTab, setActiveTab] = useState(existingTabs?.[0]?.value || '');

  // Set active tab on render
  useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    } else {
      setActiveTab(existingTabs?.[0]?.value || '');
    }
  }, [initialActiveTab]);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab]);

  return (
    <Row fluid className={`tabbed-card box-shadow-standard ${className}`}>
      { customComponent &&
          customComponent
      }
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
  initialActiveTab: PropTypes.string,
  onTabChange: PropTypes.func,
  className: PropTypes.string,
  customComponent: PropTypes.element,
};

TabbedCard.defaultProps = {
  initialActiveTab: '',
  onTabChange: null,
  className: '',
  customComponent: null,
};

export default TabbedCard;
