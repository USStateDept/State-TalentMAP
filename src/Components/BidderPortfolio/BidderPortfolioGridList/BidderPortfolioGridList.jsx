import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Accordion, AccordionItem } from 'Components/Accordion';
import { BIDDER_RESULTS } from '../../../Constants/PropTypes';
import BidderPortfolioStatRow from '../BidderPortfolioStatRow';

class BidderPortfolioGridList extends Component {
  constructor(props) {
    super(props);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.accordionItemsStates = this.accordionItemsStates.bind(this);
    this.state = {
      expandAll: true,
      acItems: {
      },
    };
  }

  toggleExpand() {
    this.setState({ expandAll: !this.state.expandAll });
  }

  accordionItemsStates(acID, acState) {
    const { acItems } = this.state;
    acItems[acID] = acState;
    this.setState({ acItems });
    const accStates = Object.values(this.state.acItems);
    const isAllFalse = a => a === false;
    const isAllTrue = a => a === true;

    if (accStates.every(isAllFalse) && accStates.length === this.props.results.length) {
      this.setState({ expandAll: false });
    } else if (accStates.every(isAllTrue) && accStates.length === this.props.results.length) {
      this.setState({ expandAll: true });
    }
  }

  render() {
    const { results, showEdit } = this.props;
    const expandAll = this.state.expandAll;
    let expandText = 'Expand All';
    let expandIcon = 'plus';
    if (expandAll) {
      expandText = 'Collapse All';
      expandIcon = 'minus';
    }
    return (
      <div>
        <button className="usa-accordion-button-all" title={expandText} onClick={this.toggleExpand}>
          <FontAwesome name={expandIcon} /></button>
        <Accordion className="usa-grid-full accordion-inverse user-dashboard portfolio-row-list" isMultiselectable>
          {
              results.map(result => (
                <AccordionItem
                  className="portfolio-row"
                  id={`${result.id}-row`}
                  key={result.id}
                  title={result.name}
                  expanded={expandAll}
                  setAccordion={this.accordionItemsStates}
                >
                  <BidderPortfolioStatRow
                    userProfile={result}
                    showEdit={showEdit}
                  />
                </AccordionItem>
              ))
            }
        </Accordion>
      </div>
    );
  }
}

BidderPortfolioGridList.propTypes = {
  results: BIDDER_RESULTS.isRequired,
  showEdit: PropTypes.bool,
};

BidderPortfolioGridList.defaultProps = {
  showEdit: false,
};

export default BidderPortfolioGridList;
