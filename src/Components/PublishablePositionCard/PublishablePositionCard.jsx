import { useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import Picky from 'react-picky';
import { getDifferentials, getPostName, getResult } from 'utilities';
import { BID_CYCLES, POSITION_DETAILS } from 'Constants/PropTypes';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import {
  NO_BUREAU, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL, NO_STATUS, NO_TOUR_END_DATE, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';
import { Row } from 'Components/Layout';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import LanguageList from 'Components/LanguageList';
import PositionExpandableContent from 'Components/PositionExpandableContent';


const PublishablePositionCard = ({ data, cycles }) => {
  const pos = data?.position || data;

  const updateUser = getResult(pos, 'description.last_editing_user');
  const updateDate = getResult(pos, 'description.date_updated');

  // =============== View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: {
      'Position Number': getResult(pos, 'position_number', NO_POSITION_NUMBER),
      'Skill': getResult(pos, 'skill_code') || NO_SKILL,
      'Position Title': getResult(pos, 'title') || NO_POSITION_TITLE,
    },
    bodyPrimary: {
      'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
      'Location': getPostName(pos?.post) || NO_POST,
      'Org/Code': getResult(pos, 'bureau_code') || NO_ORG,
      'Grade': getResult(pos, 'grade') || NO_GRADE,
      'Status': getResult(pos, 'status') || NO_STATUS,
    },
    bodySecondary: {
      'Bid Cycle': getResult(pos, 'latest_bidcycle.name', 'None Listed'),
      'TED': getResult(data, 'ted') || NO_TOUR_END_DATE,
      'Incumbent': getResult(pos, 'current_assignment.user') || NO_USER_LISTED,
      'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" />,
      'Tour of Duty': getResult(pos, 'post.tour_of_duty') || NO_TOUR_OF_DUTY,
      'Pay Plan': '---',
      'Assignee': '---',
      'Post Differential | Danger Pay': getDifferentials(pos),
    },
    textarea: pos?.description?.content || 'No description.',
    metadata: {
      'Position Posted': getResult(pos, 'description.date_created') || NO_UPDATE_DATE,
      'Last Updated': (updateDate && updateUser) ? `${updateUser} ${updateDate}` : (updateDate || NO_UPDATE_DATE),
    },
    /* eslint-enable quote-props */
  };


  // =============== Edit Mode ===============
  function renderSelectionList({ items, selected, ...rest }) {
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={'custom_description'}
      />);
    });
  }

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 200,
    includeSelectAll: true,
    renderList: renderSelectionList,
    className: 'width-280',
  };

  const statusOptions = [
    { code: 1, name: 'Vet' },
    { code: 2, name: 'Publishable' },
    { code: 3, name: 'Non-Publishable' },
  ];
  const [status, setStatus] = useState(statusOptions[0]);
  const [exclude, setExclude] = useState(true);
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [textArea, setTextArea] = useState(pos?.description?.content || 'No description.');


  const form = {
    /* eslint-disable quote-props */
    staticBody: {
      'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
      'Location': getPostName(pos?.post) || NO_POST,
      'Org/Code': getResult(pos, 'bureau_code') || NO_ORG,
      'Grade': getResult(pos, 'grade') || NO_GRADE,
      'Bid Cycle': getResult(pos, 'latest_bidcycle.name', 'None Listed'),
      'TED': getResult(data, 'ted') || NO_TOUR_END_DATE,
      'Incumbent': getResult(pos, 'current_assignment.user') || NO_USER_LISTED,
      'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" />,
      'Tour of Duty': getResult(pos, 'post.tour_of_duty') || NO_TOUR_OF_DUTY,
      'Pay Plan': '---',
      'Assignee': '---',
      'Post Differential | Danger Pay': getDifferentials(pos),
    },
    inputBody: <div className="position-form">
      <div className="spaced-row">
        <div className="position-form--input">
          <label htmlFor="publishable-position-statuses">Status</label>
          <select
            id="publishable-position-statuses"
            defaultValue={status}
            onChange={(e) => setStatus(e?.target.value)}
          >
            {statusOptions.map(s => (
              <option value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <CheckBox
          id="exclude-checkbox"
          label="Exclude Position from Bid Audit"
          value={exclude}
          onCheckBoxClick={e => setExclude(e)}
        />
      </div>
      <div>
        <Row fluid className="position-form--description">
          <span className="definition-title">Position Details</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={6}
              minRows={6}
              maxlength="4000"
              name="position-description"
              placeholder="No Description"
              defaultValue={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {textArea.length} / 4,000
          </div>
        </Row>
      </div>
      <div className="content-divider" />
      <div className="position-form--heading">
        <span className="title">Future Cycle</span>
        <span className="subtitle">Please identify a cycle to add this position to.</span>
      </div>
      <div className="position-form--picky">
        <div className="publishable-position-cycles-label">Chosen Bid Cycle(s):</div>
        <div className="publishable-position-cycles">{selectedCycles.map(a => a.name).join(', ')}</div>
      </div>
      <Picky
        {...pickyProps}
        placeholder="Choose Bid Cycle(s)"
        value={selectedCycles}
        options={cycles?.data}
        onChange={setSelectedCycles}
        valueKey="id"
        labelKey="name"
      />
    </div>,
    /* eslint-enable quote-props */
  };

  return (
    <TabbedCard
      tabs={[{
        text: 'Position Overview',
        value: 'OVERVIEW',
        content: <PositionExpandableContent
          sections={sections}
          form={form}
        />,
      }]}
    />
  );
};

PublishablePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  cycles: BID_CYCLES.isRequired,
};

export default PublishablePositionCard;
