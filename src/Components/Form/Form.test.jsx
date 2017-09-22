import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import Form from './Form';

describe('FormComponent', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <Form>
        <span>child</span>
      </Form>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
