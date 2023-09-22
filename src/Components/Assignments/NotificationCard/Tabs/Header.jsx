import { useRef, useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import { Row } from 'Components/Layout';
import DefinitionList from '../../../DefinitionList';
import InputActions from '../Common/InputActions';

const result = {
  classification: 'Unclassified',
  clearance: 'None',
  special_handling: 'None',
  captions: 'TM Channel',
  eo: 'E.O 12345',
  tags: 'APER. AFIN',
  eom: 'YY',
  continuation: 'None',
};

const Header = () => {
  const [draftingOffice, setDraftingOffice] = useState('');
  const [date, setDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  /* eslint-disable quote-props */
  const definitions = {
    'Classification': result?.classification || '---',
    'Clearance': result?.clearance || '---',
    'Special Handling': result?.special_handling || '---',
    'Captions': result?.captions || '---',
    'E.O': result?.eo || '---',
    'Tags': result?.tags || '---',
    'EOM': result?.eom || '---',
    'Continuation': result?.continuation || '---',
  };
  /* eslint-enable quote-props */

  return (
    <div className="position-content position-form">
      <Row fluid className="position-content--section position-content--details">
        <DefinitionList
          itemProps={{ excludeColon: true }}
          items={definitions}
        />
      </Row>
      <div className="content-divider" />
      <div className="input-container">
        <InputActions />
        <div className="position-form--label-input-container">
          <label htmlFor="drafting-office">Drafting Office</label>
          <input
            id="drafting-office"
            defaultValue={draftingOffice}
            onChange={(e) => setDraftingOffice(e.target.value)}
          />
        </div>
        <div className="position-form--label-input-container-flex">
          <div>
            <label htmlFor="date">Date</label>
            <div className="date-wrapper-react larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${date ? '' : 'hide'}`} onClick={() => setDate(null)} />
              <DatePicker
                id="date"
                selected={date}
                onChange={setDate}
                dateFormat="MM/dd/yyyy"
                placeholderText={'MM/DD/YYY'}
                ref={datePickerRef}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              defaultValue={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <Row fluid className="mt-20">
          <span className="definition-title">Subject</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={1}
              maxlength="500"
              name="subject"
              placeholder="No Description"
              defaultValue={subject}
              onChange={(e) => setSubject(e.target.value)}
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {subject?.length} / 500
          </div>
        </Row>
      </div>
      <div className="position-form--actions">
        <button onClick={() => { }}>Cancel</button>
        <button onClick={() => { }}>Next</button>
      </div>
    </div>
  );
};

export default Header;
