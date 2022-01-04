import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AvailableBidderContainer from './AvailableBidderContainer';


describe('AvailableBidderContainerComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<AvailableBidderContainer isCDO />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(<AvailableBidderContainer isCDO />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(<AvailableBidderContainer isCDO={false} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
