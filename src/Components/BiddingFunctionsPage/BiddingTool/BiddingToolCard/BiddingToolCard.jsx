import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import FA from 'react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { isEqual } from 'lodash';
import { userHasPermissions } from 'utilities';
import TabbedCard from 'Components/TabbedCard';
import { Row } from 'Components/Layout';
import { Definition } from '../../../DefinitionList';
import { biddingTool, biddingToolCreate, biddingToolDelete, biddingToolEdit } from '../../../../actions/biddingTool';
import Spinner from '../../../Spinner/Spinner';
import CheckBox from '../../../CheckBox/CheckBox';
import { history } from '../../../../store';

// eslint-disable-next-line
const BiddingToolCard = (props) => {
  const { id, location: routeLocation } = props;
  const isCreate = id === 'new';

  const rootLocation = () => {
    const routeHistory = routeLocation.split('/');
    routeHistory.pop();
    return routeHistory.join('/');
  };

  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile.permission_groups);

  // ========================== DATA ==========================

  const result = useSelector(state => state.biddingTool) || {};
  const resultIsLoading = useSelector(state => state.biddingToolFetchDataLoading);
  const deleteErrored = useSelector(state => state.biddingToolDeleteErrored);
  const createErrored = useSelector(state => state.biddingToolCreateErrored);

  const locations = result?.locations || [];
  const statuses = result?.statuses || [];
  const tods = result?.tods || [];
  const unaccompaniedStatuses = result?.unaccompanied_statuses || [];
  const housingTypes = result?.housing_types || [];
  const quartersTypes = result?.quarters_types || [];
  const ehcps = result?.ehcps || [];

  const location$ = locations.find(o => o.code === result?.location);

  useEffect(() => {
    if (!isCreate) {
      dispatch(biddingTool(id));
    }
  }, []);

  const initialValues = isCreate ? {
    location: null,
    status: null,
    tod: null,
    unaccompanied_status: null,
    housing: null,
    quarters: null,
    efm_issues: null,

    snd: 'N',
    hds: 'N',
    apo_fpo_dpo: 'N',
    consumable_allowance: 'N',
    fm_fp: 'N',
    inside_efm_employment: 'N',
    outside_efm_employment: 'N',

    cola: null,
    differential_rate: null,
    danger_pay: null,
    climate_zone: null,

    rr_point: '',
    medical: '',
    remarks: '',
    quarters_remark: '',
    special_ship_allowance: '',
    school_year: '',
    grade_education: '',
    efm_employment: '',
  } : {
    location: result?.location,
    status: result?.status,
    tod: result?.tod,
    unaccompanied_status: result?.unaccompanied_status,
    housing: result?.housing,
    quarters: result?.quarters,
    efm_issues: result?.efm_issues,

    snd: result?.snd ?? 'N',
    hds: result?.hds ?? 'N',
    apo_fpo_dpo: result?.apo_fpo_dpo ?? 'N',
    consumable_allowance: result?.consumable_allowance ?? 'N',
    fm_fp: result?.fm_fp ?? 'N',
    inside_efm_employment: result?.inside_efm_employment ?? 'N',
    outside_efm_employment: result?.outside_efm_employment ?? 'N',

    cola: result?.cola,
    differential_rate: result?.differential_rate,
    danger_pay: result?.danger_pay,
    climate_zone: result?.climate_zone,

    rr_point: result?.rr_point ?? '',
    medical: result?.medical ?? '',
    remarks: result?.remarks ?? '',
    quarters_remark: result?.quarters_remark ?? '',
    special_ship_allowance: result?.special_ship_allowance ?? '',
    school_year: result?.school_year ?? '',
    grade_education: result?.grade_education ?? '',
    efm_employment: result?.efm_employment ?? '',
  };

  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState(initialValues);
  useEffect(() => {
    if (editMode) {
      setValues(initialValues);
    }
  }, [editMode]);

  // ========================== VIEW MODE ==========================

  /* eslint-disable quote-props */
  const sections = [
    { 'TOD': tods.find(o => o.code === result?.tod)?.description || 'None Listed' },
    { 'R & R Point': result?.rr_point || 'None Listed' },
    { 'COLA': result?.cola?.toString() || 'None Listed' },
    { 'Differential Rate': result?.differential_rate?.toString() || 'None Listed' },
    { 'Consumable Allowance': result?.consumable_allowance ? 'Yes' : 'No' },
    { 'APO/FPO/DPO': result?.apo_fpo_dpo ? 'Yes' : 'No' },
    { 'Danger Pay': result?.danger_pay?.toString() || 'None Listed' },
    { 'SND': result?.snd ? 'Yes' : 'No' },
    { 'HDS': result?.hds ? 'Yes' : 'No' },
    { 'Unaccompanied Status': unaccompaniedStatuses.find(o => o.code === result?.unaccompanied_status)?.description || 'None Listed' },
    { 'Housing Type': housingTypes.find(o => o.code === result?.housing_type)?.description || 'None Listed' },
    { 'Quarters': quartersTypes.find(o => o.code === result?.quarters_type)?.description || 'None Listed' },
    { 'EFM Issues': ehcps.find(o => o.code === result?.efm_issues)?.description || 'None Listed' },
  ];
  const textAreas = [{
    label: 'School Year',
    name: 'school-year',
    value: result?.school_year ?? '',
  }, {
    label: 'Grade, Adequater Education at Post',
    name: 'grade-education',
    value: result?.grade_education ?? '',
  }, {
    label: 'EFM Employment Opportunities',
    name: 'efm-employment',
    value: result?.efm_employment ?? '',
  }, {
    label: 'Medical',
    name: 'medical',
    value: result?.medical ?? '',
  }, {
    label: 'Remarks',
    name: 'remarks',
    value: result?.remarks ?? '',
  }];
  /* eslint-enable quote-props */

  const readView = (
    <div>
      <Row fluid className="position-content--section position-content--subheader">
        <div className="line-separated-fields">
          <div>
            <span>Post/Country/Code:</span>
            <span>
              {location$?.state_country || 'None Listed'}, {location$?.code || 'None Listed'}
            </span>
          </div>
        </div>
        {(isSuperUser && !editMode) &&
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
          <Row key={t.name} fluid className="position-content--description">
            <span className="definition-title">{t.label}</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxLength="4000"
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
        <Link to={rootLocation()}>Back</Link>
      </div>
    </div>
  );

  // ========================== EDIT MODE ==========================

  const onSubmit = () => {
    if (isCreate) {
      dispatch(biddingToolCreate(values));
      if (!createErrored) {
        history.push(`${rootLocation()}/${values.location}`);
      }
    } else {
      dispatch(biddingToolEdit({
        ...values,
        updater_id: result?.updater_id,
        updated_date: result?.updated_date,
      }));
    }
  };

  const onCancel = () => {
    if (isCreate) history.push(rootLocation());
    else if (setEditMode) setEditMode(false);
  };
  const showCancelModal = () => {
    if (isEqual(initialValues, values)) {
      onCancel();
    } else {
      swal({
        title: 'Confirm Discard Changes',
        button: false,
        closeOnEsc: true,
        content: (
          <div className="simple-action-modal">
            <div className="help-text">
              {isCreate ?
                <span>Are you sure you want to discard this Bidding Tool draft?</span> :
                <span>Are you sure you want to discard all changes made to this Bidding Tool?</span>
              }
            </div>
            <div className="modal-controls">
              <button onClick={() => { onCancel(); swal.close(); }}>Yes</button>
              <button className="usa-button-secondary" onClick={() => swal.close()}>No</button>
            </div>
          </div>
        ),
      });
    }
  };

  const onDelete = () => {
    dispatch(biddingToolDelete({
      location: id,
      updater_id: result?.updater_id,
      updated_date: result?.updated_date,
    }));
    swal.close();
    if (!deleteErrored) {
      history.push(rootLocation());
    }
  };
  const showDeleteModal = () => {
    swal({
      title: 'Confirm Delete Bidding Tool',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>
              Are you sure you want to delete this Bidding Tool? This action cannot but undone.
            </span>
          </div>
          <div className="modal-controls">
            <button onClick={onDelete}>Yes</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>No</button>
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
            <select
              id="location"
              defaultValue={values.location}
              onChange={(e) => setValues({ ...values, location: e.target.value })}
            >
              {locations?.map(b => (
                <option key={b.code} value={b.code}>{b.state_country}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              defaultValue={values.status}
              onChange={(e) => setValues({ ...values, status: e.target.value })}
            >
              {statuses?.map(b => (
                <option key={b.code} value={b.code}>{b.description}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container mt-30">
            <CheckBox
              label="SND"
              id="snd"
              onCheckBoxClick={e => setValues({ ...values, snd: e ? 'Y' : 'N' })}
              value={values.snd === 'Y'}
            />
          </div>
          <div className="position-form--label-input-container mt-30">
            <CheckBox
              label="HDS"
              id="hds"
              onCheckBoxClick={e => setValues({ ...values, hds: e ? 'Y' : 'N' })}
              value={values.hds === 'Y'}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="tod">TOD</label>
            <select
              id="tod"
              defaultValue={values.tod}
              onChange={(e) => setValues({ ...values, tod: e.target.value })}
            >
              {tods?.map(b => (
                <option key={b.code} value={b.code}>{b.description}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="rr-point">R & R Point</label>
            <input
              id="rr-point"
              defaultValue={values.rr_point}
              onChange={(e) => setValues({ ...values, rr_point: e.target.value })}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="unaccompanied-status">Unaccompanied Status</label>
            <select
              id="unaccompanied-status"
              defaultValue={values.unaccompanied_status}
              onChange={(e) => setValues({ ...values, unaccompanied_status: e.target.value })}
            >
              {unaccompaniedStatuses?.map(b => (
                <option key={b.code} value={b.code}>{b.description}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container mt-30">
            <CheckBox
              label="APO/FPO/DPO"
              id="apo"
              onCheckBoxClick={e => setValues({ ...values, apo_fpo_dpo: e ? 'Y' : 'N' })}
              value={values.apo_fpo_dpo === 'Y'}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="cola">COLA (0-160)</label>
            <input
              id="cola"
              type="number"
              min="0"
              max="160"
              defaultValue={values.cola}
              onChange={(e) => setValues({ ...values, cola: e.target.value })}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="differential-rate">Differential Rate</label>
            <input
              id="differential-rate"
              type="number"
              min="0"
              defaultValue={values.differential_rate}
              onChange={(e) => setValues({ ...values, differential_rate: e.target.value })}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="danger-pay">Danger Pay (0-35)</label>
            <input
              id="danger-pay"
              type="number"
              min="0"
              max="35"
              defaultValue={values.danger_pay}
              onChange={(e) => setValues({ ...values, danger_pay: e.target.value })}
            />
          </div>
        </div>
        <div className="position-form--label-input-container">
          <Row fluid className="position-form--description">
            <span className="definition-title">Medical</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxLength="4000"
                name="medical"
                placeholder="No Description"
                defaultValue={values.medical}
                onChange={(e) => setValues({ ...values, medical: e.target.value })}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {values?.medical?.length} / 4,000
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
                maxLength="4000"
                name="remarks"
                placeholder="No Description"
                defaultValue={values.remarks}
                onChange={(e) => setValues({ ...values, remarks: e.target.value })}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {values?.remarks?.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="climate-zone">Climate Zone</label>
            <input
              id="climate-zone"
              type="number"
              min="0"
              defaultValue={values.climate_zone}
              onChange={(e) => setValues({ ...values, climate_zone: e.target.value })}
            />
          </div>
          <div className="position-form--label-input-container mt-30">
            <CheckBox
              label="Consumable Allowance"
              id="consumable-allowance"
              onCheckBoxClick={e => setValues({ ...values, consumable_allowance: e ? 'Y' : 'N' })}
              value={values.consumable_allowance === 'Y'}
            />
          </div>
          <div className="position-form--label-input-container mt-30">
            <CheckBox
              label="FM/FP Accepted"
              id="fm-fp"
              onCheckBoxClick={e => setValues({ ...values, fm_fp: e ? 'Y' : 'N' })}
              value={values.fm_fp === 'Y'}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="housing-type">Housing Type</label>
            <select
              id="housing"
              defaultValue={values.housing}
              onChange={(e) => setValues({ ...values, housing: e.target.value })}
            >
              {housingTypes?.map(b => (
                <option key={b.code} value={b.code}>{b.description}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="qtrs-type">Qtrs. Type</label>
            <select
              id="quarters"
              defaultValue={values.quarters}
              onChange={(e) => setValues({ ...values, quarters: e.target.value })}
            >
              {quartersTypes?.map(b => (
                <option key={b.code} value={b.code}>{b.description}</option>
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
                maxLength="4000"
                name="quarters-remark"
                placeholder="No Description"
                defaultValue={values.quarters_remark}
                onChange={(e) => setValues({ ...values, quarters_remark: e.target.value })}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {values?.quarters_remark?.length} / 4,000
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
                maxLength="4000"
                name="special-ship-allowance"
                placeholder="No Description"
                defaultValue={values.special_ship_allowance}
                onChange={(e) => setValues({ ...values, special_ship_allowance: e.target.value })}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {values?.special_ship_allowance?.length} / 4,000
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
                maxLength="4000"
                name="school-year"
                placeholder="No Description"
                defaultValue={values.school_year}
                onChange={(e) => setValues({ ...values, school_year: e.target.value })}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {values?.school_year?.length} / 4,000
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
                maxLength="4000"
                name="grade-education"
                placeholder="No Description"
                defaultValue={values.grade_education}
                onChange={(e) => setValues({ ...values, grade_education: e.target.value })}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {values?.grade_education?.length} / 4,000
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
                maxLength="4000"
                name="efm-employment"
                placeholder="No Description"
                defaultValue={values.efm_employment}
                onChange={(e) => setValues({ ...values, efm_employment: e.target.value })}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {values?.efm_employment?.length} / 4,000
            </div>
          </Row>
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="qtrs-type">EFM Issues</label>
            <select
              id="efm-issues"
              defaultValue={values.efm_issues}
              onChange={(e) => setValues({ ...values, efm_issues: e.target.value })}
            >
              {ehcps.map(b => (
                <option key={b.code} value={b.code}>{b.description}</option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container mt-30">
            <CheckBox
              label="Mission EFM EMP"
              id="mission-efm-emp"
              onCheckBoxClick={e => setValues({ ...values, inside_efm_employment: e ? 'Y' : 'N' })}
              value={values.inside_efm_employment === 'Y'}
            />
          </div>
          <div className="position-form--label-input-container mt-30">
            <CheckBox
              label="Outside EFM EMP"
              id="outside-efm-emp"
              onCheckBoxClick={e => setValues({ ...values, outside_efm_employment: e ? 'Y' : 'N' })}
              value={values.outside_efm_employment === 'Y'}
            />
          </div>
        </div>
      </div>
      {isCreate ?
        <div className="position-form--actions">
          <button onClick={showCancelModal}>Cancel</button>
          <button onClick={onSubmit}>Create</button>
        </div> :
        <div className="position-form--actions split-actions">
          <button onClick={showDeleteModal}>
            <FA name="trash" />
            Remove from Bid List
          </button>
          <div>
            <button onClick={showCancelModal}>Cancel</button>
            <button onClick={onSubmit}>Save Bidding Tool</button>
          </div>
        </div>
      }
    </div>
  );

  return ((resultIsLoading && !isCreate) ?
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
  location: PropTypes.string.isRequired,
};

BiddingToolCard.defaultProps = {
  id: 'new',
  location: '/profile/',
};

export default BiddingToolCard;
