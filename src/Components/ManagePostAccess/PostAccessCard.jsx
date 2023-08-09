import { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../CheckBox/CheckBox';

const PostAccessCard = (props) => {
  const { data, headers } = props;

  const [selectAll, setSelectAll] = useState(false);
  const [rowData, setRowData] = useState(data);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setRowData((prevData) =>
      prevData.map((item) => ({ ...item, isChecked: !selectAll })),
    );
  };

  const handleCheckboxChange = (itemData) => {
    setRowData((prevData) =>
      prevData.map((item) =>
        item.id === itemData.id ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
    // Check if all checkboxes are checked, set "Select All" checkbox
    setSelectAll(rowData.every((item) => item.isChecked));
  };

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th className="checkbox-pos">
              <CheckBox
                checked={selectAll}
                onCheckBoxClick={handleSelectAllChange}
              />
            </th>
            {headers.map((item) => (
              <th key={item}>{item}</th>
            ))
            }
          </tr>
        </thead>
        <tbody>
          {rowData.map((item) => (
            <tr key={item.id}>
              <td className="checkbox-pac checkbox-pos">
                <CheckBox
                  value={item.isChecked}
                  onCheckBoxClick={() => handleCheckboxChange(item)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td className="description">{item.description}</td>
              <td>{item.date}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
};


PostAccessCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    isChecked: PropTypes.bool,
  })).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PostAccessCard.defaultProps = {
  data: [],
  headers: [],
};

export default PostAccessCard;
