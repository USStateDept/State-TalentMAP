import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import { Row } from 'Components/Layout';

const dummyArr = [{ code: 'd', name: 'SecState WashDC' }, { code: 'v', name: '11.1' }, { code: 'p', name: 'Publishable Positions' }, { code: 't', name: 'talentMAP' }];

const Routing = () => (
  <div className="position-content position-form input-container">
    <div className="notification-card__sub-section">
      <span className="sub-header">Action</span>
      <div className="display-flex justify-space-between width-700 mt-20">
        <div className="position-form--label-input-container width-300">
          <label htmlFor="status">Cable Post</label>
          <select
            id="season"
            defaultValue="SecState WashDC"
            onChange={() => {}}
          >
            {
              dummyArr.map(b => (
                <option value={b.code}>{b.name}</option>
              ))
            }
          </select>
        </div>
        <div className="position-form--label-input-container width-300">
          <label htmlFor="status">Precedence</label>
          <select
            id="season"
            defaultValue="SecState WashDC"
            onChange={() => {}}
          >
            {
              dummyArr.map(b => (
                <option value={b.code}>{b.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      <Row fluid className="position-content--textArea width-700  mt-20">
        <span className="definition-title">Slug Text</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={4}
            minRows={1}
            maxlength="500"
            name="subject"
            placeholder="No Description"
            defaultValue=""
            onChange={() => {}}
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          0 / 500
        </div>
      </Row>
      <a href="tbd" rel="PMD" target="_blank">Add Another Action</a>
      <div className="content-divider mt-40" />
    </div>
    <div className="notification-card__sub-section">
      <span className="sub-header">Information</span>
      <div className="display-flex justify-space-between width-700 mt-20">
        <div className="position-form--label-input-container width-300">
          <label htmlFor="status">Cable Post</label>
          <select
            id="season"
            defaultValue="SecState WashDC"
            onChange={() => {}}
          >
            {
              dummyArr.map(b => (
                <option value={b.code}>{b.name}</option>
              ))
            }
          </select>
        </div>
        <div className="position-form--label-input-container width-300">
          <label htmlFor="status">Precedence</label>
          <select
            id="season"
            defaultValue="SecState WashDC"
            onChange={() => {}}
          >
            {
              dummyArr.map(b => (
                <option value={b.code}>{b.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      <Row fluid className="position-content--textArea width-700  mt-20">
        <span className="definition-title">Slug Text</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={4}
            minRows={1}
            maxlength="500"
            name="subject"
            placeholder="No Description"
            defaultValue=""
            onChange={() => {}}
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          0 / 500
        </div>
      </Row>
      <a href="tbd" rel="PMD" target="_blank">Add More Information</a>
      <div className="content-divider mt-40" />
    </div>
    <div className="notification-card__sub-section">
      <span className="sub-header">Distribution</span>
      <div className="position-form--label-input-container width-200">
        <label htmlFor="status">Organization</label>
        <select
          id="season"
          defaultValue="SecState WashDC"
          onChange={() => {}}
        >
          {
            dummyArr.map(b => (
              <option value={b.code}>{b.name}</option>
            ))
          }
        </select>
      </div>
      <a href="tbd" rel="PMD" target="_blank">Add Another Distribution</a>
      <div className="content-divider" />
    </div>
    <div className="position-form--actions">
      <button onClick={() => { }}>Back</button>
      <button onClick={() => { }}>Next</button>
    </div>
  </div>
);

export default Routing;
