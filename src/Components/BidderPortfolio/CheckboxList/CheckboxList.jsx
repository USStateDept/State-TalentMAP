import { indexOf } from 'lodash';
import Picky from 'react-picky';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox';
import ClientBadge from '../ClientBadge';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const CheckboxList = ({ list, editMode, updateClassifications,
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
    <div className="classifications-badges">
      {list.map((c) => {
        const checked = input.includes(c.code);
        const tenDiffFlag = c.text === 'Tenured 4' || c.text === 'Differential Bidders' ? true : '';
        return (
          <div className="classifications-client-badges">
            {tenDiffFlag &&
              <div className="classifications-dropdown">
                <Picky
                  placeholder={c.text}
                />
              </div>
            }
            <ClientBadge
              key={c.code}
              type={c.code}
              status={checked}
              showShortCode={false}
            />
            <div className="classifications-badges-text">
              {c.text}
            </div>
          </div>
        );
      })
      }
    </div>
    {list.map((c) => {
      const checked = indexOf(input, c.code) > -1;
      return (
        <CheckBox
          id={c.code}
          label={c.text}
          small
          value={checked}
          key={c.code}
          disabled={editMode}
          className="tm-checkbox-disabled-alternate"
          onChange={updateClassifications}
        />
      );
    })
    }
  </div>
);

CheckboxList.propTypes = {
  list: CLASSIFICATIONS,
  editMode: PropTypes.bool,
  updateClassifications: PropTypes.function,
  input: CLIENT_CLASSIFICATIONS,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
  input: [],
  editMode: false,
  updateClassifications: EMPTY_FUNCTION,
};

export default CheckboxList;
