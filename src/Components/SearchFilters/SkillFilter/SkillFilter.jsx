import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, uniq } from 'lodash';
import { FILTER_ITEM } from '../../../Constants/PropTypes';
import Accordion, { AccordionItem } from '../../Accordion';
import CheckBox from '../../CheckBox';
import { formatIdSpacing, getItemLabel } from '../../../utilities';

class BureauFilter extends Component {
  UNSAFE_componentWillMount() {
    this.setParentCheckboxes();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setParentCheckboxes(nextProps);
  }

  onCheckBoxClick = (value, props) => {
    this.props.queryParamToggle(props.selectionRef, props[this.props.queryProperty], !value);
  };

  // Click handler for cone check box.
  // Gather all the currently selected skills from other
  // cones, and place them in an array with all of the selected cone's
  // skills, if new value is true. Otherwise, only set the currently
  // selected skills, excluding the selected cone's skills.
  onConeCheckBoxClick = (value, props) => {
    // expand the accordion if the user selects that cone
    const coneId = get(props, 'cone.id');
    if (value && coneId) {
      const el = document.getElementById(`skill-cone-accordion-${coneId}-button`);
      if (el) {
        const isOpen = el.getAttribute('aria-expanded') === 'true';
        if (!isOpen) {
          el.click();
        }
      }
    }

    const { item, queryParamUpdate } = this.props;
    const { cone } = props;
    const shouldRemoveChildren = !value;
    let qArr = [];

    item.data.forEach((itemData) => {
      if (itemData.cone === cone.name && !shouldRemoveChildren) {
        qArr.push(itemData.code);
      } else if (itemData.cone !== cone.name && itemData.isSelected) {
        qArr.push(itemData.code);
      }
    });

    // clean up any duplicate codes from a removed cone that are in other cones
    if (shouldRemoveChildren) {
      const filteredCodes = [...item.data].filter(f => f.cone === cone.name) || [];
      const mappedCodes = filteredCodes.map(f => f.code);
      qArr = qArr.filter(f => !mappedCodes.includes(f));
    }

    // ensure the array has no duplicate values
    qArr = uniq(qArr);

    const q = { [item.item.selectionRef]: qArr.join() };
    this.setState({ [cone.id]: !value });
    queryParamUpdate(q);
  };

  // Iterate through each cones children to determine if they're
  // all selected. If so, setState of that cone's id to true, or false
  // if they're not all selected.
  setParentCheckboxes(props = this.props) {
    const stateToSet = {};
    props.skillCones.data.forEach((cone) => {
      let allConeChildrenSelected = true;
      props.item.data.some((itemData) => {
        if (itemData.cone === cone.name && !itemData.isSelected) {
          allConeChildrenSelected = false;
          return true;
        }
        return false;
      });
      stateToSet[cone.id] = allConeChildrenSelected;
    });
    this.setState(stateToSet);
  }

  doSkillConeChildrenExists(cone) {
    const { item } = this.props;
    if (item.data.find(s => s.cone === cone.name)) {
      return true;
    }
    return false;
  }

  render() {
    const { item, skillCones } = this.props;
    return (
      <div className="usa-grid-full tm-nested-accordions">
        <Accordion>
          {
            skillCones.data.map(cone => (
              this.doSkillConeChildrenExists(cone) &&
              <AccordionItem
                key={cone.id}
                className="accordion-content-small"
                id={`skill-cone-accordion-${cone.id}${item.item.isTandem ? '-tandem' : ''}`}
                title={cone.name}
                buttonClass="tm-nested-accordion-button"
                preContent={(
                  <CheckBox
                    cone={cone /* pass cone to reference in onClick handler */}
                    id={`select-all-cone-${cone.id}${item.item.isTandem ? '-tandem' : ''}`}
                    onCheckBoxClick={this.onConeCheckBoxClick}
                    className="tm-checkbox-transparent"
                    value={this.state[cone.id] || false}
                    label={`Toggle filter by all positions with cone name ${cone.name}`}
                    labelSrOnly
                  />
                )}
              >
                <div className="usa-grid-full">
                  {
                    item.data.map((itemData) => {
                      const itemLabel = getItemLabel(itemData);
                      const itemLabelNoSpaces = formatIdSpacing(itemLabel);
                      const matchesCone = itemData.cone === cone.name;
                      const unique = itemData?.code || itemData?.id;
                      if (matchesCone) {
                        return (
                          <CheckBox
                            _id={itemData.id} /* when we need the original id */
                            id={`checkbox${itemLabelNoSpaces}-skill-${cone.id}${item.item.isTandem ? '-tandem' : ''}-${item.item.description}-${unique}`}
                            key={`checkbox${itemLabel}-skill-${cone.id}-${item.item.description}-${unique}`}
                            label={itemLabel}
                            title={itemLabel}
                            name={itemLabel}
                            value={itemData.isSelected || false}
                            code={itemData.code}
                            selectionRef={item.item.selectionRef}
                            onCheckBoxClick={this.onCheckBoxClick}
                            className="tm-checkbox-transparent"
                          />);
                      }
                      return null;
                    })
                  }
                </div>
              </AccordionItem>
            ))
          }
        </Accordion>
      </div>
    );
  }
}

BureauFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  queryProperty: PropTypes.string,
  skillCones: FILTER_ITEM,
};

BureauFilter.defaultProps = {
  queryProperty: 'code',
  skillCones: { data: [] },
};

export default BureauFilter;
