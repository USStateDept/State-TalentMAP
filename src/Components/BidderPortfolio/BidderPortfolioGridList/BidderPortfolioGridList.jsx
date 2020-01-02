import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionItem } from 'Components/Accordion';
import { BIDDER_RESULTS } from '../../../Constants/PropTypes';
import BidderPortfolioStatRow from '../BidderPortfolioStatRow';

const BidderPortfolioGridList = ({ results, showEdit }) => (
  <Accordion className="usa-grid-full accordion-inverse user-dashboard portfolio-row-list" isMultiselectable>
    {
      results.map(result => (
        <AccordionItem
          className="portfolio-row"
          id={`${result.id}-row`}
          key={result.id}
          title={result.name}
        >
          <BidderPortfolioStatRow
            userProfile={result}
            showEdit={showEdit}
          />
        </AccordionItem>
      ))
    }
  </Accordion>
);

BidderPortfolioGridList.propTypes = {
  results: BIDDER_RESULTS.isRequired,
  showEdit: PropTypes.bool,
};

BidderPortfolioGridList.defaultProps = {
  showEdit: false,
};

export default BidderPortfolioGridList;
