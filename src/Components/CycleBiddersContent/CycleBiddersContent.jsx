import PositionExpandableContent from 'Components/PositionExpandableContent';

const CycleBiddersContent = () => {
  const sections = {
    subheading: [
      { Cycle: 'Cycle 2025' },
      { 'Position Number': '123456' },
      { 'Position Title': 'Position Title' },
      { Skill: '(123) Skill Name' },
    ],
    bodyPrimary: [
      { 'Cycle Position Status': 'Status' },
      { Bureau: 'Bureau Name' },
      { 'Location/Org': '(Org) Location' },
      { Grade: '00' },
      { Language: 'Language' },
      { 'Critcal Need': 'Y/N' },
      { Posted: 'MM/DD/YYYY' },
      { Incumbent: 'Incumbent Name' },
      { 'Incumbent Status': 'Status' },
      { 'Incumbent TED': 'MM/DD/YYYY' },
    ],
  };

  return (
    <div>
      <PositionExpandableContent sections={sections} tempHideEdit />
    </div>
  );
};

export default CycleBiddersContent;
