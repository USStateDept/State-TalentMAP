import { find } from 'lodash';
import BidCycleCard from './BidCycleCard';
import { Column, Row } from '../Layout';
import ProfileSectionTitle from '../ProfileSectionTitle';
import { BID_CYCLES } from '../../Constants/PropTypes';
import GET_PROFILE_MENU from '../../Constants/Menu';

const title = find(GET_PROFILE_MENU()[0].children, { route: '/profile/cycles/' }).text;

const BidCycleList = ({ cycles }) => (
  <Row fluid>
    <Column>
      <ProfileSectionTitle title={title} />
      {cycles.map(cycle => (
        <BidCycleCard key={cycle.id} cycle={cycle} />
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
