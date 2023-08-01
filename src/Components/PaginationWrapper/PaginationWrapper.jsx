import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

// wrapper for react-paginate module
// reference https://github.com/AdeleD/react-paginate for prop types
// wrapper performs reconciliation for react-paginate's zero-based pagination

class PaginationWrapper extends Component {
  // reconciles zero-base
  onPageChange = e => {
    const selected = e.selected + 1;
    this.props.onPageChange({ page: selected });
  };

  render() {
    const {
      previousLabel,
      nextLabel,
      pageSize,
      marginPagesDisplayed,
      pageRangeDisplayed,
      paginationStyle,
      containerClassName,
      subContainerClassName,
      totalResults,
      forcePage,
      activeClassName,
    } = this.props;
    // calculate how many pages there are
    const count = Math.ceil(totalResults / pageSize);
    return (
      <div>
        {
          count > 0 ?
            <nav className={paginationStyle} aria-label="Pagination">
              <ReactPaginate
                previousLabel={previousLabel}
                nextLabel={nextLabel}
                pageCount={count}
                marginPagesDisplayed={marginPagesDisplayed}
                pageRangeDisplayed={pageRangeDisplayed}
                onPageChange={this.onPageChange}
                containerClassName={containerClassName}
                subContainerClassName={subContainerClassName}
                forcePage={forcePage - 1/* reconciles zero-based pagination */}
                activeClassName={activeClassName}
                className={this.props.className}
              />
            </nav>
            : null
        }
      </div>
    );
  }
}

PaginationWrapper.propTypes = {
  previousLabel: PropTypes.node,
  nextLabel: PropTypes.node,
  pageSize: PropTypes.number.isRequired,
  marginPagesDisplayed: PropTypes.number,
  pageRangeDisplayed: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  containerClassName: PropTypes.string,
  subContainerClassName: PropTypes.string,
  forcePage: PropTypes.number.isRequired,
  activeClassName: PropTypes.string,
  paginationStyle: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
  className: PropTypes.string,
};

PaginationWrapper.defaultProps = {
  previousLabel: 'Previous',
  nextLabel: 'Next',
  marginPagesDisplayed: 2,
  pageRangeDisplayed: 3,
  containerClassName: 'pagination',
  subContainerClassName: 'pages pagination',
  activeClassName: 'active',
  paginationStyle: 'pagination',
  className: '',
};

export default PaginationWrapper;
