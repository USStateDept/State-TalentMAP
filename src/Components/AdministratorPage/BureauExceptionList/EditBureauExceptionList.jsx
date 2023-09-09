import { useState } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import CheckBox from '../../CheckBox/CheckBox';
import TextInput from '../../TextInput/TextInput';


const EditBureauExceptionList = (props) => {
  const { user } = props;

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
    { id: 10, bureaus: ['OO'] },
    { id: 11, bureaus: ['RR'] },
    { id: 12, bureaus: ['BO'] },
    { id: 13, bureaus: ['FS'] },
    { id: 14, bureaus: ['FX'] },
    { id: 15, bureaus: ['UL'] },
    { id: 16, bureaus: ['BX'] },
    { id: 17, bureaus: ['FY'] },
    { id: 18, bureaus: ['ZW'] },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [checkedBureauIds, setCheckedBureauIds] = useState([]);
  const [bureau, setBureau] = useState('');
  const [bureauUser, setBureauUser] = useState(user);

  const submit = (e) => {
    // bureauUser stores the user and bureaus to be added
    // Doing nothing for now but closing.
    e.preventDefault();
    swal.close();
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const onChangeText = (e) => {
    setBureau(e);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedBureauIds(
        data.map(bu => bu.id),
      );
      setBureauUser({ ...bureauUser, BureauNames: data.map(bu => bu.bureaus[0]) });
    } else {
      setSelectAll(false);
      setCheckedBureauIds([]);
    }
  };

  const handleSelectBureau = (bu => {
    if (checkedBureauIds.includes(bu.id)) {
      const filteredBureau = checkedBureauIds.filter(x => x !== bu.id);
      const filteredBureauNames = bureauUser.BureauNames.filter(x => x !== bu.bureaus[0]);
      setCheckedBureauIds(filteredBureau);
      setBureauUser({ ...bureauUser, BureauNames: filteredBureauNames });
    } else {
      setCheckedBureauIds([...checkedBureauIds, bu.id]);
      setBureauUser({
        ...bureauUser, BureauNames: [...bureauUser.BureauNames, bu.bureaus[0]],
      });
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
                  label={`F/S Employee Name: ${user.Name}`}
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
            <div className="bureau-exception-text-table">
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
            </div>
          </tbody>
        </table>
        <button onClick={submit} type="submit">Add Bureau(s)</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

EditBureauExceptionList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    Name: PropTypes.string,
    BureauNames: PropTypes.arrayOf(PropTypes.string),
  }),
};


EditBureauExceptionList.defaultProps = {
  user: {
    id: 0,
    Name: '',
    BureauNames: [],
  },
};

export default EditBureauExceptionList;
