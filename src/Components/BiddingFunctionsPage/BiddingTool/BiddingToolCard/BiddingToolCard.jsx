import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Linkify from 'react-linkify';
import FA from 'react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import swal from '@sweetalert/with-react';
import shortid from 'shortid';
import { getResult, userHasPermissions } from 'utilities';
import TabbedCard from 'Components/TabbedCard';
import { Row } from 'Components/Layout';
import { Definition } from '../../../DefinitionList';
import { biddingTool, biddingToolCreate, biddingToolEdit } from '../../../../actions/biddingTool';
import Spinner from '../../../Spinner/Spinner';
import CheckBox from '../../../CheckBox/CheckBox';
import { Link } from 'react-router-dom';


const BiddingToolCard = (props) => {
  const { id } = props;
  const isCreate = id === 'new';

  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = !userHasPermissions(['superuser'], userProfile.permission_groups);

  const result = useSelector(state => state.biddingTool);
  const resultIsLoading = useSelector(state => state.biddingToolFetchDataLoading);

  useEffect(() => {
    dispatch(biddingTool());
  }, []);

  const [editMode, setEditMode] = useState(false);

  // ========================== VIEW MODE ==========================

  /* eslint-disable quote-props */
  const sections = [
    { 'TOD': result?.tod || '' },
    { 'R & R Point': result?.rr_point || '' },
    { 'COLA': result?.cola },
    { 'Differential Rate': result?.differential_rate || '' },
    { 'Consumable Allowance': result?.consumable_allowance ? 'Yes' : 'No' },
    { 'APO/FPO/DPO': result?.apo_fpo_dpo ? 'Yes' : 'No' },
    { 'Danger Pay': result?.danger_pay || '' },
    { 'SND': result?.snd ? 'Yes' : 'No' },
    { 'HDS': result?.hds ? 'Yes' : 'No' },
    { 'Unaccompanied Status': result?.unaccompanied_status || '' },
    { 'Housing Type': result?.housing_type || '' },
    { 'Quarters': result?.quarters || '' },
  ];
  const textAreas = [{
    label: 'School Year',
    name: 'school-year',
    value: result?.school_year,
  }, {
    label: 'Grade, Adequater Education at Post',
    name: 'grade-adequater',
    value: result?.grade_adequater_education,
  }, {
    label: 'EFM Employment Opportunities',
    name: 'efm-employment-opportunities',
    value: result?.efm_employment_opportunities,
  }, {
    label: 'EFM Issues',
    name: 'efm-issues',
    value: result?.efm_issues,
  }, {
    label: 'Medical',
    name: 'medical',
    value: result?.medical,
  }, {
    label: 'Remarks',
    name: 'remarks',
    value: result?.remarks,
  }];
  /* eslint-enable quote-props */

  const readView = (
    <div>
      <Row fluid className="position-content--section position-content--subheader">
        <div className="line-separated-fields">
          <div>
            <span>Post/Country/Code:</span>
            <span>{getResult(result, 'post')}, {getResult(result, 'post_code')}</span>
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
              {t.value?.length} / 4,000
            </div>
          </Row>
        ))}
      </div>
      <div className="position-form--actions">
        <Link to="/profile/biddingfunctions/biddingtool/">Back</Link>
      </div>
    </div>
  );

  // ========================== EDIT MODE ==========================

  // Start: fake temp data
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

  const [gsaLocation, setGsaLocation] = useState();
  const [status, setStatus] = useState();
  const [hds, setHds] = useState();
  const [tod, setTod] = useState();
  const [rrPoint, setRrPoint] = useState();
  const [unaccompaniedStatus, setUnaccompaniedStatus] = useState();
  const [apoFpoDpo, setApoFpoDpo] = useState();
  const [cola, setCola] = useState();
  const [differentialRate, setDifferentialRate] = useState();
  const [dangerPay, setDangerPay] = useState();
  const [medical, setMedical] = useState('');
  const [remarks, setRemarks] = useState('');
  const [climateZone, setClimateZone] = useState();
  const [consumableAllowance, setConsumableAllowance] = useState();
  const [fmFpAccepted, setFmFpAccepted] = useState();
  const [housingType, setHousingType] = useState();
  const [qtrsType, setQtrsType] = useState();
  const [quartersRemark, setQuartersRemark] = useState('');
  const [specialShipAllow, setSpecialShipAllow] = useState('');
  const [schoolYearText, setSchoolYearText] = useState('');
  const [edGradesAtPost, setEdGradesAtPost] = useState('');
  const [employmentOpportunities, setEmploymentOpportunities] = useState('');
  const [efmIssues, setEfmIssues] = useState('');
  const [missionEfmEmp, setMissionEfmEmp] = useState();
  const [outsideEfmEmp, setOutsideEfmEmp] = useState();

  useEffect(() => {
    if (editMode) {
      setGsaLocation(result?.gsa_location ?? '');
      setStatus(result?.status ?? '');
      setHds(result?.hds);
      setTod(result?.tod ?? '');
      setRrPoint(result?.rr_point ?? '');
      setUnaccompaniedStatus(result?.unaccompanied_status ?? '');
      setApoFpoDpo(result?.apo_fpo_dpo);
      setCola(result?.cola ?? '');
      setDifferentialRate(result?.differential_rate ?? '');
      setDangerPay(result?.danger_pay ?? '');
      setMedical(result?.medical ?? '');
      setRemarks(result?.remarks ?? '');
      setClimateZone(result?.climate_zone ?? '');
      setConsumableAllowance(result?.consumable_allowance);
      setFmFpAccepted(result?.fm_fp_accepted);
      setHousingType(result?.housing_type ?? '');
      setQtrsType(result?.quarters ?? '');
      setQuartersRemark(result?.quarters_remarks ?? '');
      setSpecialShipAllow(result?.special_ship_allow ?? '');
      setSchoolYearText(result?.school_year ?? '');
      setEdGradesAtPost(result?.grade_adequater_education ?? '');
      setEmploymentOpportunities(result?.efm_employment_opportunities ?? '');
      setEfmIssues(result?.efm_issues ?? '');
      setMissionEfmEmp(result?.mission_efm_emp ?? '');
      setOutsideEfmEmp(result?.outside_efm_emp ?? '');
    }
  }, [editMode]);

  const onSubmit = () => {
    let submitFunction = biddingToolEdit;
    if (isCreate) {
      submitFunction = biddingToolCreate
    }
    dispatch(submitFunction({
      id: isCreate ? id : undefined,
      gsaLocation,
      status,
      hds,
      tod,
      rrPoint,
      unaccompaniedStatus,
      apoFpoDpo,
      cola,
      differentialRate,
      dangerPay,
      medical,
      remarks,
      climateZone,
      consumableAllowance,
      fmFpAccepted,
      housingType,
      qtrsType,
      quartersRemark,
      specialShipAllow,
      schoolYearText,
      edGradesAtPost,
      employmentOpportunities,
      efmIssues,
      missionEfmEmp,
      outsideEfmEmp,
    }))
  }

  const onCancel = () => {
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

  const editView = (
    <div>
      <div className="position-form">
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="gsa-location">GSA Location</label>
            <input
              id="gsa-location"
              defaultValue={gsaLocation}
              onChange={(e) => setGsaLocation(e.target.value)}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOptions.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              label="HDS"
              id="hds"
              onCheckBoxClick={e => setHds(e)}
              value={hds}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="tod">TOD</label>
            <select
              id="tod"
              defaultValue={tod}
              onChange={(e) => setTod(e.target.value)}
            >
              {statusOptions.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="rr-point">R & R Point</label>
            <input
              id="rr-point"
              defaultValue={rrPoint}
              onChange={(e) => setRrPoint(e.target.value)}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="unaccompanied-status">Unaccompanied Status</label>
            <select
              id="unaccompanied-status"
              defaultValue={unaccompaniedStatus}
              onChange={(e) => setUnaccompaniedStatus(e.target.value)}
            >
              {languageOffset.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              label="APO/FPO/DPO"
              id="apo"
              onCheckBoxClick={e => setApoFpoDpo(e)}
              value={apoFpoDpo}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="cola">COLA (0-160)</label>
            <input
              id="cola"
              defaultValue={cola}
              onChange={(e) => setCola(e.target.value)}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="differential-rate">Differential Rate</label>
            <select
              id="differential-rate"
              defaultValue={differentialRate}
              onChange={(e) => setDifferentialRate(e.target.value)}
            >
              {languageOffset.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="danger-pay">Danger Pay (0-35)</label>
            <select
              id="danger-pay"
              defaultValue={dangerPay}
              onChange={(e) => setDangerPay(e.target.value)}
            >
              {languageOffset.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Medical</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="medical"
                placeholder="No Description"
                defaultValue={medical}
                onChange={(e) => setMedical(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {medical.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Remarks</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="remarks"
                placeholder="No Description"
                defaultValue={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {remarks.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="climate-zone">Climate Zone</label>
            <select
              id="climate-zone"
              defaultValue={climateZone}
              onChange={(e) => setClimateZone(e.target.value)}
            >
              {statusOptions.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              label="Consumable Allowance"
              id="consumable-allowance"
              onCheckBoxClick={e => setConsumableAllowance(e)}
              value={consumableAllowance}
            />
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              label="FM/FP Accepted"
              id="fm-fp-accepted"
              onCheckBoxClick={e => setFmFpAccepted(e)}
              value={fmFpAccepted}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="housing-type">Housing Type</label>
            <select
              id="housing-type"
              defaultValue={housingType}
              onChange={(e) => setHousingType(e.target.value)}
            >
              {statusOptions.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="qtrs-type">Qtrs. Type</label>
            <select
              id="qtrs-type"
              defaultValue={qtrsType}
              onChange={(e) => setQtrsType(e.target.value)}
            >
              {statusOptions.map(b => (
                <option value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Quarters Remark</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="quarters-remark"
                placeholder="No Description"
                defaultValue={quartersRemark}
                onChange={(e) => setQuartersRemark(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {quartersRemark.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Special Ship. Allow.</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="special-ship-allow"
                placeholder="No Description"
                defaultValue={specialShipAllow}
                onChange={(e) => setSpecialShipAllow(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {specialShipAllow.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">School Year Text</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="school-year-text"
                placeholder="No Description"
                defaultValue={schoolYearText}
                onChange={(e) => setSchoolYearText(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {schoolYearText.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Ed. Grades At Post</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="ed-grades-at-post"
                placeholder="No Description"
                defaultValue={edGradesAtPost}
                onChange={(e) => setEdGradesAtPost(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {edGradesAtPost.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Employment Opportunities</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="employment-opportunities"
                placeholder="No Description"
                defaultValue={employmentOpportunities}
                onChange={(e) => setEmploymentOpportunities(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {employmentOpportunities.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">EFM Issues</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="efm-issues"
                placeholder="No Description"
                defaultValue={efmIssues}
                onChange={(e) => setEfmIssues(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {efmIssues.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <CheckBox
              label="Mission EFM EMP"
              id="mission-efm-emp"
              onCheckBoxClick={e => setMissionEfmEmp(e)}
              value={missionEfmEmp}
            />
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              label="Outside EFM EMP"
              id="outside-efm-emp"
              onCheckBoxClick={e => setOutsideEfmEmp(e)}
              value={outsideEfmEmp}
            />
          </div>
        </div>
      </div>
      <div className="position-form--actions">
        {isCreate ?
          <Link to="/profile/biddingfunctions/biddingtool/">Back</Link> :
          <button onClick={showCancelModal}>Cancel</button>
        }
        <button onClick={onSubmit}>Save</button>
      </div>
    </div>
  );

  return (resultIsLoading ?
    <Spinner type="bidding-tool" size="small" /> :
    <TabbedCard
      tabs={[{
        text: 'Bidding Tool Overview',
        value: 'OVERVIEW',
        content: (
          <div className="position-content--container">
            <div className="position-content">
              {(editMode || isCreate) ? editView : readView}
            </div>
          </div >
        ),
      }]}
    />
  );
};

BiddingToolCard.propTypes = {
  id: PropTypes.string.isRequired,
};

BiddingToolCard.defaultProps = {
  id: 'new',
};

export default BiddingToolCard;
