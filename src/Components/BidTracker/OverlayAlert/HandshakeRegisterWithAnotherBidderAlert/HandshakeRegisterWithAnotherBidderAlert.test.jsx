import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HandshakeRegisterWithAnotherBidderAlert from './HandshakeRegisterWithAnotherBidderAlert';
import bidListObject from '../../../../__mocks__/bidListObject';

describe('HandshakeRegisterWithAnotherBidderAlert', () => {
  const props = {
    bid: bidListObject.results[0],
  };

  it('is defined', () => {
    const wrapper = shallow(
      <HandshakeRegisterWithAnotherBidderAlert {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when skill and grade are undefined', () => {
    const wrapper = shallow(
      <HandshakeRegisterWithAnotherBidderAlert
        {...props}
        bid={{ ...props.bid, position: { ...props.bid.position, skill: null, grade: null } }}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HandshakeRegisterWithAnotherBidderAlert {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
