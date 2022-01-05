import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { APPROVED } from '../../../Constants/BidStatuses';
import BidContent from './BidContent';
import bidStatistics from '../../../__mocks__/bidStatistics';

describe('BidContentComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidContent
        id={100}
        status={APPROVED.property}
        positionNumber="055A45"
        postName="Paris"
        positionTitle="Title"
        bidStatistics={bidStatistics}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidContent
        id={100}
        status={APPROVED.property}
        positionNumber="055A45"
        postName="Paris"
        positionTitle="Title"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
