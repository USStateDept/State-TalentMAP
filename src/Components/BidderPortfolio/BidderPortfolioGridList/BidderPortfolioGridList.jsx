import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { Accordion, AccordionItem } from 'Components/Accordion';
import { BIDDER_RESULTS, CLASSIFICATIONS } from '../../../Constants/PropTypes';
import BidderPortfolioStatRow from '../BidderPortfolioStatRow';

export const isAllFalse = a => a === false;
export const isAllTrue = a => a === true;

class BidderPortfolioGridList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandAll: true,
    };
  }

  // Refs don't exist until after the first render,
  // so perform logic on them after component mounts.
  componentDidMount() {
    this.debouncedSetValue();
  }

  // Get an update value for expandAll every time an individual accordion is clicked.
  onSetAccordion = () => {
    this.debouncedSetValue();
  };

  getRefById = id => {
    const ref = get(this, `accordion-${id}`);
    return ref;
  }

  // Determine whether to display a + or - for the expand toggle button.
  // Never call this function directly (use debouncedSetValue()).
  setExpandAllValue = () => {
    const { results } = this.props;
    // map AccordionItem children expanded values to an array
    const accStates = [...results].map((r) => {
      // refs will not exist on the first render
      const ref = this.getRefById(r.id);
      if (ref) { // refs are defined from the id of the result
        return ref.isExpanded();
      }
      return false;
    });

    // the expandAll value accordingly
    if (accStates.every(isAllFalse)) {
      this.setState({ expandAll: false });
    } else if (accStates.every(isAllTrue)) {
      this.setState({ expandAll: true });
    }
  };

  // Determine what to do the AccordionItems when the toggle button is clicked.
  toggleExpand = () => {
    const { results } = this.props;

    // If expandAll false, set them all to expanded.
    if (!this.state.expandAll) {
      results.forEach((f) => {
        const ref = this.getRefById(f.id);
        if (ref) {
          ref.setExpandedFromRef(true);
        }
      });
    } else { // Otherwise, set them all to collapsed.
      results.forEach((f) => {
        const ref = this.getRefById(f.id);
        if (ref) {
          ref.setExpandedFromRef(false);
        }
      });
    }

    // Then get our value for expandAll, since ref methods will not force a re-render to the parent.
    this.debouncedSetValue();
  };

  // Wrap in a setTimeout, so that the parent has time to get the correct value from the child.
  debouncedSetValue() {
    setTimeout(() => {
      this.setExpandAllValue();
    });
  }

  render() {
    const { results, showEdit, showExpand, classifications, viewType } = this.props;
    const { expandAll } = this.state;
    let expandText = 'Expand All';
    let expandIcon = 'plus';
    if (expandAll) {
      expandText = 'Collapse All';
      expandIcon = 'minus';
    }
    return (
      <div>
        {
          showExpand &&
          <button className="usa-accordion-button-all" title={expandText} onClick={this.toggleExpand}>
            <FontAwesome name={expandIcon} />
          </button>
        }
        <Accordion className="usa-grid-full accordion-inverse user-dashboard portfolio-row-list" isMultiselectable>
          {
            results.map(result => (
              <AccordionItem
                controlled
                className="portfolio-row"
                id={`${result.id}-row`}
                key={result.id}
                title={result.name}
                setAccordion={this.onSetAccordion}
                ref={(ref) => { this[`accordion-${result.id}`] = ref; }} // refs are defined from the id of the result
              >
                <BidderPortfolioStatRow
                  userProfile={result}
                  showEdit={showEdit}
                  classifications={classifications}
                  viewType={viewType}
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
  classifications: CLASSIFICATIONS,
  showExpand: PropTypes.bool,
  viewType: PropTypes.string,
};

BidderPortfolioGridList.defaultProps = {
  showEdit: false,
  classifications: [],
  showExpand: false,
  viewType: '',
};

export default BidderPortfolioGridList;
