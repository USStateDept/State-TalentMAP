import { useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import { sortBy, uniqBy } from 'lodash';
import { getDifferentials, getResult, renderSelectionList } from 'utilities';
import { BID_CYCLES, EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import { DEFAULT_TEXT, NO_BUREAU, NO_POSITION_NUMBER, NO_UPDATE_DATE } from 'Constants/SystemMessages';
import { Row } from 'Components/Layout';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import LanguageList from 'Components/LanguageList';
import PositionExpandableContent from 'Components/PositionExpandableContent';


const PublishablePositionCard = (
  { data, onEditModeSearch, onSubmit, disableEdit, filters },
) => {
  const pos = data?.position || data;

  const updateUser = getResult(pos, 'description.last_editing_user');
  const updateDate = getResult(pos, 'description.date_updated');
  const positionNumber = getResult(pos, 'position_number') || NO_POSITION_NUMBER;
  const bureau = getResult(pos, 'bureau_short_desc') || NO_BUREAU;

  // =============== Overview: View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: [
      { 'Position Number': data?.positionNumber || DEFAULT_TEXT },
      { 'Skill': data?.skill || DEFAULT_TEXT },
      { 'Position Title': data?.positionTitle || DEFAULT_TEXT },
    ],
    bodyPrimary: [
      { 'Bureau': data?.bureau || DEFAULT_TEXT },
      { 'Organization': data?.org || DEFAULT_TEXT },
      { 'Grade': data?.grade || DEFAULT_TEXT },
      { 'Status': data?.status || DEFAULT_TEXT },
      { 'Pay Plan': data?.payPlan || DEFAULT_TEXT },
      { 'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" /> },
    ],
    bodySecondary: [
      { 'Bid Cycle': data?.status || DEFAULT_TEXT },
      { 'TED': data?.status || DEFAULT_TEXT },
      { 'Incumbent': data?.status || DEFAULT_TEXT },
      { 'Tour of Duty': data?.status || DEFAULT_TEXT },
      { 'Pay Plan': '---' },
      { 'Functional Bureau': 'None Listed' },
      { 'Assignee': data?.status || DEFAULT_TEXT },
      { 'Post Differential | Danger Pay': getDifferentials(pos) },
    ],
    textarea: data?.positionDetails || 'No description.',
    metadata: [
      { 'Last Updated': (updateDate && updateUser) ? `${updateUser} ${updateDate}` : (updateDate || NO_UPDATE_DATE) },
    ],
    /* eslint-enable quote-props */
  };


  // =============== Overview: Edit Mode ===============

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 200,
    includeSelectAll: true,
    renderList: renderSelectionList,
    className: 'width-280',
  };

  const [status, setStatus] = useState({});
  const [exclude, setExclude] = useState(true);
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [textArea, setTextArea] = useState(pos?.description?.content || 'No description.');
  const [selectedFuncBureau, setSelectedFuncBureau] = useState('');
  const [overrideTOD, setOverrideTOD] = useState('');


  // TODO: will likely change during integration
  const filters$ = filters?.filters;
  const tods = filters$?.todFilters;
  const functionalBureaus = filters$.functionalBureauFilters;
  const statuses = filters$?.statusFilters;
  const statusOptions = uniqBy(sortBy(statuses, [(f) => f.description]), 'code');
  const cycles = filters?.filters?.cycleFilters;
  const cycleOptions = uniqBy(sortBy(cycles, [(f) => f.description]), 'code');


  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    // TODO: during integration, replace 7 with unique card identifier
    onEditModeSearch(editMode, 7);
  }, [editMode]);

  const onSubmitForm = () => {
    const editData = {
      posSeqNum: data?.posSeqNum,
      positionDetails: textArea,
      lastUpdatedUserID: data?.lastUpdatedUserID,
      lastUpdated: data?.lastUpdated,
    };
    onSubmit(editData);
  };

  const onCancelForm = () => {
    setStatus({});
    setExclude(true);
    setSelectedCycles([]);
    setTextArea(pos?.description?.content || 'No description.');
    setSelectedFuncBureau('');
    setOverrideTOD('');
  };

  const form = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Bureau': data?.bureau || DEFAULT_TEXT },
      { 'Organization': data?.org || DEFAULT_TEXT },
      { 'Grade': data?.grade || DEFAULT_TEXT },
      { 'Status': data?.status || DEFAULT_TEXT },
      { 'Pay Plan': data?.payPlan || DEFAULT_TEXT },
      { 'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" /> },
    ],
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
                    {s.description}
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
                    {t.description}
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
          <div className="publishable-position-cycles">{selectedCycles.map(a => a.description).join(', ')}</div>
        </div>
        <Picky
          {...pickyProps}
          placeholder="Choose Bid Cycle(s)"
          value={selectedCycles}
          options={cycleOptions}
          onChange={setSelectedCycles}
          valueKey="code"
          labelKey="description"
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
              {functionalBureaus.map(b => (
                <option value={b.code}>
                  {b.description}
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
      disableEdit,
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
  onSubmit: PropTypes.func,
  disableEdit: PropTypes.bool,
  filters: PropTypes.shape({
    filters: {},
  }).isRequired,
};

PublishablePositionCard.defaultProps = {
  onEditModeSearch: EMPTY_FUNCTION,
  onSubmit: EMPTY_FUNCTION,
  disableEdit: false,
};

export default PublishablePositionCard;
