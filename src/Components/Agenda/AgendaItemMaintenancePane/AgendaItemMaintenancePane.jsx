import { useState } from 'react';
import InteractiveElement from 'Components/InteractiveElement';
import { filter, get } from 'lodash';
import PropTypes from 'prop-types';
import { useDataLoader } from 'hooks';
import SelectForm from 'Components/SelectForm';
import BackButton from 'Components/BackButton';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import RemarksPill from '../RemarksPill';
import api from '../../../api';

const AgendaItemMaintenancePane = (props) => {
  const { onAddRemarksClick, perdet } = props;

  const leftExpanded = get(props, 'leftExpanded');

  const aiStatuses = [
    { text: 'Approved', value: 'A' },
    { text: 'Deferred - Proposed Position', value: 'C' },
    { text: 'Disapproved', value: 'D' },
    { text: 'Deferred', value: 'F' },
    { text: 'Held', value: 'H' },
    { text: 'Move to ML/ID', value: 'M' },
    { text: 'Not Ready', value: 'N' },
    { text: 'Out of Order', value: 'O' },
    { text: 'PIP', value: 'P' },
    { text: 'Ready', value: 'R' },
    { text: 'Withdrawn', value: 'W' },
  ];

  const defaultText = 'Coming Soon';
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useDataLoader(api().get, `/fsbid/employee/assignments_separations_bids/${perdet}/`);
  // eslint-disable-next-line no-unused-vars
  const { statusData, statusError, statusLoading } = useDataLoader(api().get, '/fsbid/agenda/statuses/');

  const asg = get(data, 'data') || [];

  // eslint-disable-next-line no-unused-vars
  const [asgSepBid, setAsgSepBid] = useState(filter(asg, ['status', 'EF']));
  const [selectedAIStatus, setAIStatus] = useState('A');

  const remarks = [{ title: 'Critical Need Position', type: null }, { title: 'High Differential Post', type: null }, { title: 'Reassignment at post', type: null }, { title: 'SND Post', type: null }, { title: 'Continues SND eligibility', type: null }, { title: 'Creator(s):Townpost, Jenny', type: 'person' }, { title: 'Modifier(s):WoodwardWA', type: 'person' }, { title: 'CDO: Rehman, Tarek S', type: 'person' }];

  const saveAI = () => {
    // eslint-disable-next-line
    console.log('save AI');
  };

  const addPos = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    console.log('add pos');
  };

  return (
    <div className="ai-maintenance-pane">
      <div className="ai-maintenance-header">
        <div className={`back-save-btns-container ${leftExpanded ? ' half-width' : ''}`}>
          <BackButton />
          <button className="save-ai-btn" onClick={saveAI}>
            Save Agenda Item
          </button>
        </div>
        <div className={`ai-maintenance-header-dd ${leftExpanded ? ' half-width' : ''}`} >
          {
            !loading && !error &&
              <select
                id="ai-maintenance-dd-asg"
                defaultValue={asg}
                onChange={(e) => setAsgSepBid(get(e, 'target.pos_num'))}
                value={asg}
              >
                <option selected hidden>Employee Assignments, Separations, and Bids</option>
                {
                  asg.map(a => (
                    <option key={a.pos_num} value={a.pos_num}>
                      {/* eslint-disable-next-line react/no-unescaped-entities,max-len */}
                      {a.name || defaultText} '{a.status || defaultText}' in {a.org || defaultText} - {a.pos_title || defaultText}({a.pos_num || defaultText})
                    </option>
                  ))
                }
              </select>
          }
          <label htmlFor="ai-maintenance-status">Status:</label>
          <select
            id="ai-maintenance-status"
            defaultValue={selectedAIStatus}
            onChange={(e) => setAIStatus(get(e, 'target.value'))}
            value={selectedAIStatus}
          >
            {
              aiStatuses.map(a => (
                <option key={a.value} value={a.value}>{a.text}</option>
              ))
            }
          </select>
          <form onSubmit={addPos}>
            <div className="usa-form">
              <label htmlFor="position number">Add Position Number:</label>
              <input
                id="add-pos-num-input"
                value={'1234578'}
                onChange={value => setAIStatus(value.target.value)}
                type="add"
                name="add"
                // disabled
              />
              <InteractiveElement
                onClick={addPos}
                type="span"
                role="button"
                title="Add position"
                id="add-pos-num-icon"
              >
                <FA name="plus" />
              </InteractiveElement>
            </div>
          </form>
          <SelectForm
            id="ai-maintenance-status"
            options={aiStatuses}
            label="Report Category:"
            defaultSort={selectedAIStatus}
            onSelectOption={value => setAIStatus(value.target.value)}
            disabled={false}
          />
          <SelectForm
            id="ai-maintenance-status"
            options={aiStatuses}
            label="Panel Date:"
            defaultSort={selectedAIStatus}
            onSelectOption={value => setAIStatus(value.target.value)}
            disabled={false}
          />
        </div>
        <div className="usa-form remarks">
          <label htmlFor="remarks">Remarks:</label>
          <div className="remarks-container">
            <InteractiveElement
              onClick={onAddRemarksClick}
              type="span"
              role="button"
              className="save-ai-btn"
              title="Add remark"
              id="add-remark"
            >
              <FA name="plus" />
            </InteractiveElement>
            {
              remarks.map(remark => (
                <RemarksPill isEditable key={remark.title} {...remark} />
              ))
            }
          </div>
        </div>
        <div className="usa-form corrections">
          <label htmlFor="corrections">Corrections:</label>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Ut tincidunt tincidunt imperdiet. Proin nisi diam, tincidunt rhoncus placerat
            et, fringilla non ligula. Suspendisse sed nibh nisl. Cras varius lacinia
          </div>
        </div>
      </div>
    </div>
  );
};

AgendaItemMaintenancePane.propTypes = {
  leftExpanded: PropTypes.bool,
  onAddRemarksClick: PropTypes.func,
  perdet: PropTypes.string.isRequired,
};

AgendaItemMaintenancePane.defaultProps = {
  leftExpanded: false,
  onAddRemarksClick: EMPTY_FUNCTION,
};

export default AgendaItemMaintenancePane;
