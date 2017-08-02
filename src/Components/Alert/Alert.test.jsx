import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Alert from './Alert';

describe('Alert', () => {
  let alert = null;

  const alertBody = [
    { body: 'Alert body' },
  ];

  const errorBody = [
    { body: 'Error 1' },
    { body: 'Error 2' },
  ];

  it('is defined with a default type of info', () => {
    alert = shallow(<Alert title="test" />);
    expect(alert).toBeDefined();
    expect(alert.find('.usa-alert-info')).toBeDefined();
  });

  it('displays info alert', () => {
    const title = 'Info title';
    alert = shallow(<Alert type="info" title={title} messages={alertBody} />);
    expect(toJSON(alert)).toMatchSnapshot();
    expect(alert.find('.usa-alert-info')).toBeDefined();
    expect(alert.find('.usa-alert-heading').text()).toBe(title);
    expect(alert.find('.usa-alert-text').text()).toBe(alertBody[0].body);
  });

  it('displays warning alert', () => {
    const title = 'Warning title';
    alert = shallow(<Alert type="info" title={title} messages={alertBody} />);
    expect(toJSON(alert)).toMatchSnapshot();
    expect(alert.find('.usa-alert-warning')).toBeDefined();
    expect(alert.find('.usa-alert-heading').text()).toBe(title);
  });

  it('displays success alert', () => {
    const title = 'Success title';
    alert = shallow(<Alert type="success" title={title} messages={alertBody} />);
    expect(toJSON(alert)).toMatchSnapshot();
    expect(alert.find('.usa-alert-success')).toBeDefined();
    expect(alert.find('.usa-alert-heading').text()).toBe(title);
  });

  it('displays error alert with multiple messages', () => {
    const title = 'Error title';
    alert = shallow(<Alert type="error" title={title} messages={errorBody} />);
    expect(toJSON(alert)).toMatchSnapshot();
    expect(alert.find('.usa-alert-error')).toBeDefined();
    expect(alert.find('.usa-alert').prop('role')).toBeDefined();
    expect(alert.find('.usa-alert-heading').text()).toBe(title);
  });
});
