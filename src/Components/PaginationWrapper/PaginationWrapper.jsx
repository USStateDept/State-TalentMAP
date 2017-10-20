import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

// wrapper for react-paginate module
// reference https://github.com/AdeleD/react-paginate for prop types
// wrapper performs reconciliation for react-paginate's zero-based pagination

class PaginationWrapper extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }
  // reconciles zero-base
  onPageChange(e) {
    const selected = e.selected + 1;
    this.props.onPageChange({ page: selected });
  }
  render() {
    const {
        previousLabel,
        nextLabel,
        pageCount,
        marginPagesDisplayed,
        pageRangeDisplayed,
        paginationStyle,
        containerClassName,
        subContainerClassName,
        forcePage,
        activeClassName,
      } = this.props;
    return (
      <nav className={paginationStyle} aria-label="Pagination">
        <ReactPaginate
          previousLabel={previousLabel}
          nextLabel={nextLabel}
          pageCount={pageCount}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={this.onPageChange}
          containerClassName={containerClassName}
          subContainerClassName={subContainerClassName}
          forcePage={forcePage - 1/* reconciles zero-based pagination */}
          activeClassName={activeClassName}
        />
      </nav>
    );
  }
}

PaginationWrapper.propTypes = {
  previousLabel: PropTypes.node,
  nextLabel: PropTypes.node,
  pageCount: PropTypes.number.isRequired,
  marginPagesDisplayed: PropTypes.number,
  pageRangeDisplayed: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  containerClassName: PropTypes.string,
  subContainerClassName: PropTypes.string,
  forcePage: PropTypes.number.isRequired,
  activeClassName: PropTypes.string,
  paginationStyle: PropTypes.string,
};

PaginationWrapper.defaultProps = {
  previousLabel: 'Previous',
  nextLabel: 'Next',
  marginPagesDisplayed: 2,
  pageRangeDisplayed: 1,
  containerClassName: 'pagination',
  subContainerClassName: 'pages pagination',
  activeClassName: 'active',
  paginationStyle: 'pagination',
};

export default PaginationWrapper;
