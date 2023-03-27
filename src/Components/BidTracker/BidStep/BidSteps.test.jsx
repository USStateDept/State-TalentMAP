import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BidSteps from './BidSteps';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidStepsComponent', () => {
  const bid = bidListObject.results[0];
  const bidClosed = bidListObject.results[1];

  it('is defined', () => {
    const wrapper = shallow(
      <BidSteps bid={bid} />,
      { context: { condensedView: false } },
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when context.condensedView === true', () => {
    const wrapper = shallow(
      <BidSteps bid={bid} />,
      { context: { condensedView: true } },
    );
    expect(wrapper).toBeDefined();
  });


  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidSteps bid={bid} />,
      { context: { condensedView: false } },
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('3rd step classes match when status approved', () => {
    const wrapper = shallow(<BidSteps bid={bid} />,
      { context: { condensedView: true } },
    );
    expect(wrapper.at(0).childAt(3).find('.step-handshake-accepted').exists()).toBe(true);
    expect(wrapper.at(0).childAt(3).find('.step-complete').exists()).toBe(true);
  });


  it('last step classes match when status closed', () => {
    const wrapper = shallow(<BidSteps bid={bidClosed} />,
      { context: { condensedView: true } },
    );
    expect(wrapper.at(0).childAt(5).find('.step-approval').exists()).toBe(true);
    expect(wrapper.at(0).childAt(5).find('.step-incomplete').exists()).toBe(true);
  });
});
