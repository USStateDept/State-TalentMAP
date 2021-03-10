import { indexOf } from 'lodash';
// import Picky from 'react-picky';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox';
import ClientBadge from '../ClientBadge';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const CheckboxList = ({ list, editView, updateClassifications,
  input }) => (

  <div className="client-checkbox-list">
    <CheckBox
      id="key"
      label="Bidder Has Classification"
      small
      value
      key="key"
      disabled
      checked
      className="tm-checkbox-disabled-alternate"
    />
    {list.map((c) => {
      const checked = indexOf(input, c.code) > -1;
      // const tenDiffFlag = c.text === 'Tenured 4' || c.text ==
      // = 'Differential Bidder' ? true : '';
      return (
        <div className="classifications-client-badges">
          {/* {tenDiffFlag &&
            <div className="classifications-dropdown">
              <Picky
                placeholder={c.text}
              />
            </div>
          } */}
          <ClientBadge
            key={c.te_id}
            type={c}
            status={checked}
            showShortCode={false}
            onChange={updateClassifications}
            editView={editView}
          />
          <div className="classifications-badges-text">
            {c.text}
          </div>
        </div>
      );
    })
    }
  </div>
);

CheckboxList.propTypes = {
  list: CLASSIFICATIONS,
  editView: PropTypes.bool,
  updateClassifications: PropTypes.function,
  input: CLIENT_CLASSIFICATIONS,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
  input: [],
  editView: false,
  updateClassifications: EMPTY_FUNCTION,
};

export default CheckboxList;
