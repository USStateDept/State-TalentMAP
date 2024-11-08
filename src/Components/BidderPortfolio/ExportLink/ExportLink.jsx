import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import { EXPORT_DATA_ERROR, EXPORT_DATA_ERROR_TITLE, EXPORT_DATA_LOADING, EXPORT_DATA_LOADING_TITLE, EXPORT_DATA_SUCCESS, EXPORT_DATA_SUCCESS_TITLE } from 'Constants/SystemMessages';
// import { get, mapValues } from 'lodash';
// import { CSVLink } from '../../CSV';
import { downloadClientData } from '../../../actions/bidderPortfolio';
import ExportButton from '../../ExportButton';
// import { getFormattedNumCSV, spliceStringForCSV } from '../../../utilities';

// Mapping columns to data fields
// const HEADERS = [
//   { label: 'Last Name', key: 'user.last_name' },
//   { label: 'First Name', key: 'user.first_name' },
//   { label: 'Email', key: 'user.email' },
//   { label: 'Username', key: 'user.username' },
//   { label: 'Grade', key: 'grade' },
//   { label: 'Primary Nationality', key: 'primary_nationality' },
//   { label: 'Secondary Nationality', key: 'secondary_nationality' },
//   { label: 'Current Assignment', key: 'current_assignment' },
//   { label: 'Language', key: 'language_qualifications[0].representation' },
// ];

// Processes results before sending to the download component to allow for custom formatting.
// const processData = data => (
//   data.map(entry => ({
//     ...mapValues(entry, x => !x ? '' : x), // eslint-disable-line no-confusing-arrow
//     grade: getFormattedNumCSV(entry.grade),
//     // any other processing we may want to do here
//   }))
// );

export class ExportLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: '',
      isLoading: false,
    };
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (!nextProps.isLoading) {
  //     this.setState({ isLoading: false });
  //   }
  //   if (this.props.isLoading && !nextProps.isLoading && !nextProps.hasErrored) {
  //     const data = processData(nextProps.data.results);
  //     this.setState({ data, isLoading: false }, () => {
  //       if (get(this.csvLink, 'link.click')) {
  //         this.csvLink.link.click();
  //       }
  //     });
  //   }
  // }

  onClick = () => {
    const dispatch = useDispatch();
    const { bidderPortfolioLastQuery } = this.props;
    const { isLoading } = this.state;
    if (!isLoading) {
      // reset the state to support multiple clicks
      this.setState({ isLoading: true });
      dispatch(toastInfo(EXPORT_DATA_LOADING, EXPORT_DATA_LOADING_TITLE));
      downloadClientData(bidderPortfolioLastQuery)
        .then(() => {
          this.setState({ isLoading: false });
          dispatch(toastSuccess(EXPORT_DATA_SUCCESS, EXPORT_DATA_SUCCESS_TITLE));
        })
        .catch(() => {
          this.setState({ isLoading: false });
          dispatch(toastError(EXPORT_DATA_ERROR, EXPORT_DATA_ERROR_TITLE));
        });
    }
  };

  // setCsvRef = ref => {
  //   this.csvLink = ref;
  // };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="export-button-container">
        <ExportButton text={'Export - Max. 500'} onClick={this.onClick} isLoading={isLoading} disabled={this.props.disabled} />
        {/* <CSVLink
          transform={spliceStringForCSV}
          tabIndex="-1"
          ref={this.setCsvRef}
          target="_blank"
          filename={this.props.filename}
          data={data}
          headers={HEADERS}
          uFEFF={false}
        /> */}
      </div>
    );
  }
}

ExportLink.propTypes = {
  // filename: PropTypes.string,
  // Used via nextProps
  // eslint-disable-next-line react/no-unused-prop-types
  // hasErrored: PropTypes.bool,
  // isLoading: PropTypes.bool,
  // data: PropTypes.shape({ results: PropTypes.arrayOf(PropTypes.shape({})) }),
  bidderPortfolioLastQuery: PropTypes.shape({}),
  disabled: PropTypes.bool,
};

ExportLink.defaultProps = {
  // filename: 'TalentMap_bidder_portfolio_export.csv',
  // hasErrored: false,
  // isLoading: false,
  // data: {},
  bidderPortfolioLastQuery: {},
  disabled: false,
};

const mapStateToProps = state => ({
  // hasErrored: state.lastBidderPortfolioHasErrored,
  // isLoading: state.lastBidderPortfolioIsLoading,
  // data: state.lastBidderPortfolio,
  bidderPortfolioLastQuery: state.bidderPortfolioLastQuery,
});

export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ExportLink);
