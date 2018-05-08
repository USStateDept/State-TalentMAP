import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { FILTER_ITEM } from '../../../Constants/PropTypes';
import Accordion, { AccordionItem } from '../../Accordion';
import CheckBox from '../../CheckBox';
import { getItemLabel } from '../../../utilities';

class BureauFilter extends Component {
  constructor(props) {
    super(props);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    this.onFunctionalBureauCheckBoxClick = this.onFunctionalBureauCheckBoxClick.bind(this);
  }

  onCheckBoxClick(value, props) {
    this.props.queryParamToggle(props.selectionRef, props[this.props.queryProperty], !value);
  }

  onFunctionalBureauCheckBoxClick(value, props) {
    const { functionalBureaus, queryProperty } = this.props;
    this.props.queryParamToggle(functionalBureaus.item.selectionRef, props[queryProperty], !value);
  }

  render() {
    const { item, functionalBureaus } = this.props;
    const regionalBureaus = item.data.slice().filter(b => b.is_regional);
    // sort the regional bureaus by their calculated label
    const sortedRegionalBureuas = orderBy(regionalBureaus, e => getItemLabel(e));
    return (
      <div className="usa-grid-full tm-nested-accordions">
        <Accordion>
          <AccordionItem className="accordion-content-small" id="regional-bureau-sub-accordion" title="Regional Bureaus" buttonClass="tm-nested-accordion-button">
            <div className="usa-grid-full">
              {
                sortedRegionalBureuas.map((itemData) => {
                  const itemLabel = getItemLabel(itemData);
                  return (<CheckBox
                    _id={itemData.id} /* when we need the original id */
                    id={`checkbox${itemLabel}-region-${item.item.description}`}
                    key={`checkbox${itemLabel}-region-${item.item.description}`}
                    label={itemLabel}
                    title={itemLabel}
                    name={itemLabel}
                    value={itemData.isSelected || false}
                    code={itemData.code}
                    selectionRef={item.item.selectionRef}
                    onCheckBoxClick={this.onCheckBoxClick}
                    className="tm-checkbox-transparent"
                  />);
                })
              }
            </div>
          </AccordionItem>
          <AccordionItem className="accordion-content-small" id="functional-bureau-sub-accordion" title="Functional Bureaus" buttonClass="tm-nested-accordion-button">
            {
              functionalBureaus.data.filter(b => !b.isRegional).map(itemData => (
                <CheckBox
                  _id={itemData.id} /* when we need the original id */
                  id={`checkbox-functional-bureau-${itemData.id}`}
                  key={`checkbox-functional-bureau-${itemData.id}`}
                  label={itemData.name}
                  title={itemData.name}
                  name={itemData.name}
                  value={itemData.isSelected || false}
                  code={itemData.id}
                  selectionRef={item.item.selectionRef}
                  onCheckBoxClick={this.onFunctionalBureauCheckBoxClick}
                  className="tm-checkbox-transparent"
                />))
            }
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

BureauFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  queryProperty: PropTypes.string,
  functionalBureaus: FILTER_ITEM,
};

BureauFilter.defaultProps = {
  queryProperty: 'code',
  functionalBureaus: { data: [] },
};

export default BureauFilter;
