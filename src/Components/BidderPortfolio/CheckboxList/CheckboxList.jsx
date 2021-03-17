import PropTypes from 'prop-types';
import { Accordion, AccordionItem } from 'Components/Accordion';
// import FontAwesome from 'react-fontawesome';
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
      // need to update with te_id
      let checked = false;
      input.forEach((item) => {
        // if (item.te_id === c.te_id) {
        if (item.tp_code === c.code || item.code === c.code) {
          checked = true;
        }
      });
      const tenDiffFlag = c.text === 'Tenured 4' || c.text === 'Differential Bidder' ? true : '';
      // const expandText = 'Expand All';
      // const expandIcon = 'plus';
      // const showExpand = false;
      return (
        <div className="classifications-client-badges">
          {tenDiffFlag &&
            <div className="classifications-dropdown">
              {/* {
                showExpand &&
                <button className="usa-accordion-button-all"
                 title={expandText} onClick={this.toggleExpand}>
                  <FontAwesome name={expandIcon} />
                </button>
              } */}
              <Accordion className="usa-grid-full accordion-inverse user-dashboard portfolio-row-list" isMultiselectable>
                {
                  <AccordionItem
                    controlled
                    // className="portfolio-row"
                    // id={`${result.id}-row`}
                    key={c.te_id}
                    // title={c.season_text}
                    title={c.text}
                    // setAccordion={this.onSetAccordion}
                    // ref={(ref) => { this[`accordion-${result.id}`] = ref; }}
                    // refs are defined from the id of the result
                  />
                }
              </Accordion>
            </div>
          }
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
