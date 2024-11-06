import { useEffect, useRef, useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { BID_CYCLES, EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import { formatLang, renderSelectionList } from 'utilities';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import { Row } from 'Components/Layout';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import { checkFlag } from '../../flags';
import PositionClassification from './PositionClassification/PositionClassification';

const PP_CLASSIFICATIONS_FLAG = () => checkFlag('flags.publishable_positions_classifications');
const PP_FLAG = () => checkFlag('flags.publishable_positions_additional');
const DETO_RWA_FLAG = () => checkFlag('flags.deto_rwa');

const hardcodedFilters = {
  statusFilters: [{ code: 'N', description: 'Not Publishable' }, { code: 'P', description: 'Publishable' }, { code: 'V', description: 'Vet' }],
  cycleFilters: [{ code: 1, description: '2010 Winter' }, { code: 2, description: '2007 Fall' }, { code: 3, description: '2009 Spring' }],
  todFilters: [{ code: 1, description: '' }, { code: 2, description: 'OTHER' }, { code: 3, description: 'INDEFINITE' }],
  functionalBureauFilters: [{ code: 1, description: '' }, { code: 2, description: 'bureau' }, { code: 3, description: 'bureau' }],
};

const PublishablePositionCard = ({
  data, onEditModeSearch, onSubmit, disableEdit, disableEditDetails,
  additionalCallsLoading, onShowMorePP, hideClassifications }) => {
  // =============== Overview: View Mode ===============

  // !!!!
  // once we integrate with these, we'll want to update
  // the Export to show and grab the new values
  // !!!!
  const additionalRO = [
    { TED: data?.status || DEFAULT_TEXT },
    { Incumbent: data?.status || DEFAULT_TEXT },
    { 'Default TOD': data?.status || DEFAULT_TEXT },
    { Assignee: data?.status || DEFAULT_TEXT },
    // read comment above
    { 'Post Differential | Danger Pay': data?.status || DEFAULT_TEXT },
    { 'Employee ID': data?.status || DEFAULT_TEXT },
    { 'Employee Status': data?.status || DEFAULT_TEXT },
  ];

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
      { 'PP/Grade': data?.combinedPPGrade },
      { 'Publishable Status': data?.psDesc || DEFAULT_TEXT },
      { 'Languages': formatLang(data?.languages) || DEFAULT_TEXT },
    ],
    bodySecondary: PP_FLAG() ?
      [
        { 'Bid Cycle': data?.status || DEFAULT_TEXT },
        ...additionalRO,
      ]
      : [],
    textarea: data?.positionDetails || 'No description.',
    metadata: [
      { 'Capsule Last Updated': data?.positionDetailsLastUpdated },
    ],
    /* eslint-enable quote-props */
  };
  if (DETO_RWA_FLAG()) {
    sections.bodyPrimary.push({ 'RWA/DETO Eligible': data?.availTeleworkPos ? 'Eligible' : 'Not Eligible' });
  }

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
  const [status, setStatus] = useState(data?.psCD || '');
  const [exclude, setExclude] = useState(data?.posAuditExclusionInd === 'Y');
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [selectedFuncBureau, setSelectedFuncBureau] = useState('');
  const [overrideTOD, setOverrideTOD] = useState('');
  const [ppDate, setPpDate] = useState('');


  const [textArea, setTextArea] = useState(data?.positionDetails || 'No description.');
  const [editMode, setEditMode] = useState(false);
  const [classificationsEditMode, setClassificationsEditMode] = useState(false);

  useEffect(() => {
    onEditModeSearch(editMode || classificationsEditMode);
  }, [editMode, classificationsEditMode]);

  const onSubmitForm = () => {
    const exclInd = exclude ? 'Y' : 'N';
    const currTimestamp = new Date().toISOString();
    const editData = {
      aptSeqNum: data?.aptSeqNum,
      posSeqNum: data?.posSeqNum,

      psCD: disableEditDetails ? data?.psCD : status,
      posAuditExclusionInd: disableEditDetails ? data?.posAuditExclusionInd : exclInd,

      createdUserID: data?.pposcreateuserid,
      created: data?.ORIGpposcreatetmsmpdt?.replace(/T/g, ' '),
      lastUpdatedUserID: data?.positionLastUpdatedUserID,
      lastUpdated: data?.ORIGpositionLastUpdated?.replace(/T/g, ' '),

      positionDetails: textArea,
      positionDetailsLastUpdated: textArea === data?.positionDetails ?
        data?.ORIGpositionDetailsLastUpdated?.replace(/T/g, ' ') :
        currTimestamp.replace(/T/g, ' ').substring(0, currTimestamp.length - 5),
    };
    onSubmit(editData);
  };

  const onCancelForm = () => {
    setStatus('');
    setExclude(true);
    setSelectedCycles([]);
    setTextArea(data?.positionDetails || 'No description.');
    setSelectedFuncBureau('');
    setOverrideTOD('');
    setPpDate('');
  };

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const form = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Bureau': data?.bureau || DEFAULT_TEXT },
      { 'Organization': data?.org || DEFAULT_TEXT },
      { 'PP/Grade': data?.combinedPPGrade },
      { 'Language': formatLang(data?.languages) || DEFAULT_TEXT },
    ],
    inputBody: (
      <div className="position-form">
        <div className="spaced-row">
          <div className="dropdown-container">
            <div className="position-form--input">
              <label htmlFor="publishable-position-statuses">Publishable Status</label>
              <select
                disabled={disableEditDetails}
                className="publishable-position-inputs"
                id="publishable-position-statuses"
                value={status}
                onChange={(e) => setStatus(e?.target.value)}
              >
                {hardcodedFilters.statusFilters.map(s => (
                  <option key={s.code} value={s.code}>
                    {s.description}
                  </option>
                ))}
              </select>
            </div>
            {PP_FLAG() &&
              <div className="position-form--input">
                <label htmlFor="publishable-pos-tod-override">Override Position TOD</label>
                <select
                  className="publishable-position-inputs"
                  id="publishable-pos-tod-override"
                  defaultValue={overrideTOD}
                  onChange={(e) => setOverrideTOD(e?.target.value)}
                >
                  {hardcodedFilters.todFilters.map(t => (
                    <option key={t.code} value={t.code}>
                      {t.description}
                    </option>
                  ))}
                </select>
              </div>
            }
          </div>
          <div>
            <CheckBox
              id="exclude-checkbox"
              label="Exclude Position from Bid Audit"
              value={exclude}
              disabled={disableEditDetails}
              onCheckBoxClick={e => setExclude(e)}
            />
            {DETO_RWA_FLAG() &&
              <Tooltip title="Eligibility can be modified in GEMS, contact your HRO to make changes.">
                <CheckBox
                  id="deto-checkbox"
                  label="RWA/DETO Eligible"
                  value={data?.deto_rwa || false}
                  onCheckBoxClick={() => { }}
                  disabled
                />
              </Tooltip>
            }
          </div>
        </div>
        <div>
          <Row fluid className="position-form--description">
            <span className="definition-title">Position Details</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxLength="2000"
                name="position-description"
                placeholder="No Description"
                defaultValue={textArea}
                onChange={(e) => setTextArea(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {textArea.length} / 2000
            </div>
          </Row>
        </div>
        {PP_FLAG() &&
          <>
            <div className="content-divider" />
            <div className="position-form--heading">
              <span className="title">Proposed Cycle</span>
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
              options={hardcodedFilters.cycleFilters}
              onChange={setSelectedCycles}
              valueKey="code"
              labelKey="description"
            />
            <div className="position-form--label-input-container">
              <label htmlFor="status">Position TED</label>
              <div className="date-wrapper-react larger-date-picker">
                <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
                <FA name="times" className={`${ppDate ? '' : 'hide'}`} onClick={() => setPpDate(null)} />
                <DatePicker
                  id={'pp-date'}
                  selected={ppDate}
                  onChange={setPpDate}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  ref={datePickerRef}
                />
              </div>
            </div>
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
                  {hardcodedFilters.functionalBureauFilters.map(b => (
                    <option key={b.code} value={b.code}>
                      {b.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        }
      </div >
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

  if (PP_FLAG()) {
    form.staticBody.push(...additionalRO);
  }

  return (
    <TabbedCard
      tabs={[{
        text: 'Position Overview',
        value: 'OVERVIEW',
        content: <PositionExpandableContent
          sections={sections}
          form={form}
          appendAdditionalFieldsToBodyPrimary={false}
          showLoadingAnimation={additionalCallsLoading}
          onShowMore={(e) => onShowMorePP(e)}
        />,
        disabled: classificationsEditMode,
      }, (PP_CLASSIFICATIONS_FLAG() && !hideClassifications) ? {
        text: 'Position Classification',
        value: 'CLASSIFICATION',
        content: <PositionClassification
          positionNumber={data?.positionNumber}
          bureau={data?.bureau || DEFAULT_TEXT}
          posSeqNum={data?.posSeqNum}
          editMode={classificationsEditMode}
          setEditMode={setClassificationsEditMode}
          disableEdit={disableEdit}
        />,
        disabled: editMode,
      } : {},
      ]}
    />
  );
};

PublishablePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  cycles: BID_CYCLES.isRequired,
  onEditModeSearch: PropTypes.func,
  onSubmit: PropTypes.func,
  disableEditDetails: PropTypes.bool,
  disableEdit: PropTypes.bool,
  additionalCallsLoading: PropTypes.bool,
  filters: PropTypes.shape({
    filters: PropTypes.shape({}),
  }).isRequired,
  onShowMorePP: PropTypes.func,
  hideClassifications: PropTypes.bool,
};

PublishablePositionCard.defaultProps = {
  onEditModeSearch: EMPTY_FUNCTION,
  onSubmit: EMPTY_FUNCTION,
  disableEditDetails: false,
  disableEdit: false,
  additionalCallsLoading: false,
  onShowMorePP: EMPTY_FUNCTION,
  hideClassifications: false,
};

export default PublishablePositionCard;
