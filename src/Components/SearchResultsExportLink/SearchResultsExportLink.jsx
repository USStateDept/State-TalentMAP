import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, mapValues } from 'lodash';
import queryString from 'query-string';
import flatten from 'flat';
import { CSVLink } from '../CSV';
import { POSITION_SEARCH_SORTS, POSITION_SEARCH_SORTS_DYNAMIC } from '../../Constants/Sort';
import { fetchResultData, downloadAvailablePositionData } from '../../actions/results';
import { formatDate, getFormattedNumCSV, spliceStringForCSV } from '../../utilities';
import ExportButton from '../ExportButton';
import { checkFlag } from '../../flags';

const getUseAP = () => checkFlag('flags.available_positions');

// Mapping columns to data fields
// Use custom delimiter of flattened data
const HEADERS = [
  { label: 'Position', key: 'position__title' },
  { label: 'Position number', key: 'position_number' },
  { label: 'Skill', key: 'position__skill' },
  { label: 'Grade', key: 'grade' },
  { label: 'Bureau', key: 'position__bureau' },
  { label: 'Post city', key: 'position__post__location__city' },
  { label: 'Post country', key: 'position__post__location__country' },
  { label: 'Tour of duty', key: 'position__post__tour_of_duty' },
  { label: 'Language', key: 'position__languages__0__representation' },
  { label: 'Service needs differential', key: 'position__post__has_service_needs_differential' },
  { label: 'Post differential', key: 'position__post__differential_rate' },
  { label: 'Danger pay', key: 'position__post__danger_pay' },
  { label: 'TED', key: 'estimated_end_date' },
  { label: 'Incumbent', key: 'position__current_assignment__user' },
  { label: 'Bid Cycle/Season', key: 'bidcycle__name' },
  { label: 'Posted date', key: 'posted_date' },
  { label: 'Status code', key: 'status_code' },
];

// Processes results before sending to the download component to allow for custom formatting.
// Flatten data with custom delimiter.
export const processData = data =>
  data.map((entry) => {
    const entry$ = flatten({ ...entry }, { delimiter: '__' });
    const endDate = get(entry$, 'ted');
    const postedDate = get(entry$, 'posted_date');
    const formattedEndDate = endDate ? formatDate(endDate) : null;
    const formattedPostedDate = postedDate ? formatDate(postedDate) : null;
    const val = {
      ...mapValues(entry$, x => !x ? '' : x), // eslint-disable-line no-confusing-arrow
      position_number: getFormattedNumCSV(entry.position.position_number),
      grade: getFormattedNumCSV(get(entry, 'position.grade')),
      estimated_end_date: formattedEndDate,
      posted_date: formattedPostedDate,
    };
    return val;
  });


class SearchResultsExportLink extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      isLoading: false,
      data: '',
      query: { value: window.location.search.replace('?', '') || '' },
    };
  }

  componentWillReceiveProps() {
    const query = window.location.search.replace('?', '') || '';
    if (this.state.query.value !== query) {
      this.setState({ query: { value: query } });
    }
  }

  onClick() {
    const { isLoading } = this.state;
    if (!isLoading) {
      // reset the state to support multiple clicks
      this.setState({ data: '', isLoading: true });
      const query = {
        ordering: getUseAP() ?
          POSITION_SEARCH_SORTS_DYNAMIC.defaultSort : POSITION_SEARCH_SORTS.defaultSort,
        ...queryString.parse(this.state.query.value),
        limit: this.props.count,
        page: 1,
      };
      if (getUseAP()) {
        downloadAvailablePositionData(queryString.stringify(query))
        .then(() => {
          this.setState({ isLoading: false });
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
      } else {
        fetchResultData(queryString.stringify(query))
        .then((results) => {
          const data = processData(results.results);
          this.setState({ data, isLoading: false }, () => {
            // click the CSVLink component to trigger the CSV download
            // This is needed for the download to work in Edge.
            if (this.csvLink) { this.csvLink.link.click(); }
          });
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
      }
    }
  }

  render() {
    const { data, isLoading } = this.state;
    return (
      <div className="export-button-container">
        <ExportButton onClick={this.onClick} isLoading={isLoading} />
        <CSVLink
          tabIndex="-1"
          transform={spliceStringForCSV}
          ref={(x) => { this.csvLink = x; }}
          target="_blank"
          filename={this.props.filename}
          data={data}
          headers={HEADERS}
          uFEFF={false}
        />
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
