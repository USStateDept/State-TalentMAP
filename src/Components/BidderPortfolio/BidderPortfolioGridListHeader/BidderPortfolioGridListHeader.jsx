import CheckBox from '../../CheckBox';
import BidderPortfolioGridListHeaderItem from './BidderPortfolioGridListHeaderItem';

const BidderPortfolioGridListHeader = () => (
  <div className="usa-grid-full portfolio-grid-list-header">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-fourth grid-list-header-col-one">
        <div className="usa-grid-full">
          <div className="usa-width-one-sixth">
            <CheckBox
              id="grid-header-select-all"
              label="Select all"
              value={false}
              labelSrOnly
              small
            />
          </div>
          <div className="usa-width-five-sixths">
            <BidderPortfolioGridListHeaderItem content="Name / Level" />
          </div>
        </div>
      </div>
      <div className="usa-width-one-fourth grid-list-header-col-two">
        <BidderPortfolioGridListHeaderItem content="Skill / Birthdate" />
      </div>
      <div className="usa-width-one-fourth grid-list-header-col-three">
        <BidderPortfolioGridListHeaderItem content="Draft bids / Submitted bids" />
      </div>
      <div className="usa-width-one-fourth grid-list-header-col-four">
        &nbsp;
      </div>
    </div>
  </div>
);

export default BidderPortfolioGridListHeader;
