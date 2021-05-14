import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AdditionalView from './AdditionalView';
import { clientBids, clientObject, clientWaivers } from '../../../../__mocks__/client';

describe('AdditionalViewComponent', () => {
  const props = {
    client: { ...clientObject, waivers: clientWaivers.results, bids: clientBids.results },
    isLoading: false,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <AdditionalView
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isLoading is true', () => {
    const wrapper = shallow(
      <AdditionalView
        {...props}
        isLoading
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AdditionalView
        {...props}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading is true', () => {
    const wrapper = shallow(
      <AdditionalView
        {...props}
        isLoading
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
