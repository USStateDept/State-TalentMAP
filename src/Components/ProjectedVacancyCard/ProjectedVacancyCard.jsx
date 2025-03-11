import { useEffect, useRef, useState } from 'react';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';
import { Tooltip } from 'react-tippy';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import { useDidMountEffect } from 'hooks';
import { formatDate } from 'utilities';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  DEFAULT_TEXT, NO_BUREAU, NO_LANGUAGES, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE,
  NO_POST, NO_SKILL, NO_STATUS, NO_TOUR_END_DATE, NO_TOUR_OF_DUTY, NO_UPDATE_DATE,
} from 'Constants/SystemMessages';
import { Row } from 'Components/Layout';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import PositionExpandableContent from 'Components/PositionExpandableContent';

const enableCycleImport = () => checkFlag('flags.projected_vacancy_cycle_import');

const ProjectedVacancyCard = (props) => {
  const {
    result,
    updateIncluded,
    updateImport,
    disableImport,
    disableEdit,
    isBureau,
    onEditModeSearch,
    onSubmit,
    selectOptions,
  } = props;

  const id = result?.fvseqnum || undefined;

  const bidSeasons = selectOptions?.bidSeasons?.length ? selectOptions.bidSeasons : [];
  const statuses = selectOptions?.statuses?.length ? selectOptions.statuses : [];

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const [cycleImport, setCycleImport] = useState(result?.fvexclimportind === 'N');
  const [included, setIncluded] = useState(result?.fvexclimportind);
  const [season, setSeason] = useState(result?.fvbsnid);
  const [status, setStatus] = useState(result?.fvscode);
  const [overrideTED, setOverrideTED] =
    useState(
      result?.fvoverrideteddate ?
        new Date(result.fvoverrideteddate) :
        null,
    );
  const [textArea, setTextArea] = useState(result?.fvcommenttxt || '');

  // const differentials = {
  //   post: {
  //     danger_pay: result?.bidding_tool_danger_rate_number,
  //     differential_rate: result?.bidding_tool_differential_rate_number,
  //     post_bidding_considerations_url: result?.obc_url,
  //   },
  // };

  useDidMountEffect(() => {
    updateIncluded(id, included);
  }, [included]);

  useDidMountEffect(() => {
    updateImport(id, cycleImport);
  }, [cycleImport]);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    onEditModeSearch(editMode, id);
    setCycleImport(result?.fvexclimportind === 'N');
    setIncluded(result?.fvexclimportind);
    setSeason(result?.fvbsnid);
    setStatus(result?.fvscode);
    setTextArea(result?.fvcommenttxt || '');
    setOverrideTED(
      result?.fvoverrideteddate ?
        new Date(result.fvoverrideteddate) :
        null,
    );
  }, [editMode]);

  useEffect(() => {
    if (!disableEdit) {
      setCycleImport(result?.fvexclimportind === 'N');
    }
  }, [disableEdit]);

  const onSubmitForm = () => {
    const editData = {
      ...result,
      fvexclimportind: included,
      fvbsnid: season,
      fvfvscode: status,
      fvoverrideteddate: overrideTED ?
        overrideTED.toISOString().substring(0, 10) : null,
      fvcommenttxt: textArea,
    };
    onSubmit(editData, setEditMode(false));
  };

  const displayTedEmp = (ted, employee) => {
    if (!ted) {
      if (!employee) {
        return NO_TOUR_END_DATE;
      }
      return employee;
    }
    return `${formatDate(ted)} ${employee}`;
  };

  const displayLangs = () => {
    let displayText = '';
    const langs = result?.pospositionlangprofdesc?.split(';');
    if (langs && langs.length) {
      langs.forEach((lang, i) => {
        const langCodeAttr = `poslanguage${i + 1}code`;
        const langCode = result?.[langCodeAttr] || undefined;
        if (langCode) {
          displayText += lang.replace(' ', ` (${langCode}) `);
        } else {
          displayText += lang;
        }
      });
    }
    return displayText || NO_LANGUAGES;
  };

  // All cards have a Bureau field + Functional Bureau field if it exists
  const funcBureau = result?.pabbureaudesc;
  const bureauFields = [{ 'Bureau': result?.posbureaushortdesc || NO_BUREAU }];
  if (funcBureau) {
    bureauFields.push({ 'Functional Bureau': funcBureau });
  }
  const sections = {
    subheading: [
      { 'Position Number': result?.posnumtext || NO_POSITION_NUMBER },
      { 'Skill': result?.posskillcode || NO_SKILL },
      { 'Position Title': result?.postitledesc || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      {
        'Assignee TED': displayTedEmp(
          result?.assigneeAssignment[0]?.asgdetdteddate,
          result?.assigneeAssignment[0]?.perpiifullname,
        ),
      },
      {
        'Incumbent TED': displayTedEmp(
          result?.incumbentAssignment[0]?.asgdetdteddate,
          result?.incumbentAssignment[0]?.perpiifullname,
        ),
      },
      { 'Bid Season': result?.bsndescrtext || DEFAULT_TEXT },
      { 'Tour of Duty': result?.assigneeAssignment[0]?.toddesctext || NO_TOUR_OF_DUTY },
      { 'Languages': displayLangs() },
      { 'Included': result?.fvexclimportind === 'Y' ? 'Yes' : 'No' },
      ...bureauFields,
      { 'Location': result?.poslocationcode || NO_POST },
      { 'Status': result?.fvsdescrtxt || NO_STATUS },
      { 'Organization': result?.posorgshortdesc || NO_ORG },
      { 'TED': formatDate(result?.fvoverrideteddate) || NO_TOUR_END_DATE },
      { 'PP/Grade': result?.combinedppgrade },
    ],
    bodySecondary: [
    ],
    textarea: result?.fvcommenttxt || 'No description.',
    metadata: [
      { 'Last Updated': formatDate(result?.fvupdatedate) || NO_UPDATE_DATE },
    ],
  };
  const form = {
    staticBody: [
      {
        'Assignee TED': displayTedEmp(
          result?.assigneeAssignment[0]?.asgdetdteddate,
          result?.assigneeAssignment[0]?.perpiifullname,
        ),
      },
      {
        'Incumbent TED': displayTedEmp(
          result?.incumbentAssignment[0]?.asgdetdteddate,
          result?.incumbentAssignment[0]?.perpiifullname,
        ),
      },
      { 'Tour of Duty': result?.assigneeAssignment[0]?.toddesctext || NO_TOUR_OF_DUTY },
      { 'Languages': displayLangs() },
      ...bureauFields,
      { 'Location': result?.poslocationcode || NO_POST },
      { 'Organization': result?.posorgshortdesc || NO_ORG },
      { 'PP/Grade': result?.combinedppgrade },
      // { 'Post Differential | Danger Pay': getDifferentials(differentials) },
    ],
    inputBody: <div className="position-form">
      <div className="position-form--inputs">
        <div className="position-form--label-input-container">
          <label htmlFor="season">Bid Season</label>
          <select
            id="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            {bidSeasons?.map(b => (
              <option key={b.code} value={b.code}>{b.description}</option>
            ))}
          </select>
        </div>
        <div className="position-form--label-input-container">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses?.map(b => (
              <option key={b.code} value={b.code}>{b.description}</option>
            ))}
          </select>
        </div>
        <div className="position-form--label-input-container">
          <label htmlFor="overrideTED">Override TED <small>(optional)</small></label>
          <div className="date-wrapper-react larger-date-picker">
            <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
            <FA name="times" className={`${overrideTED ? '' : 'hide'}`} onClick={() => setOverrideTED(null)} />
            <DatePicker
              selected={overrideTED}
              onChange={setOverrideTED}
              dateFormat="MM/dd/yyyy"
              placeholderText={'MM/DD/YYY'}
              ref={datePickerRef}
            />
          </div>
        </div>
        <div className="position-form--label-input-container">
          <label htmlFor="Included">Included</label>
          <select
            id="included"
            value={included}
            onChange={(e) => setIncluded(e.target.value)}
          >
            <option value={''} />
            <option value={'Y'}>Yes</option>
            <option value={'N'}>No</option>
          </select>
        </div>
      </div>
      <div className="position-form--label-input-container">
        <Row fluid className="position-form--description">
          <span className="definition-title">Comment</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={6}
              minRows={6}
              maxLength="200"
              name="comment"
              placeholder="No Comment"
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {textArea.length} / 200
          </div>
        </Row>
      </div>
    </div>,
    cancelText: 'Are you sure you want to discard all changes made to this Projected Vacancy position?',
    handleSubmit: onSubmitForm,
    handleCancel: () => { },
    handleEdit: {
      editMode,
      setEditMode,
      disableEdit,
    },
  };
  /* eslint-enable quote-props */

  const importCheckbox = (
    <CheckBox
      id={`imported-checkbox-${id}`}
      label="Import to Cycle"
      // TODO: Add cycle name to label
      value={cycleImport}
      onCheckBoxClick={() => setCycleImport(!cycleImport)}
      disabled={disableImport}
    />
  );

  return (
    <TabbedCard
      tabs={[{
        text: 'Projected Vacancy Overview',
        value: 'OVERVIEW',
        content: (
          <div className="position-content--container">
            <PositionExpandableContent
              sections={sections}
              form={form}
              tempHideEdit={!isBureau}
            />
            {enableCycleImport() && (!disableImport ? importCheckbox :
              <div className="toggle-include">
                <Tooltip
                  title="AO users must select a Cycle filter and cancel other edit drafts before attempting to edit the import selections."
                  arrow
                >
                  {importCheckbox}
                </Tooltip>
              </div>
            )}
          </div>
        ),
      }]}
    />
  );
};

ProjectedVacancyCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  updateIncluded: PropTypes.func,
  updateImport: PropTypes.func,
  disableImport: PropTypes.bool,
  disableEdit: PropTypes.bool,
  isBureau: PropTypes.bool,
  onEditModeSearch: PropTypes.func,
  onSubmit: PropTypes.func,
  selectOptions: PropTypes.shape({
    bidSeasons: PropTypes.arrayOf(PropTypes.shape({})),
    statuses: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

ProjectedVacancyCard.defaultProps = {
  updateIncluded: EMPTY_FUNCTION,
  updateImport: EMPTY_FUNCTION,
  disableImport: false,
  disableEdit: false,
  isBureau: false,
  onEditModeSearch: EMPTY_FUNCTION,
  onSubmit: EMPTY_FUNCTION,
  selectOptions: {
    bidSeasons: [],
    statuses: [],
  },
};

export default ProjectedVacancyCard;
