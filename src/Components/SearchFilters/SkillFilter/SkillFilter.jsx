import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEM } from '../../../Constants/PropTypes';
import Accordion, { AccordionItem } from '../../Accordion';
import CheckBox from '../../CheckBox';
import { getItemLabel, formatIdSpacing } from '../../../utilities';

class BureauFilter extends Component {
  constructor(props) {
    super(props);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    this.onConeCheckBoxClick = this.onConeCheckBoxClick.bind(this);
  }

  componentWillMount() {
    this.setParentCheckboxes();
  }

  componentWillReceiveProps(nextProps) {
    this.setParentCheckboxes(nextProps);
  }

  onCheckBoxClick(value, props) {
    this.props.queryParamToggle(props.selectionRef, props[this.props.queryProperty], !value);
  }

  // Click handler for cone check box.
  // Gather all the currently selected skills from other
  // cones, and place them in an array with all of the selected cone's
  // skills, if new value is true. Otherwise, only set the currently
  // selected skills, excluding the selected cone's skills.
  onConeCheckBoxClick(value, props) {
    const { item, queryParamUpdate } = this.props;
    const { cone } = props;
    const shouldRemoveChildren = !value;
    const qArr = [];
    item.data.forEach((itemData) => {
      if (itemData.cone === cone.name && !shouldRemoveChildren) {
        qArr.push(itemData.code);
      } else if (itemData.cone !== cone.name && itemData.isSelected) {
        qArr.push(itemData.code);
      }
    });
    const q = { [item.item.selectionRef]: qArr.join() };
    this.setState({ [cone.id]: !value });
    queryParamUpdate(q);
  }

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
                id={`skill-cone-accordion-${cone.id}`}
                title={cone.name}
                buttonClass="tm-nested-accordion-button"
                preContent={(
                  <CheckBox
                    cone={cone /* pass cone to reference in onClick handler */}
                    id={`select-all-cone-${cone.id}`}
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
                      if (matchesCone) {
                        return (
                          <CheckBox
                            _id={itemData.id} /* when we need the original id */
                            id={`checkbox${itemLabelNoSpaces}-skill-${cone.id}`}
                            key={`checkbox${itemLabel}-skill-${cone.id}`}
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
