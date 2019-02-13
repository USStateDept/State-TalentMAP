import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVDownload } from 'react-csv';
import queryString from 'query-string';
import { fetchResultData } from '../../actions/results';

// Mapping columns to data fields
const HEADERS = [
  { label: 'Position', key: 'title' },
  { label: 'Position number', key: 'position_number' },
  { label: 'Skill', key: 'skill' },
  { label: 'Grade', key: 'grade' },
  { label: 'Bureau', key: 'bureau' },
  { label: 'Post city', key: 'post.location.city' },
  { label: 'Post country', key: 'post.location.country' },
  { label: 'Tour of duty', key: 'post.tour_of_duty' },
  { label: 'Language', key: 'languages[0].representation' },
  { label: 'Post differential', key: 'post.differential_rate' },
  { label: 'Danger pay', key: 'post.danger_pay' },
  { label: 'TED', key: 'current_assignment.estimated_end_date' },
  { label: 'Incumbent', key: 'current_assignment.user' },
];

class SearchResultsExportLink extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      data: '',
      query: { value: window.location.search.replace('?', '') || '' },
    };
  }

  onClick() {
    // reset the state to support multiple clicks
    this.setState({ data: '' });
    const query = {
      ordering: 'current_assignment__estimated_end_date',
      ...queryString.parse(this.state.query.value),
      limit: this.props.count,
    };
    fetchResultData(queryString.stringify(query)).then((results) => {
      this.setState({ data: results.results });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <button onClick={this.onClick}>Download search results</button>
        {
          data && <CSVDownload target="" filename={this.props.filename} data={data} headers={HEADERS} />
        }
      </div>
    );
  }
}

SearchResultsExportLink.propTypes = {
  count: PropTypes.number,
  filename: PropTypes.string,
};

SearchResultsExportLink.defaultProps = {
  count: 0,
  filename: 'TalentMap_search_export.csv',
};

export default SearchResultsExportLink;
