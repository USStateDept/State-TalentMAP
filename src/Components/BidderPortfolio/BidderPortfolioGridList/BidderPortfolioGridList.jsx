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
    this.state = {
      expandAll: true,
    };
  }

  toggleExpand() {
    this.setState({ expandAll: !this.state.expandAll });
  }

  render() {
    const { results, showEdit } = this.props;
    const expandAll = this.state.expandAll;
    return (
      <div>
        <button className="usa-accordion-button-all" title={expandAll ? 'Collapse All' : 'Expand All'} onClick={this.toggleExpand}>
          <FontAwesome name={expandAll ? 'minus' : 'plus'} /></button>
        <Accordion className="usa-grid-full accordion-inverse user-dashboard portfolio-row-list" isMultiselectable>
          {
              results.map(result => (
                <AccordionItem
                  className="portfolio-row"
                  id={`${result.id}-row`}
                  key={result.id}
                  title={result.name}
                  expanded={expandAll}
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
