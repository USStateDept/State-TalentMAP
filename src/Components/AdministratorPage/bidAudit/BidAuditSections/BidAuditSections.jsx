import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import CheckBox from '../../../CheckBox';

const BidAuditSections = ({ onEditChange, rows }) => {
  const [isChecked, setIsChecked] = useState(false);
  const onEditClick = (e) => {
    e.preventDefault();
    onEditChange();
  };

  return (
    <span style={{ display: 'flex' }} className="at-grade-container">
      <CheckBox
        onChange={() => setIsChecked(!isChecked)}
      />
      {rows.map((row) => (
        <div>
          <h5 className="bid-audit-headers">{row?.header}</h5>
          <div className="bid-audit-card-rows">
            <div style={{ width: '60px' }}>
              <div style={{ marginBottom: '5px' }}>{row?.subHeader1}</div>
              <div>{row.row1data}</div>
            </div>
            <div style={{ width: '60px' }}>
              <div style={{ marginBottom: '5px' }}>{row?.subHeader2}</div>
              <div>{row.row2data}</div>
            </div>
            <div style={{ width: '60px' }}>
              <div style={{ marginBottom: '5px' }}>{row?.subHeader3}</div>
              <div>{row.row3data}</div>
            </div>
          </div>
        </div>
      ))}
      {isChecked &&
        <span className="edit-at">
          <FA name="pencil" />
          <Link
            to="#"
            onClick={onEditClick}
          >Edit</Link>
        </span>
      }
    </span>
  );
};

BidAuditSections.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string,
    data: PropTypes.string,
  })),
};

BidAuditSections.defaultProps = {
  rows: [],
};

export default BidAuditSections;
