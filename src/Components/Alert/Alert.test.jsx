import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Alert from './Alert';

describe('LanguageList', () => {
  let alert = null;

  const errorBody = [
    { body: 'Error 1' },
    { body: 'Error 2' },
  ];

  it('is defined', () => {
    alert = shallow(<Alert title="test" />);
    expect(alert).toBeDefined();
  });

  it('takes different props', () => {
    alert = shallow(<Alert type="error" title="Error title" body={errorBody} />);
    expect(toJSON(alert)).toMatchSnapshot();
  });
});
