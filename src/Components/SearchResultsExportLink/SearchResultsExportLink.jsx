import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { POSITION_SEARCH_SORTS_DYNAMIC } from '../../Constants/Sort';
import { downloadPositionData } from '../../actions/results';
import ExportButton from '../ExportButton';

class SearchResultsExportLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: { value: window.location.search.replace('?', '') || '' },
    };
  }

  UNSAFE_componentWillReceiveProps() {
    const query = window.location.search.replace('?', '') || '';
    if (this.state.query.value !== query) {
      this.setState({ query: { value: query } });
    }
  }

  onClick = () => {
    const { isLoading } = this.state;
    const { isProjectedVacancy } = this.context;
    if (!isLoading) {
      this.setState({ isLoading: true }, () => {
        const query = {
          ordering: POSITION_SEARCH_SORTS_DYNAMIC.defaultSort,
          ...queryString.parse(this.state.query.value),
          limit: this.props.count,
          page: 1,
        };
        downloadPositionData(queryString.stringify(query), isProjectedVacancy)
          .then(() => {
            this.setState({ isLoading: false });
          })
          .catch(() => {
            this.setState({ isLoading: false });
          });
      });
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="export-button-container">
        <ExportButton onClick={this.onClick} isLoading={isLoading} />
      </div>
    );
  }
}

SearchResultsExportLink.contextTypes = {
  isProjectedVacancy: PropTypes.bool,
};

SearchResultsExportLink.propTypes = {
  count: PropTypes.number,
};

SearchResultsExportLink.defaultProps = {
  count: 0,
};

export default SearchResultsExportLink;
