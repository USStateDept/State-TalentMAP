import { useState } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import CheckBox from '../../CheckBox/CheckBox';
import TextInput from '../../TextInput/TextInput';


const EditBureauExceptionList = (props) => {
  const { Name } = props;

  const submit = (e) => {
    e.preventDefault();
    swal.close();
    // Doing nothing for now but closing.
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };


  const data = [
    { id: 1, bureaus: ['AO'] },
    { id: 2, bureaus: ['FA'] },
    { id: 3, bureaus: ['EO'] },
    { id: 4, bureaus: ['AS'] },
    { id: 5, bureaus: ['FG'] },
    { id: 6, bureaus: ['UO'] },
    { id: 7, bureaus: ['XA'] },
    { id: 8, bureaus: ['YY'] },
    { id: 9, bureaus: ['ZA'] },

  ];

  const [selectAll, setSelectAll] = useState(false);
  const [checkedBureauIds, setCheckedBureauIds] = useState([]);
  const [bureau, setBureau] = useState('');

  const onChangeText = (e) => {
    setBureau(e);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedBureauIds(
        data.map(bu => bu.id),
      );
    } else {
      setSelectAll(false);
      setCheckedBureauIds([]);
    }
  };

  const handleSelectBureau = (bu => {
    if (checkedBureauIds.includes(bu.id)) {
      const filteredBureau = checkedBureauIds.filter(x => x !== bu.id);
      setCheckedBureauIds(filteredBureau);
    } else {
      setCheckedBureauIds([...checkedBureauIds, bu.id]);
    }
  });

  return (
    <div>
      <form>
        <table className="custom-table">
          <thead>
            <tr>
              <div className="bureau-exception-text-input">
                <TextInput
                  changeText={(e) => onChangeText(e)}
                  label={`F/S Employee Name: ${Name}`}
                  placeholder="Filter by Bureau"
                  value={bureau}
                  id="bureau"
                  inputProps={{
                    autoComplete: 'off',
                  }}
                />
              </div>
            </tr>
            <tr>
              <th className="checkbox-pos">
                <CheckBox
                  label="ID"
                  checked={!selectAll}
                  onCheckBoxClick={handleSelectAll}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.length &&
                data.filter(item => item.bureaus.some(x =>
                  x.includes(bureau))).map(post => (
                  <tr key={post.id}>
                    <td className="checkbox-pac checkbox-pos">
                      <CheckBox
                        label={post.bureaus}
                        value={checkedBureauIds.includes(post.id)}
                        onCheckBoxClick={() => handleSelectBureau(post)}
                      />
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
        <button onClick={cancel}>Cancel</button>
        <button onClick={submit} type="submit">Add Bureau</button>
      </form>
    </div>
  );
};

EditBureauExceptionList.propTypes = {
  Name: PropTypes.string.isRequired,
};


EditBureauExceptionList.defaultProps = {
  Name: '',
};

export default EditBureauExceptionList;
