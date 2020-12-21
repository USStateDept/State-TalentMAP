import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { get, keys } from 'lodash';
import { formatDate } from 'utilities';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { NO_GRADE, NO_END_DATE } from 'Constants/SystemMessages';
import EditBidder from 'Components/AvailableBidders/EditBidder';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';


const AvailableBidderRow = (props) => {
  const { bidder, CDOView, isLoading, showModal } = props;

  const shared = Math.random() < 0.5; // Update to read from bidder object;
  const ted = get(bidder, 'current_assignment.end_date');
  const formattedTed = ted ? formatDate(ted) : NO_END_DATE;

  const sections = {
    Name: (<Link to={`/profile/public/${get(bidder, 'emp_id')}/bureau`}>{get(bidder, 'name')}</Link>),
    Status: 'OC',
    Skill: get(bidder, 'skills[0].description'),
    Grade: get(bidder, 'grade', NO_GRADE),
    TED: formattedTed,
    Current_Post: get(bidder, 'current_assignment.position.post.location.country'),
    OC_Bureau: get(bidder, 'current_assignment.position.bureau'),
    OC_Reason: 'Compassionate Curtailment',
    CDO: get(bidder, 'cdo.name'),
    Comments: 'Recently released from Sudan',
  };

  return (
    <tr className={!CDOView && !shared ? 'ab-inactive' : ''}>
      {
        isLoading ?
          keys(sections).forEach(k => {
            sections[k] = <Skeleton />;
          })
          :
          keys(sections).map(i => (
            <td>{sections[i]}</td>
          ))
      }
      <td>
        <div className="ab-action-buttons">
          <Tooltip
            title="Edit Fields"
            arrow
            offset={-95}
            position="top-end"
            tabIndex="0"
          >
            <FA name="pencil-square-o" className="fa-lg" onClick={showModal} />
          </Tooltip>
          <Tooltip
            title="Share with Bureaus"
            arrow
            offset={-95}
            position="top-end"
            tabIndex="0"
          >
            { shared ? <FA name="building" className="fa-lg" /> : <FA name="building-o" className="fa-lg" />}
          </Tooltip>
          <Tooltip
            title="Remove from Available Bidders List"
            arrow
            offset={-95}
            position="top-end"
            tabIndex="0"
          >
            <FA name="trash-o" className="fa-lg" />
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

AvailableBidderRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bidder: PropTypes.object,
  CDOView: PropTypes.bool,
  isLoading: PropTypes.bool,
  showModal: PropTypes.func,
};

AvailableBidderRow.defaultProps = {
  bidder: {},
  CDOView: false,
  isLoading: false,
  showModal: EMPTY_FUNCTION,
};

export default AvailableBidderRow;
