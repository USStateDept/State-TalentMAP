import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, orderBy } from 'lodash';
import { formatIdSpacing, getItemLabel, mapDuplicates } from 'utilities';
import { FILTER_ITEM } from 'Constants/PropTypes';
import Accordion, { AccordionItem } from '../../Accordion';
import CheckBox from '../../CheckBox';
import bannerImg from '../../../assets/svg/filter-flag.svg';

/* eslint-disable react/no-unused-prop-types */
class PostFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDomesticSelected: false,
      allOverseasSelected: false,
      allCommuterPostsSelected: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.setSelectedStates();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setSelectedStates(nextProps);
  }

  onCheckBoxClick = (value, props) => {
    this.props.queryParamToggle(props.selectionRef, props[this.props.queryProperty], !value);
  };

  onSelectAllDomesticPosts = value => {
    const { allOverseasSelected } = this.state;
    const { queryParamUpdate, item } = this.props;
    this.setState({ allDomesticSelected: !value },
      queryParamUpdate({
        [item.item.selectionRef]: '',
        is_domestic: [value ? 'true' : '', allOverseasSelected ? 'false' : ''].filter(n => n).join(),
      }),
    );
  };

  onSelectAllOverseasPosts = value => {
    const { allDomesticSelected } = this.state;
    const { queryParamUpdate, item } = this.props;
    this.setState({ allOverseasSelected: !value },
      queryParamUpdate({
        [item.item.selectionRef]: '',
        is_domestic: [allDomesticSelected ? 'true' : '', value ? 'false' : ''].filter(n => n).join(),
      }),
    );
  };

  onSelectAllCommuterPosts = value => {
    const { queryParamUpdate, commuterPosts } = this.props;
    this.setState({ allCommuterPostsSelected: !value },
      queryParamUpdate({
        [commuterPosts.item.selectionRef]: value ? commuterPosts.data.map(m => m.code).join(',') : '',
      }),
    );
  };

  setSelectedStates(props = this.props) {
    this.setState({
      allDomesticSelected: props.domesticIsSelected,
      allOverseasSelected: props.overseasIsSelected,
      allCommuterPostsSelected: this.isAllCommuterPostsSelected(props),
    });
  }

  getAllDomesticCodes(props = this.props) {
    return props.item.data.slice().filter(b => (
      b.location &&
      (b.location.country === 'United States' || b.location.country === 'USA')
    ));
  }

  getAllOverseasCodes(props = this.props) {
    return props.item.data.slice().filter(b => (
      get(b, 'location') &&
      get(b, 'location.country') !== 'United States' &&
      get(b, 'location.country') !== 'USA'
    ));
  }

  isAllCommuterPostsSelected(props = this.props) {
    let allGroupChildrenSelected = true;
    get(props, 'commuterPosts.data', []).some((itemData) => {
      if (!itemData.isSelected) {
        allGroupChildrenSelected = false;
        return true;
      }
      return false;
    });
    return allGroupChildrenSelected;
  }

  render() {
    const { item, autoSuggestProps, commuterPosts } = this.props;
    const { allOverseasSelected, allDomesticSelected } = this.state;
    const { isTandemSearch } = this.context;

    let domesticPosts = this.getAllDomesticCodes();
    domesticPosts = mapDuplicates(domesticPosts);

    let overseasPosts = this.getAllOverseasCodes();

    domesticPosts = orderBy(domesticPosts || [], 'location.city');
    overseasPosts = orderBy(overseasPosts || [], 'location.city');

    const postSelectionDisabled = allDomesticSelected || allOverseasSelected;

    if (postSelectionDisabled) { autoSuggestProps.placeholder = 'Remove regional filters'; }

    const commuterPosts$ = get(commuterPosts, 'data', []);

    const allCommuterPostsSelected = this.isAllCommuterPostsSelected();

    return (
      <div className="usa-grid-full">
        {/*
          // No autosuggest from available positions API
          // Could re-add in future
          !useAP &&
          <AutoSuggest
            {...autoSuggestProps}
            className="post-auto-suggest-container"
            customInputProps={{
              disabled: postSelectionDisabled,
            }}
            shouldClearOnSelect
          />
        */}
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
                    const itemData$ = { ...itemData };
                    if (itemData$.hasDuplicateDescription) {
                      itemData$.custom_description = `${itemData$.custom_description} (${itemData.code})`;
                    }
                    const itemLabel = getItemLabel(itemData$);
                    const itemLabelNoSpaces = formatIdSpacing(itemLabel);
                    const unique = itemData?.code || itemData?.id;
                    return (
                      <CheckBox
                        _id={itemData.id} /* when we need the original id */
                        id={`checkbox${itemLabelNoSpaces}-domestic-post-${item.item.description}-${unique}`}
                        key={`checkbox${itemLabel}-domestic-post-${item.item.description}-${unique}`}
                        label={itemLabel}
                        title={itemLabel}
                        name={itemLabel}
                        value={allDomesticSelected ? true : itemData$.isSelected || false}
                        code={itemData$.code}
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
                    const unique = itemData?.code || itemData?.id;
                    return (
                      <CheckBox
                        _id={itemData.id} /* when we need the original id */
                        id={`checkbox${itemLabelNoSpaces}-overseas-post-${item.item.description}-${unique}`}
                        key={`checkbox${itemLabel}-overseas-post-${item.item.description}-${unique}`}
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
            {
              !!commuterPosts$.length && isTandemSearch &&
              <AccordionItem
                className="accordion-content-small"
                id="commuter-post-sub-accordion"
                title={
                  <span>
                    <img src={bannerImg} alt="banner" className="commuter-post-filter-ribbon" />
                    Commuter Posts
                  </span>
                }
                buttonClass="tm-nested-accordion-button"
                preContent={(
                  <CheckBox
                    id="select-all-commuter"
                    onCheckBoxClick={this.onSelectAllCommuterPosts}
                    className="tm-checkbox-transparent"
                    value={allCommuterPostsSelected}
                    label="Toggle filter by commuter post positions"
                    labelSrOnly
                  />
                )}
              >
                <div className="usa-grid-full">
                  {
                    orderBy(commuterPosts$, 'description').map((itemData) => {
                      const itemLabel = getItemLabel(itemData);
                      const itemLabelNoSpaces = formatIdSpacing(itemLabel);
                      return (
                        <CheckBox
                          _id={itemData.code} /* when we need the original id */
                          id={`checkbox${itemLabelNoSpaces}-commuter-post-${item.item.description}`}
                          key={`checkbox${itemLabel}-commuter-post-${item.item.description}`}
                          label={itemLabel}
                          title={itemLabel}
                          name={itemLabel}
                          value={itemData.isSelected || false}
                          code={itemData.code}
                          selectionRef={commuterPosts.item.selectionRef}
                          onCheckBoxClick={this.onCheckBoxClick}
                          className="tm-checkbox-transparent"
                        />
                      );
                    })
                  }
                </div>
              </AccordionItem>
            }
          </Accordion>
        </div>
      </div>
    );
  }
}

PostFilter.contextTypes = {
  isTandemSearch: PropTypes.bool,
};

PostFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  queryProperty: PropTypes.string,
  autoSuggestProps: PropTypes.shape({ placeholder: PropTypes.string }).isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  commuterPosts: FILTER_ITEM,
  // these props are used by function param, so ignore lines:
  overseasIsSelected: PropTypes.bool, // eslint-disable-line
  domesticIsSelected: PropTypes.bool, // eslint-disable-line
};

PostFilter.defaultProps = {
  queryProperty: '_id',
  commuterPosts: { data: [], item: {} },
  overseasIsSelected: false,
  domesticIsSelected: false,
};
/* eslint-enable react/no-unused-prop-types */

export default PostFilter;
