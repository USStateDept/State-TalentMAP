import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FILTER_ITEM } from '../../../Constants/PropTypes';
import Accordion, { AccordionItem } from '../../Accordion';
import CheckBox from '../../CheckBox';
import { getItemLabel, formatIdSpacing } from '../../../utilities';

class LanguageFilter extends Component {
  constructor(props) {
    super(props);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    this.onGroupCheckBoxClick = this.onGroupCheckBoxClick.bind(this);
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

  // Click handler for group check box.
  // Gather all the currently selected languages from other
  // groups, and place them in an array with all of the selected group's
  // languages, if new value is true. Otherwise, only set the currently
  // selected languages, excluding the selected groups's languages.
  onGroupCheckBoxClick(value, props) {
    // expand the accordion if the user selects that group
    const groupId = get(props, 'cone.id');
    if (value && groupId) {
      const el = document.getElementById(`language-group-accordion-${groupId}-button`);
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
    const qArr = [];
    item.data.forEach((itemData) => {
      if (!(cone.useAll && shouldRemoveChildren)) {
        if ((itemData.group === cone.name || cone.useAll) && !shouldRemoveChildren) {
          qArr.push(itemData.code);
        } else if (itemData.group !== cone.name && itemData.isSelected) {
          qArr.push(itemData.code);
        }
      }
    });
    const q = { [item.item.selectionRef]: qArr.join() };
    this.setState({ [cone.id]: !value });
    queryParamUpdate(q);
  }

  // Iterate through each group's children to determine if they're
  // all selected. If so, setState of that group's id to true, or false
  // if they're not all selected.
  setParentCheckboxes(props = this.props) {
    const stateToSet = {};
    props.languageGroups.data.forEach((group) => {
      let allGroupChildrenSelected = true;
      props.item.data.some((itemData) => {
        if ((itemData.group === group.name || group.useAll) && !itemData.isSelected) {
          allGroupChildrenSelected = false;
          return true;
        }
        return false;
      });
      stateToSet[group.id] = allGroupChildrenSelected;
    });
    this.setState(stateToSet);
  }

  render() {
    const { item, languageGroups } = this.props;
    const languageGroups$ = (languageGroups.data || []).map((m) => {
      const m$ = { ...m };
      if (m.useAll) {
        m$.languages = item.data.map(n => n.long_description);
      }
      return m$;
    });
    return (
      <div className="usa-grid-full tm-nested-accordions">
        <Accordion>
          {
            languageGroups$.map(group => (
              <AccordionItem
                key={group.id}
                className="accordion-content-small"
                id={`language-group-accordion-${group.id}`}
                title={group.name}
                buttonClass="tm-nested-accordion-button"
                expanded // keep expanded by default
                preContent={(
                  <CheckBox
                    cone={group /* pass group to reference in onClick handler */}
                    id={`select-all-group-${group.id}`}
                    onCheckBoxClick={this.onGroupCheckBoxClick}
                    className="tm-checkbox-transparent"
                    value={this.state[group.id] || false}
                    label={`Toggle filter by all positions with group name ${group.name}`}
                    labelSrOnly
                  />
                )}
              >
                <div className="usa-grid-full">
                  {
                    item.data.map((itemData) => {
                      const itemLabel = getItemLabel(itemData);
                      const itemLabelNoSpaces = formatIdSpacing(itemLabel);
                      const matchesCone = itemData.languageGroup === group.name || group.useAll;
                      if (matchesCone) {
                        return (
                          <CheckBox
                            _id={itemData.id} /* when we need the original id */
                            id={`checkbox${itemLabelNoSpaces}-language-${group.id}`}
                            key={`checkbox${itemLabel}-language-${group.id}`}
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

LanguageFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  queryProperty: PropTypes.string,
  languageGroups: FILTER_ITEM,
};

LanguageFilter.defaultProps = {
  queryProperty: 'code',
  languageGroups: { data: [] },
};

export default LanguageFilter;
