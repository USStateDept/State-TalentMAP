import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BureauFilter from './BureauFilter';

describe('BureauFilterComponent', () => {
  const bureauFilter = {
    item: {
      title: 'Bureau',
      sort: 100,
      description: 'region',
      endpoint: 'organization/?is_bureau=true&is_regional=true',
      selectionRef: 'bureau',
    },
    data: [
      { id: 1, name: 'Name1', is_regional: true },
      { id: 2, name: 'Name2', is_regional: false },
    ],
  };

  const functionalBureaus = {
    item: {
      title: 'Functional Bureaus',
      sort: 105,
      description: 'functionalRegion',
      endpoint: 'organization/group/',
      selectionRef: 'functional',
    },
    data: [
      { id: 1, name: 'Name1', is_regional: true },
      { id: 2, name: 'Name2', is_regional: false },
    ],
  };

  const props = {
    item: bureauFilter,
    queryParamToggle: () => {},
    functionalBureaus,
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <BureauFilter
        {...props}
      />,
    );
    expect(wrapper.instance().props.item.item.title).toBe(props.item.item.title);
  });

  it('can call the onCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BureauFilter
        {...props}
        queryParamToggle={spy}
      />,
    );
    wrapper.instance().onCheckBoxClick(true, { selectionRef: 'test', code: 'code' });
    sinon.assert.calledOnce(spy);
  });

  it('can call the onFunctionalBureauCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BureauFilter
        {...props}
        queryParamToggle={spy}
      />,
    );
    wrapper.instance().onFunctionalBureauCheckBoxClick(true, { selectionRef: 'test', code: 'code' });
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BureauFilter
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
