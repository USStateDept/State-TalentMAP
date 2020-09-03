import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, keys } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import { formatDate } from 'utilities';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { NO_GRADE, NO_END_DATE } from 'Constants/SystemMessages';
import { BUREAU_BIDDER_SORT, BUREAU_BIDDER_FILTERS } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import Alert from 'Components/Alert';
import MailToButton from '../../MailToButton';

class PositionManagerBidders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // add any state here
    };
  }

  render() {
    const { bids, bidsIsLoading } = this.props;

    const bids$ = bids.map(m => {
      const ted = get(m, 'ted');
      const formattedTed = ted ? formatDate(ted) : NO_END_DATE;
      const sections = {
        // RetainedSpace: '',
        Name: (<Link to={`/profile/public/${m.emp_id}/bureau`}>{get(m, 'name')}</Link>),
        Skill: get(m, 'skill'),
        Grade: get(m, 'grade', NO_GRADE),
        Language: get(m, 'language'),
        TED: formattedTed,
        CDO: <MailToButton email={get(m, 'cdo.email')} textAfter={get(m, 'cdo.name')} />,
      };

      if (bidsIsLoading) {
        keys(sections).forEach(k => {
          sections[k] = <Skeleton />;
        });
      }

      const tableRows = (
        <tr>
          {keys(sections).map(i => (
            <td>{sections[i]}</td>
          ))}
        </tr>
      );
      return tableRows;
    });

    const tableHeaders = ['Name', 'Skill', 'Grade', 'Language', 'TED', 'CDO'].map(item => (
      <th scope="col">{item}</th>
    ));

    return (
      <div className="usa-width-one-whole position-manager-bidders">
        <div className="bidders-controls">
          <SelectForm
            id="sort"
            label="Sort by:"
            options={BUREAU_BIDDER_SORT.options}
            disabled={false}
            onSelectOption={e => this.props.onSort(e.target.value)}
          />
          <SelectForm
            id="filter"
            options={BUREAU_BIDDER_FILTERS.options}
            label="Filter By:"
            defaultSort={''}
            disabled={false}
            onSelectOption={e => this.props.onFilter('handshake_code', e.target.value)}
          />
        </div>
        {
          !bids$.length ?
            <Alert type="info" title="There are no bids on this position" />
            :
            <table className="position-manager-bidders-table">
              <thead>
                <tr>
                  <h1>Candidates</h1>
                </tr>
                <tr>
                  {tableHeaders}
                </tr>
              </thead>
              <tbody>
                {bids$}
              </tbody>
            </table>
        }
      </div>
    );
  }
}

PositionManagerBidders.propTypes = {
  bids: PropTypes.arrayOf(PropTypes.shape({})),
  bidsIsLoading: PropTypes.bool,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
};

PositionManagerBidders.defaultProps = {
  bids: [],
  bidsIsLoading: false,
  onSort: EMPTY_FUNCTION,
  onFilter: EMPTY_FUNCTION,
};

export default PositionManagerBidders;
