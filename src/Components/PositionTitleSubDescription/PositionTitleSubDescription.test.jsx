import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
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
        isAllowedToEdit
      />,
    );
    expect(wrapper.instance().props.title).toBe('title');
  });

  it('shows the editor button when the user has permission', () => {
    const wrapper = shallow(
      <PositionTitleSubDescription
        title="title"
        formattedContent={<span>content</span>}
        plainContent="content"
        shouldShowEditor={false}
        onSubmitText={() => {}}
        toggleEditor={() => {}}
        isAllowedToEdit
      />,
    );
    expect(wrapper.find('EditContentButton')).toHaveLength(1);
  });

  it('hides the editor button when the user does not have permission', () => {
    const wrapper = shallow(
      <PositionTitleSubDescription
        title="title"
        formattedContent={<span>content</span>}
        plainContent="content"
        shouldShowEditor={false}
        onSubmitText={() => {}}
        toggleEditor={() => {}}
        isAllowedToEdit={false}
      />,
    );
    expect(wrapper.find('EditContentButton')).toHaveLength(0);
  });

  it('matches snapshot when editor is hidden', () => {
    const wrapper = shallow(
      <PositionTitleSubDescription
        title="title"
        formattedContent={<span>content</span>}
        plainContent="content"
        shouldShowEditor={false}
        onSubmitText={() => {}}
        toggleEditor={() => {}}
        isAllowedToEdit
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(
      <PositionTitleSubDescription
        title="title"
        formattedContent={<span>content</span>}
        plainContent="content"
        shouldShowEditor
        onSubmitText={() => {}}
        toggleEditor={() => {}}
        isAllowedToEdit
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
