import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import InteractiveElement from 'Components/InteractiveElement';

const Routing = (props) => {
  const {
    routingValue,
    modRoutingValue,
    postOptions,
    precedenceOptions,
    organizationOptions,
  } = props;

  const deleteButton = (routingSection, label) => (
    <InteractiveElement
      title={`Delete ${label}`}
      onClick={() => modRoutingValue(routingSection?.NMD_SEQ_NUM, 'INC_IND', 0)}
      className="routing-delete-button"
    >
      <FA name="trash" className="fa-lg" />
    </InteractiveElement>
  );

  const addButton = (dtCode, addButtonTitle) => (
    <div className="standard-add-button pt-12 pb-20">
      <a
        role="button"
        tabIndex={0}
        onClick={() => modRoutingValue(null, 'DT_CODE', dtCode)}
      >
        {addButtonTitle}
      </a>
    </div>
  );

  const routingSection = (dtCode, label, addButtonTitle) => (
    <div className="notification-card__sub-section">
      <span className="sub-header">{label}</span>
      {routingValue.filter(v => (v.DT_CODE === dtCode && v.INC_IND !== 0)).map(r => (
        <div className="routing-sub-section">
          <div className="display-flex justify-space-between width-700">
            <div className="position-form--label-input-container width-300">
              <label htmlFor={`post-${r?.NMD_SEQ_NUM}`}>Cable Post</label>
              <select
                id={`post-${r?.NMD_SEQ_NUM}`}
                value={r?.CP_SEQ_NUM || ''}
                onChange={(e) => modRoutingValue(r?.NMD_SEQ_NUM, 'CP_SEQ_NUM', e.target.value)}
              >
                <option value="" disabled>Select Post</option>
                {postOptions.map(b => (
                  <option key={b.CP_SEQ_NUM} value={b.CP_SEQ_NUM}>{b.CP_DESC}</option>
                ))}
              </select>
            </div>
            <div className="position-form--label-input-container width-300">
              <label htmlFor={`precedence-${r?.NMD_SEQ_NUM}`}>Precedence</label>
              <select
                id={`precedence-${r?.NMD_SEQ_NUM}`}
                value={r?.PT_CODE || ''}
                onChange={(e) => modRoutingValue(r?.NMD_SEQ_NUM, 'PT_CODE', e.target.value)}
              >
                <option value="" disabled>Select Precedence</option>
                {precedenceOptions.map(b => (
                  <option key={b.PT_CODE} value={b.PT_CODE}>{b.PT_DESC}</option>
                ))}
              </select>
            </div>
          </div>
          <Row fluid className="position-content--textArea width-700 mt-10">
            <span className="definition-title">Slug Text</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={4}
                minRows={1}
                maxLength="500"
                name="subject"
                placeholder="No Description"
                value={r?.NMD_SLUG_TEXT}
                onChange={(e) => modRoutingValue(r?.NMD_SEQ_NUM, 'NMD_SLUG_TEXT', e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {r?.NMD_SLUG_TEXT?.length} / 500
            </div>
          </Row>
          {deleteButton(r, label)}
        </div>
      ))}
      {addButton(dtCode, addButtonTitle)}
      <div className="content-divider mt-40" />
    </div>
  );

  return (
    <div className="position-content position-form input-container">
      {routingSection('A', 'Action', 'Add Another Action')}
      {routingSection('I', 'Information', 'Add More Information')}
      <div className="notification-card__sub-section">
        <span className="sub-header">Distribution</span>
        {routingValue.filter(v => (v.DT_CODE === 'D' && v.INC_IND !== 0)).map(dist => (
          <div className="routing-sub-section">
            <div className="position-form--label-input-container width-700">
              <label htmlFor="organization">Organization</label>
              <select
                id="organization"
                value={dist?.ORG_CODE || ''}
                onChange={(e) => modRoutingValue(dist?.NMD_SEQ_NUM, 'ORG_CODE', e.target.value)}
              >
                <option value="" disabled>Select Organization</option>
                {organizationOptions.map(b => (
                  <option key={b.ORG_CODE} value={b.ORG_CODE}>{b.ORGS_SHORT_DESC}</option>
                ))}
              </select>
            </div>
            {deleteButton(dist, 'Distribution')}
          </div>
        ))}
        {addButton('D', 'Add Another Distribution')}
        <div className="content-divider" />
      </div>
    </div>
  );
};

Routing.propTypes = {
  routingValue: PropTypes.arrayOf(PropTypes.shape({})),
  modRoutingValue: PropTypes.func,
  postOptions: PropTypes.arrayOf(PropTypes.shape({})),
  precedenceOptions: PropTypes.arrayOf(PropTypes.shape({})),
  organizationOptions: PropTypes.arrayOf(PropTypes.shape({})),
};

Routing.defaultProps = {
  routingValue: undefined,
  modRoutingValue: undefined,
  postOptions: undefined,
  precedenceOptions: undefined,
  organizationOptions: undefined,
};

export default Routing;
