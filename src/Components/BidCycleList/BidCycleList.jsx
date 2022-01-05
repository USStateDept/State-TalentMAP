import BidCycleCard from './BidCycleCard';
import { Column, Row } from '../Layout';
import ProfileSectionTitle from '../ProfileSectionTitle';
import { BID_CYCLES } from '../../Constants/PropTypes';

const BidCycleList = ({ cycles }) => (
  <Row fluid>
    <Column>
      <ProfileSectionTitle title="Bid Cycles" icon="hourglass-start" />
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
