import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Pill from './Pill';

describe('PillComponent', () => {
  const props = {
    description: 'test',
    codeRef: 'code',
    selectionRef: 'selection',
    onPillClick: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<Pill
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('renders class', () => {
    const wrapper = shallow(<Pill
      {...props}
    />);

    ['.pill']
      .map(m => expect(wrapper.find(m).exists()).toBe(true));
  });

  it('renders classes based on props and context', () => {
    const wrapper = shallow(<Pill
      {...props}
      isTandem2
      isCommon
    />, { context: { isProjectedVacancy: true, isTandemSearch: true } });

    ['.pill', '.pill--projected-vacancy']
      .map(m => expect(wrapper.find(m).exists()).toBe(true));

    ['.pill--tandem-search', '.pill--tandem2']
      .map(m => expect(wrapper.find(m).exists()).toBe(false));
  });

  it('clicks the button', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Pill
      {...props}
      onPillClick={spy}
    />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Pill
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with options', () => {
    const wrapper = shallow(<Pill
      {...props}
      isTandem2
      isCommon
    />, { context: { isProjectedVacancy: true, isTandemSearch: true } });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
