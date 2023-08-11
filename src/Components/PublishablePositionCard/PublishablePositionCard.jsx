import { useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import Picky from 'react-picky';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getDifferentials, getPostName, getResult } from 'utilities';
import { BID_CYCLES, EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
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


const PublishablePositionCard = ({ data, cycles, onEditModeSearch }) => {
  const pos = data?.position || data;

  const updateUser = getResult(pos, 'description.last_editing_user');
  const updateDate = getResult(pos, 'description.date_updated');
  const positionNumber = getResult(pos, 'position_number') || NO_POSITION_NUMBER;
  const bureau = getResult(pos, 'bureau_short_desc') || NO_BUREAU;

  // =============== Overview: View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: {
      'Position Number': positionNumber,
      'Skill': getResult(pos, 'skill_code') || NO_SKILL,
      'Position Title': getResult(pos, 'title') || NO_POSITION_TITLE,
    },
    bodyPrimary: {
      'Bureau': bureau,
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
      'Functional Bureau': 'None Listed',
      'Post Differential | Danger Pay': getDifferentials(pos),
    },
    textarea: pos?.description?.content || 'No description.',
    metadata: {
      'Last Updated': (updateDate && updateUser) ? `${updateUser} ${updateDate}` : (updateDate || NO_UPDATE_DATE),
    },
    /* eslint-enable quote-props */
  };


  // =============== Overview: Edit Mode ===============

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
  const [selectedFuncBureau, setSelectedFuncBureau] = useState('');
  const [overrideTOD, setOverrideTOD] = useState('');

  const filters = useSelector(state => state.filters);
  const filters$ = filters?.filters;
  const tods = filters$.find(f => f.item.description === 'tod').data;
  const functionalBureaus = filters$.find(f => f.item.description === 'functionalRegion');
  const functionalBureaus$ = functionalBureaus.data.filter(b => !b.is_regional);

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    // TODO: during integration, replace 7 with unique card identifier
    onEditModeSearch(editMode, 7);
  }, [editMode]);

  const onSubmitForm = () => {
    console.log('submit');
  };

  const onCancelForm = () => {
    // this is likely not going to be needed, as we should be
    // re-reading from "pos" when we open Edit Form back up
    // clear will need to set states back to the pull
    // from "pos" once we've determined the ref data structure
    console.log('cancel');
  };

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
      'Functional Bureau': 'None Listed',
      'Post Differential | Danger Pay': getDifferentials(pos),
    },
    inputBody: (
      <div className="position-form">
        <div className="spaced-row">
          <div className="dropdown-container">
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
            <div className="position-form--input">
              <label htmlFor="publishable-pos-tod-override">Override Tour of Duty</label>
              <select
                id="publishable-pos-tod-override"
                defaultValue={overrideTOD}
                onChange={(e) => setOverrideTOD(e?.target.value)}
              >
                {tods.map(t => (
                  <option value={t.code}>
                    {t.long_description}
                  </option>
                ))}
              </select>
            </div>
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
        <div className="pt-20">
          <div className="content-divider" />
          <div className="position-form--heading">
            <span className="title">Add a Functional Bureau</span>
            <span className="subtitle">Add a Functional Bureau to this Position</span>
          </div>
          <div className="position-form--input">
            <label htmlFor="publishable-pos-func-bureaus">Bureau</label>
            <select
              id="publishable-pos-func-bureaus"
              defaultValue={selectedFuncBureau}
              onChange={(e) => setSelectedFuncBureau(e?.target.value)}
            >
              {functionalBureaus$.map(b => (
                <option value={b.code}>
                  {b.long_description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    ),
    handleSubmit: onSubmitForm,
    handleCancel: onCancelForm,
    handleEdit: {
      editMode,
      setEditMode,
    },
    /* eslint-enable quote-props */
  };

  // =============== Classification ===============

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (data.position) {
      setFormData(data.position?.classifications);
    }
  }, [data]);

  const handleSelection = (id) => {
    const newFormData = formData.map(o => {
      if (o.id === id) {
        return {
          ...o,
          value: !o.value,
        };
      }
      return o;
    });
    setFormData(newFormData);
  };

  const classificationTable = () => (
    <div className="position-classifications">
      <div className="line-separated-fields">
        <div>
          <span>Position:</span>
          <span>{bureau} {positionNumber}</span>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {formData.map((o) => (
                <th key={o.id}>{o.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {formData.map((o) => (
                <td key={o.label}>
                  <input
                    type="checkbox"
                    name={`${o.id}`}
                    checked={o.value}
                    onChange={() => handleSelection(o.id)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="position-classifications--actions">
        <button onClick={form.handleSubmit}>Save</button>
      </div>
    </div>
  );

  return (
    <TabbedCard
      tabs={[{
        text: 'Position Overview',
        value: 'OVERVIEW',
        content: <PositionExpandableContent
          sections={sections}
          form={form}
        />,
      }, {
        text: 'Position Classification',
        value: 'CLASSIFICATION',
        content: classificationTable(),
        disabled: editMode,
      }]}
    />
  );
};

PublishablePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  cycles: BID_CYCLES.isRequired,
  onEditModeSearch: PropTypes.func,
};

PublishablePositionCard.defaultProps = {
  onEditModeSearch: EMPTY_FUNCTION,
};

export default PublishablePositionCard;
