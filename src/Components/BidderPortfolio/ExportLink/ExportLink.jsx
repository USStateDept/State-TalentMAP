import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import { get } from 'lodash';
import { bidderPortfolioFetchDataFromLastQuery } from '../../../actions/bidderPortfolio';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import ExportButton from '../../ExportButton';

// Mapping columns to data fields
const HEADERS = [
  { label: 'Last Name', key: 'user.last_name' },
  { label: 'First Name', key: 'user.first_name' },
  { label: 'Email', key: 'user.email' },
  { label: 'Username', key: 'user.username' },
  { label: 'Grade', key: 'grade' },
  { label: 'Primary Nationality', key: 'primary_nationality' },
  { label: 'Secondary Nationality', key: 'secondary_nationality' },
  { label: 'Current Assignment', key: 'current_assignment' },
  { label: 'Language', key: 'language_qualifications[0].representation' },
];

// Processes results before sending to the download component to allow for custom formatting.
const processData = data => (
  data.map(entry => ({
    ...entry,
    // any other processing we may want to do here
  }))
);

export class ExportLink extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.setCsvRef = this.setCsvRef.bind(this);
    this.state = {
      data: '',
      isLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) {
      this.setState({ isLoading: false });
    }
    if (this.props.isLoading && !nextProps.isLoading && !nextProps.hasErrored) {
      const data = processData(nextProps.data.results);
      this.setState({ data, isLoading: false }, () => {
        if (get(this.csvLink, 'link.click')) {
          this.csvLink.link.click();
        }
      });
    }
  }

  onClick() {
    const { isLoading } = this.state;
    const { fetchData } = this.props;
    if (!isLoading) {
      this.setState({
        isLoading: true,
      }, () => {
        fetchData();
      });
    }
  }

  setCsvRef(ref) {
    this.csvLink = ref;
  }

  render() {
    const { data, isLoading } = this.state;
    return (
      <div className="export-button-container">
        <ExportButton onClick={this.onClick} isLoading={isLoading} />
        <CSVLink ref={this.setCsvRef} target="_blank" filename={this.props.filename} data={data} headers={HEADERS} />
      </div>
    );
  }
}

ExportLink.propTypes = {
  filename: PropTypes.string,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  data: PropTypes.shape({ results: PropTypes.arrayOf(PropTypes.shape({})) }),
  fetchData: PropTypes.func,
};

ExportLink.defaultProps = {
  filename: 'TalentMap_bidder_portfolio_export.csv',
  hasErrored: false,
  isLoading: false,
  data: {},
  fetchData: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  hasErrored: state.lastBidderPortfolioHasErrored,
  isLoading: state.lastBidderPortfolioIsLoading,
  data: state.lastBidderPortfolio,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(bidderPortfolioFetchDataFromLastQuery()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportLink);
