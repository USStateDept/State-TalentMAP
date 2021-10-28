import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { useState } from 'react';
import { useCloseSwalOnUnmount } from 'utilities';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const ChecklistModal = props => {
  const { checkList, submitBtnText, cancelBtnText, onSubmit, rowDivider, titleDivider } = props;
  const [allChecked, setAllChecked] = useState(false);

  useCloseSwalOnUnmount();

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  // const onCheck = (e) => {
  // };

  const renderContent = () => checkList.map(c => (
    <div className={`a ${rowDivider ? 'row-divider' : ''}`}>
      <div className="b">
        <input
          type="checkbox"
          value={c.checked}
          checked={c.checked}
          // onChange={e => this.onCheck(e)}
        />
      </div>
      <div className="c">
        {c.text}
      </div>
    </div>));

  return (
    <div className="checklist-modal">
      <form className={`${titleDivider ? 'title-divider' : ''}`}>
        <div>
          {renderContent()}
          <div className="checklist-modal-buttons-container">
            <button onClick={cancel}>{cancelBtnText}</button>
            <button
              onClick={submit}
              // disabled={!notAllTrue}
            >
              {submitBtnText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

ChecklistModal.propTypes = {
  rowDivider: PropTypes.bool,
  titleDivider: PropTypes.bool,
  checkList: PropTypes.shape({}),
  submitBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  onSubmit: PropTypes.func,
};

ChecklistModal.defaultProps = {
  rowDivider: false,
  titleDivider: true,
  checkList: {},
  submitBtnText: 'Submit',
  cancelBtnText: 'Cancel',
  onSubmit: EMPTY_FUNCTION,
};

export default ChecklistModal;
