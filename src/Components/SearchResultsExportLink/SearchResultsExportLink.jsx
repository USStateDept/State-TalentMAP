import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVDownload } from 'react-csv';
import queryString from 'query-string';
import { POSITION_SEARCH_SORTS } from '../../Constants/Sort';
import { fetchResultData } from '../../actions/results';
import { formatDate } from '../../utilities';

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
  { label: 'TED', key: 'estimated_end_date' },
  { label: 'Incumbent', key: 'current_assignment.user' },
];

// Processes results before sending to the download component to allow for custom formatting.
const processData = data => (
  data.map(entry => ({
    ...entry,
    estimated_end_date: formatDate(entry.current_assignment.estimated_end_date),
  }))
);


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
      ordering: POSITION_SEARCH_SORTS,
      ...queryString.parse(this.state.query.value),
      limit: this.props.count,
    };
    fetchResultData(queryString.stringify(query)).then((results) => {
      const data = processData(results.results);
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <button className="usa-button-secondary" onClick={this.onClick}>Download</button>
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