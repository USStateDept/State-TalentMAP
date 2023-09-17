import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import Linkify from 'react-linkify';
import FA from 'react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import swal from '@sweetalert/with-react';
import { get } from 'lodash';
import shortid from 'shortid';
import { getResult, userHasPermissions } from 'utilities';
import { projectedVacancyEdit } from 'actions/projectedVacancy';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import { NO_TOUR_OF_DUTY, NO_USER_LISTED } from 'Constants/SystemMessages';
import TabbedCard from 'Components/TabbedCard';
import { Row } from 'Components/Layout';
import { Definition } from '../../../DefinitionList';

const dummyData = {
  id: 1,
  post: 'Abidjan, Cote Divoire',
  post_code: 'IV1000000',
  tod: '2 YRS (2 R & R)',
  r_point: 'Paris',
  cola: 25,
  differential_rate: 25,
  consumable_allowance: false,
  apo_fpo_dpo: false,
  danger_pay: null,
  snd: true,
  hds: true,
  unaccompanied_status: 'Fully Accompanied',
  housing_type: 'Government Owned/Leased',
  quarters: 'Furnished',
  school_year: 'Lorem ipsum',
  grade_adequater_education: 'Lorem ipsum',
  efm_employment_opportunities: 'Lorem ipsum',
  efm_issues: 'Lorem ipsum',
  medical: 'Lorem ipsum',
  remarks: 'Lorem ipsum',
};

const BiddingToolCard = ({ data }) => {
  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = !userHasPermissions(['superuser'], userProfile.permission_groups);

  const dispatch = useDispatch();
  console.log(data);
  const result = dummyData;

  // Start: fake temp data
  const bidSeasons = [
    'Winter 2010', 'Summer 2010', 'Winter 2011',
    'Summer 2011', 'Winter 2012', 'Summer 2012',
    'Winter 2013', 'Summer 2013', 'Winter 2014',
    'Summer 2014', 'Winter 2015', 'Summer 2015',
    'Winter 2016', 'Summer 2016', 'Winter 2017',
    'Summer 2017', 'Winter 2018', 'Summer 2018',
    'Winter 2019', 'Summer 2019', 'Winter 2020',
    'Summer 2020', 'Winter 2021', 'Summer 2021',
    'Winter 2022', 'Summer 2022', 'Winter 2023',
    'Summer 2023', 'Winter 2024', 'Summer 2024',
    'Winter 2025', 'Summer 2025', 'Winter 2026',
    'Summer 2026', 'Winter 2027', 'Summer 2027',
    'Winter 2028', 'Summer 2028', 'Winter 2029',
    'Summer 2029', 'Winter 2030', 'Summer 2030',
    'Winter 2031', 'Summer 2031', 'Winter 2032',
    'Summer 2032', 'Winter 2033', 'Summer 2033',
    'Winter 2034', 'Summer 2034',
  ];
  const bidSeasons$ = bidSeasons.map((b, i) => ({ code: i + 1, name: b }));
  const statusOptions = [
    { code: 1, name: 'Active' },
    { code: 2, name: 'Inactive' },
  ];
  const languageOffset = [
    { code: 1, name: '1 Month' },
    { code: 2, name: '2 Months' },
    { code: 3, name: '3 Months' },
    { code: 4, name: '4 Months' },
    { code: 5, name: '5 Months' },
    { code: 6, name: '6 Months' },
    { code: 7, name: '12 Months' },
    { code: 8, name: '18 Months' },
    { code: 9, name: '24 Months' },
    { code: 10, name: '30 Months' },
    { code: 11, name: '36 Months' },
  ];
  // End: fake temp data

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const pos = get(result, 'position') || result;

  // initial states will need to pull from "pos" once we've determined the ref data structure
  // if included defaults to true, is this something that will never be saved beyond local state?
  const [season, setSeason] = useState();
  const [status, setStatus] = useState();
  const [overrideTED, setOverrideTED] = useState();
  const [langOffsetSummer, setLangOffsetSummer] = useState();
  const [langOffsetWinter, setLangOffsetWinter] = useState();
  const [schoolYear, setSchoolYear] = useState(pos?.description?.content || 'No description.');

  const [editMode, setEditMode] = useState(false);
  const onCancelForm = () => {
    // this is likely not going to be needed, as we should be
    // re-reading from "pos" when we open Edit Form back up
    // clear will need to set states back to the pull
    // from "pos" once we've determined the ref data structure
    setSeason(null);
    setStatus(null);
    setOverrideTED(null);
    setLangOffsetSummer(null);
    setLangOffsetWinter(null);
    setSchoolYear(pos?.description?.content || 'No description.');
  };

  /* eslint-disable quote-props */
  const sections = [
    { 'TOD': pos?.tod ?? NO_USER_LISTED },
    { 'R & R Point': pos?.r_point ?? NO_USER_LISTED },
    { 'COLA': pos?.cola },
    { 'Differential Rate': pos?.differential_rate || NO_TOUR_OF_DUTY },
    { 'Consumable Allowance': pos?.consumable_allowance ? 'Yes' : 'No' },
    { 'APO/FPO/DPO': pos?.apo_fpo_dpo ? 'Yes' : 'No' },
    { 'Danger Pay': pos?.danger_pay || NO_TOUR_OF_DUTY },
    { 'SND': pos?.snd ? 'Yes' : 'No' },
    { 'HDS': pos?.hds ? 'Yes' : 'No' },
    { 'Unaccompanied Status': pos?.unaccompanied_status || NO_TOUR_OF_DUTY },
    { 'Housing Type': pos?.housing_type || NO_TOUR_OF_DUTY },
    { 'Quarters': pos?.quarters || NO_TOUR_OF_DUTY },
  ];
  const textAreas = [{
    label: 'School Year',
    name: 'school-year',
    value: pos?.school_year,
  }, {
    label: 'Grade, Adequater Education at Post',
    name: 'grade-adequater',
    value: pos?.grade_adequater_education,
  }, {
    label: 'EFM Employment Opportunities',
    name: 'efm-employment-opportunities',
    value: pos?.efm_employment_opportunities,
  }, {
    label: 'EFM Issues',
    name: 'efm-issues',
    value: pos?.efm_issues,
  }, {
    label: 'Medical',
    name: 'medical',
    value: pos?.medical,
  }, {
    label: 'Remarks',
    name: 'remarks',
    value: pos?.remarks,
  }];
  /* eslint-enable quote-props */

  const onCancel = () => {
    onCancelForm();
    if (setEditMode) setEditMode(false);
    swal.close();
  };

  const showCancelModal = () => {
    swal({
      title: 'Confirm Discard Changes',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>Are you sure you want to discard all changes made to this Bidding Tool?</span>
          </div>
          <div className="modal-controls">
            <button onClick={onCancel}>Submit</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>Cancel</button>
          </div>
        </div>
      ),
    });
  };

  const readView = (
    <div>
      <Row fluid className="position-content--section position-content--subheader">
        <div className="line-separated-fields">
          <div>
            <span>Post/Country/Code:</span>
            <span>{getResult(pos, 'post')}, {getResult(pos, 'post_code')}</span>
          </div>
        </div>
        {(!isSuperUser && !editMode) &&
          <button className="toggle-edit-mode" onClick={() => setEditMode(!editMode)}>
            <FA name="pencil" />
            <div>Edit</div>
          </button>
        }
      </Row>
      <Row fluid className="position-content--section position-content--details">
        <dl className="definitions">
          {sections.map(item => {
            const key = Object.keys(item)[0];
            return (
              <Definition
                key={shortid.generate()}
                term={key}
                definition={item[key]}
                excludeColon
              />
            );
          })}
        </dl>
      </Row>
      <div>
        {textAreas.map(t => (
          <Row fluid className="position-content--description">
            <span className="definition-title">{t.label}</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name={t.name}
                placeholder="No Description"
                defaultValue={t.value}
                disabled
                className="disabled-input"
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {schoolYear.length} / 4,000
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
  const editView = (
    <div>
      <div className="position-form">
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="status">Bid Season</label>
            <select
              id="season"
              defaultValue={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              {
                bidSeasons$.map(b => (
                  <option value={b.code}>{b.name}</option>
                ))
              }
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {
                statusOptions.map(b => (
                  <option value={b.code}>{b.name}</option>
                ))
              }
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
            <label htmlFor="status">Language Offset Summer</label>
            <select
              id="langOffsetSummer"
              defaultValue={langOffsetSummer}
              onChange={(e) => setLangOffsetSummer(e.target.value)}
            >
              {
                languageOffset.map(b => (
                  <option value={b.code}>{b.name}</option>
                ))
              }
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="status">Language Offset Winter</label>
            <select
              id="langOffsetWinter"
              defaultValue={langOffsetWinter}
              onChange={(e) => setLangOffsetWinter(e.target.value)}
            >
              {
                languageOffset.map(b => (
                  <option value={b.code}>{b.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Position Details</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="position-description"
                placeholder="No Description"
                defaultValue={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {schoolYear.length} / 4,000
            </div>
          </Row>
        </div>
      </div>
      <div className="position-form--actions">
        <button onClick={showCancelModal}>Cancel</button>
        <button onClick={() => dispatch(projectedVacancyEdit(5, {}))}>Save</button>
      </div>
    </div>
  );

  return (
    <TabbedCard
      tabs={[{
        text: 'Bidding Tool Overview',
        value: 'OVERVIEW',
        content: (
          <div className="position-content--container">
            <div className="position-content">
              {editMode ? editView : readView}
            </div>
          </div >
        ),
      }]}
    />
  );
};

BiddingToolCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
};

BiddingToolCard.defaultProps = {
};

export default BiddingToolCard;
