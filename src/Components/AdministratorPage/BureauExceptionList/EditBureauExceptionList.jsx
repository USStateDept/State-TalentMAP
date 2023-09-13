import { useState } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { saveBureauExceptionSelections } from 'actions/bureauException';
import CheckBox from '../../CheckBox/CheckBox';
import TextInput from '../../TextInput/TextInput';


const EditBureauExceptionList = (props) => {
  const { BureauExceptionOptionsData, dispatch, user } = props;
  const data = BureauExceptionOptionsData;
  const [selectAll, setSelectAll] = useState(false);
  const [checkedBureauIds, setCheckedBureauIds] = useState([]);
  const [bureau, setBureau] = useState('');
  const [bureauUser, setBureauUser] = useState(user);

  const submit = (e) => {
    // bureauUser stores the user and bureau to be added
    // Doing nothing for now but closing.
    dispatch(saveBureauExceptionSelections(bureauUser));
    e.preventDefault();
    swal.close();
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
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
                  changeText={(e) => setBureau(e)}
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
                data?.length &&
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
  BureauExceptionOptionsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    bureaus: PropTypes.arrayOf(PropTypes.string),
  })),
  dispatch: PropTypes.func.isRequired,
};


EditBureauExceptionList.defaultProps = {
  user: {
    id: 0,
    Name: '',
    BureauNames: [],
  },
  BureauExceptionOptionsData: [],
  dispatch: () => {},
};

export default EditBureauExceptionList;
