import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import NavTabs from '../NavTabs/NavTabs';

const TabbedCard = ({ tabs }) => {
  const tabRef = useRef();

  const [activeTab, setActiveTab] = useState(tabs?.[0]?.value || '');
  return (
    <Row fluid className="tabbed-card box-shadow-standard">
      <Row fluid className="tabbed-card--header">
        <NavTabs
          tabs={tabs}
          ref={tabRef}
          value={activeTab}
          passNavValue={setActiveTab}
          styleVariant="lightBorderBottom"
        />
      </Row>
      {/* eslint-disable eqeqeq */}
      {tabs.find(tab => activeTab == tab.value).content}
    </Row>
  );
};

TabbedCard.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      content: PropTypes.element,
    }),
  ).isRequired,
};

export default TabbedCard;
