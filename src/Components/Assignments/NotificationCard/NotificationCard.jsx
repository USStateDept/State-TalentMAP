import TabbedCard from 'Components/TabbedCard';
import Header from './Tabs/Header';
import EFM from './Tabs/EFM';
import Remarks from './Tabs/Remarks';
import Training from './Tabs/Training';
import Assignments from './Tabs/Assignments';
import Paragraphs from './Tabs/Paragraphs';
import Routing from './Tabs/Routing';
import Memo from './Tabs/Memo';
import MemoHeader from './Tabs/MemoHeader';


const NotificationCard = () => {
  const container = (children) => (
    <div className="notification-card">
      <div className="notification-card__header">
        <span>
          Edit Notification
        </span>
        <span>
          Please update all relevant information as it pertains to this note.
        </span>
      </div>
      {children}
    </div>
  );

  const memoContainer = (children) => (
    <div className="notification-card">
      <div className="notification-card__header">
        <span>Memorandum</span>
      </div>
      {children}
    </div>
  );

  return (
    <TabbedCard
      tabs={[{
        text: 'Header',
        value: 'HEADER',
        content: container(<Header />),
      }, {
        text: 'Routing',
        value: 'ROUTING',
        content: container(<Routing />),
      }, {
        text: 'Assignments',
        value: 'ASSIGNMENTS',
        content: container(<Assignments />),
      }, {
        text: 'Paragraphs',
        value: 'PARAGRAPHS',
        content: container(<Paragraphs />),
      }, {
        text: 'Training',
        value: 'TRAINING',
        content: container(<Training />),
      }, {
        text: 'EFM',
        value: 'EFM',
        content: container(<EFM />),
      }, {
        text: 'Remarks',
        value: 'REMARKS',
        content: container(<Remarks />),
      }, {
        text: 'Memo',
        value: 'MEMO',
        content: memoContainer(<Memo />),
      }, {
        text: 'Memo Header',
        value: 'MEMOHEADER',
        content: memoContainer(<MemoHeader />),
      }]}
    />
  );
};

NotificationCard.propTypes = {
};

NotificationCard.defaultProps = {
};

export default NotificationCard;
