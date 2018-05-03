import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEM } from '../../../Constants/PropTypes';
import Accordion, { AccordionItem } from '../../Accordion';
import CheckBox from '../../CheckBox';
import { getItemLabel, formatIdSpacing, propSort } from '../../../utilities';
import AutoSuggest from '../../AutoSuggest';

/* eslint-disable react/no-unused-prop-types */
class PostFilter extends Component {
  constructor(props) {
    super(props);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    this.onSelectAllDomesticPosts = this.onSelectAllDomesticPosts.bind(this);
    this.onSelectAllOverseasPosts = this.onSelectAllOverseasPosts.bind(this);
    this.state = {
      allDomesticSelected: false,
      allOverseasSelected: false,
    };
  }

  componentWillMount() {
    this.setSelectedStates();
  }

  componentWillReceiveProps(nextProps) {
    this.setSelectedStates(nextProps);
  }

  onCheckBoxClick(value, props) {
    this.props.queryParamToggle(props.selectionRef, props[this.props.queryProperty], !value);
  }

  onSelectAllDomesticPosts(value) {
    const { allOverseasSelected } = this.state;
    const { queryParamUpdate, item } = this.props;
    this.setState({ allDomesticSelected: !value },
      queryParamUpdate({
        [item.item.selectionRef]: '',
        is_domestic: [value ? 'true' : '', allOverseasSelected ? 'false' : ''].filter(n => n).join(),
      }),
    );
  }

  onSelectAllOverseasPosts(value) {
    const { allDomesticSelected } = this.state;
    const { queryParamUpdate, item } = this.props;
    this.setState({ allOverseasSelected: !value },
      queryParamUpdate({
        [item.item.selectionRef]: '',
        is_domestic: [allDomesticSelected ? 'true' : '', value ? 'false' : ''].filter(n => n).join(),
      }),
    );
  }

  setSelectedStates(props = this.props) {
    this.setState({
      allDomesticSelected: props.domesticIsSelected,
      allOverseasSelected: props.overseasIsSelected,
    });
  }

  getAllDomesticCodes(props = this.props) {
    return props.item.data.slice().filter(b => (b.location && b.location.country === 'United States'));
  }

  getAllOverseasCodes(props = this.props) {
    return props.item.data.slice().filter(b => (b.location && b.location.country !== 'United States'));
  }

  render() {
    const { item, autoSuggestProps } = this.props;
    const { allOverseasSelected, allDomesticSelected } = this.state;

    const domesticPosts = this.getAllDomesticCodes();
    const overseasPosts = this.getAllOverseasCodes();

    domesticPosts.sort(propSort('location', 'city'));
    overseasPosts.sort(propSort('location', 'city'));

    const postSelectionDisabled = allDomesticSelected || allOverseasSelected;

    if (postSelectionDisabled) { autoSuggestProps.placeholder = 'Remove regional filters'; }

    return (
      <div className="usa-grid-full">
        <AutoSuggest
          {...autoSuggestProps}
          className="post-auto-suggest-container"
          customInputProps={{
            disabled: postSelectionDisabled,
          }}
        />
        <div className="usa-grid-full tm-nested-accordions">
          <Accordion>
            <AccordionItem
              className="accordion-content-small"
              id="domestic-post-sub-accordion"
              title="Domestic"
              preContent={(
                <CheckBox
                  id="select-all-domestic"
                  onCheckBoxClick={this.onSelectAllDomesticPosts}
                  className="tm-checkbox-transparent"
                  value={this.state.allDomesticSelected}
                  label="Toggle filter by domestic positions"
                  labelSrOnly
                />
              )}
              buttonClass="tm-nested-accordion-button"
            >
              <div className="usa-grid-full">
                {
                  domesticPosts.map((itemData) => {
                    const itemLabel = getItemLabel(itemData);
                    const itemLabelNoSpaces = formatIdSpacing(itemLabel);
                    return (
                      <CheckBox
                        _id={itemData.id} /* when we need the original id */
                        id={`checkbox${itemLabelNoSpaces}-domestic-post-${item.item.description}`}
                        key={`checkbox${itemLabel}-domestic-post-${item.item.description}`}
                        label={itemLabel}
                        title={itemLabel}
                        name={itemLabel}
                        value={allDomesticSelected ? true : itemData.isSelected || false}
                        code={itemData.code}
                        selectionRef={item.item.selectionRef}
                        onCheckBoxClick={this.onCheckBoxClick}
                        className="tm-checkbox-transparent"
                        disabled={allDomesticSelected || allOverseasSelected}
                      />
                    );
                  })
                }
              </div>
            </AccordionItem>
            <AccordionItem
              className="accordion-content-small"
              id="overseas-post-sub-accordion"
              title="Overseas"
              buttonClass="tm-nested-accordion-button"
              preContent={(
                <CheckBox
                  id="select-all-overseas"
                  onCheckBoxClick={this.onSelectAllOverseasPosts}
                  className="tm-checkbox-transparent"
                  value={this.state.allOverseasSelected}
                  label="Toggle filter by overseas positions"
                  labelSrOnly
                />
              )}
            >
              <div className="usa-grid-full">
                {
                  overseasPosts.map((itemData) => {
                    const itemLabel = getItemLabel(itemData);
                    const itemLabelNoSpaces = formatIdSpacing(itemLabel);
                    return (
                      <CheckBox
                        _id={itemData.id} /* when we need the original id */
                        id={`checkbox${itemLabelNoSpaces}-overseas-post-${item.item.description}`}
                        key={`checkbox${itemLabel}-overseas-post-${item.item.description}`}
                        label={itemLabel}
                        title={itemLabel}
                        name={itemLabel}
                        value={allOverseasSelected ? true : itemData.isSelected || false}
                        code={itemData.code}
                        selectionRef={item.item.selectionRef}
                        onCheckBoxClick={this.onCheckBoxClick}
                        className="tm-checkbox-transparent"
                        disabled={allOverseasSelected || allDomesticSelected}
                      />
                    );
                  })
                }
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    );
  }
}

PostFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  queryProperty: PropTypes.string,
  autoSuggestProps: PropTypes.shape({}).isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  // these props are used by function param, so ignore lines:
  overseasIsSelected: PropTypes.bool, // eslint-disable-line
  domesticIsSelected: PropTypes.bool, // eslint-disable-line
};

PostFilter.defaultProps = {
  queryProperty: '_id',
  overseasIsSelected: false,
  domesticIsSelected: false,
};
/* eslint-enable react/no-unused-prop-types */

export default PostFilter;
