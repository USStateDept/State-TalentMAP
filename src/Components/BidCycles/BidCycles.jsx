import React from 'react';
import { find } from 'lodash';
import BidCycle from './BidCycle';
import { Row, Column } from '../Layout';
import ProfileSectionTitle from '../ProfileSectionTitle';
import { BID_CYCLES } from '../../Constants/PropTypes';
import Menu from '../../Constants/Menu';

const title = find(Menu[0].children, { route: '/profile/cycles/' }).text;

const BidCycles = ({ cycles }) => (
  <Row fluid>
    <Column>
      <ProfileSectionTitle title={title} />
      {cycles.map(cycle => (
        <BidCycle key={cycle.name} cycle={cycle} />
      ))}
    </Column>
  </Row>
  );

BidCycles.propTypes = {
  cycles: BID_CYCLES,
};

BidCycles.defaultProps = {
  cycles: [],
};

export default BidCycles;
