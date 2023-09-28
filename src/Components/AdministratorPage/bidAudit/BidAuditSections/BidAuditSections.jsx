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
    <span className="at-grade-container">
      <CheckBox
        onChange={() => setIsChecked(!isChecked)}
      />
      {rows.map((row) => (
        <div key={row?.header}>
          <h5 className="bid-audit-headers">{row?.header}</h5>
          <div className="bid-audit-card-rows">
            {row?.row3data &&
            <div className="bid-audit-contents-container">
              <div className="bid-audit-rows-headers">{row?.subHeader1}</div>
              <div>{row?.row1data}</div>
            </div>
            }
            {row?.row3data ?
              <div className="bid-audit-contents-container">
                <div className="bid-audit-rows-headers">{row?.subHeader2} - {row?.subHeader3}</div>
                <div className="bid-audit-rows-details">{row?.row2data} - {row?.row3data}</div>
              </div>
              :
              <div className="bid-audit-contents-container">
                <div className="bid-audit-rows-headers">{row?.subHeader1} - {row?.subHeader2}</div>
                <div className="bid-audit-rows-details">{row?.row1data} - {row?.row2data}</div>
              </div>
            }
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
  onEditChange: PropTypes.func.isRequired,
};

BidAuditSections.defaultProps = {
  rows: [],
  onEditChange: () => { },
};

export default BidAuditSections;
