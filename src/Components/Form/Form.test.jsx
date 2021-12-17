import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Form from './Form';

describe('FormComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Form onFormSubmit={() => {}}>
        <span>child</span>
      </Form>,
    );
    expect(wrapper).toBeDefined();
  });

  it('accepts a className', () => {
    const className = 'test-class';
    const wrapper = shallow(
      <Form onFormSubmit={() => {}} className={className}>
        <span>child</span>
      </Form>,
    );
    expect(wrapper.find(`.${className}`)).toBeDefined();
  });

  it('calls onFormSubmit', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Form onFormSubmit={spy}>
        <span>child</span>
      </Form>,
    );
    wrapper.find('form').props().onSubmit();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Form onFormSubmit={() => {}}>
        <span>child</span>
      </Form>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
