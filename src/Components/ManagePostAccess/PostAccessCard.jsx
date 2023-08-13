import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../CheckBox/CheckBox';

const PostAccessCard = (props) => {
  // Will change this checkCount call, currently using to pass the count to parent component
  const { data, headers, checkCount } = props;

  const [selectAll, setSelectAll] = useState(false);
  const [rowData, setRowData] = useState(data);
  const [checkedCountAmount, setCheckedCountAmount] = useState(0);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setRowData((prevData) =>
      prevData.map((item) => ({ ...item, isChecked: !selectAll })),
    );
    // Will change this, currently using to pass the count to parent component
    if (selectAll) setCheckedCountAmount(0);
    if (!selectAll) setCheckedCountAmount(rowData.length);
  };

  const handleCheckboxChange = (itemData) => {
    setRowData((prevData) =>
      prevData.map((item) =>
        item.id === itemData.id ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
    // Will change this, currently using to pass the count to parent component
    if (itemData.isChecked) setCheckedCountAmount(checkedCountAmount - 1);
    if (!itemData.isChecked) setCheckedCountAmount(checkedCountAmount + 1);

    // Check if all checkboxes are checked, set "Select All" checkbox
    setSelectAll(rowData.every((item) => item.isChecked));
  };

  useEffect(() => {
    checkCount(checkedCountAmount);
  }, [checkedCountAmount]);

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th className="checkbox-pos">
              <CheckBox
                checked={!selectAll}
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
                  id={`post-access-${item.id}`}
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
  checkCount: PropTypes.func.isRequired,
};

PostAccessCard.defaultProps = {
  data: [],
  headers: [],
  checkCount: () => {},
};

export default PostAccessCard;
