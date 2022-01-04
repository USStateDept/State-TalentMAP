import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import swal from '@sweetalert/with-react';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import CheckBox from 'Components/CheckBox';

const ChecklistModal = props => {
  const {
    checkList, submitBtnText, cancelBtnText,
    onSubmit, rowDivider, titleDivider, onCheck,
  } = props;

  const cancel = (e) => {
    e.preventDefault();
    try {
      swal.close();
    } catch {
      return null;
    }
    return null;
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const checkboxClicked = (e, id) => {
    onCheck(e, id);
  };

  const renderContent = () => checkList.map(c => {
    if (!isEqual(onCheck, EMPTY_FUNCTION)) {
      return (
        <div className={`row ${rowDivider ? 'row-divider' : ''}`}>
          <div className="checkbox">
            <CheckBox
              label="check"
              id={c.id}
              value={c.checked}
              labelSrOnly
              onCheckBoxClick={e => checkboxClicked(c.id, e)}
            />
          </div>
          <div className="text">
            {c.text}
          </div>
        </div>);
    }

    return (
      <div className={`row ${rowDivider ? 'row-divider' : ''}`}>
        <div className="checkbox">
          <CheckBox
            label="check"
            id={c.id}
            value={c.checked}
            labelSrOnly
          />
        </div>
        <div className="text">
          {c.text}
        </div>
      </div>);
  });

  return (
    <div className="checklist-modal">
      <form className={`${titleDivider ? 'title-divider' : ''}`}>
        <div>
          {renderContent()}
          <div className="checklist-modal-buttons-container">
            <button type="button" onClick={cancel}>{cancelBtnText}</button>
            <button type="button" onClick={submit}>{submitBtnText}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

ChecklistModal.propTypes = {
  rowDivider: PropTypes.bool,
  titleDivider: PropTypes.bool,
  checkList: PropTypes.arrayOf(PropTypes.string),
  submitBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  onSubmit: PropTypes.func,
  onCheck: PropTypes.func,
};

ChecklistModal.defaultProps = {
  rowDivider: false,
  titleDivider: true,
  checkList: [],
  submitBtnText: 'Submit',
  cancelBtnText: 'Cancel',
  onSubmit: EMPTY_FUNCTION,
  onCheck: EMPTY_FUNCTION,
};

export default ChecklistModal;
