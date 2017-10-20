import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
// import sinon from 'sinon';
import PositionTitleSubDescription from './PositionTitleSubDescription';

describe('PositionTitleSubDescriptionComponent', () => {
  it('can receive props', () => {
    const wrapper = shallow(
      <PositionTitleSubDescription
        title="title"
        formattedContent={<span>content</span>}
        plainContent="content"
        shouldShowEditor={false}
        onSubmitText={() => {}}
        toggleEditor={() => {}}
      />,
    );
    expect(wrapper.instance().props.title).toBe('title');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionTitleSubDescription
        title="title"
        formattedContent={<span>content</span>}
        plainContent="content"
        shouldShowEditor={false}
        onSubmitText={() => {}}
        toggleEditor={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
