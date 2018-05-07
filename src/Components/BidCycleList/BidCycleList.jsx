import React from 'react';
import { find } from 'lodash';
import BidCycleCard from './BidCycleCard';
import { Row, Column } from '../Layout';
import ProfileSectionTitle from '../ProfileSectionTitle';
import { BID_CYCLES } from '../../Constants/PropTypes';
import Menu from '../../Constants/Menu';

const title = find(Menu[0].children, { route: '/profile/cycles/' }).text;

const BidCycleList = ({ cycles }) => (
  <Row fluid>
    <Column>
      <ProfileSectionTitle title={title} />
      {cycles.map(cycle => (
        <BidCycleCard key={cycle.name} cycle={cycle} />
      ))}
    </Column>
  </Row>
  );

BidCycleList.propTypes = {
  cycles: BID_CYCLES,
};

BidCycleList.defaultProps = {
  cycles: [],
};

export default BidCycleList;
