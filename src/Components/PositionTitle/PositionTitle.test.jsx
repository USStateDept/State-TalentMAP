import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import PositionTitle from './PositionTitle';
import detailsObject from '../../__mocks__/detailsObject';

describe('PositionTitleComponent', () => {
  let wrapper = null;

  it('can receive props', () => {
    wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBack={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBack={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can click the back link', () => {
    // function property to navigate back
    const goBackSpy = sinon.spy();
    wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        goBack={goBackSpy}
        isLoading={false}
        hasErrored={false}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    // function that handles going back
    const handleClickSpy = sinon.spy(instance, 'navBack');
    // click the link in the title to go back
    wrapper.find('[role="link"]').simulate('click');
    // check that navBack was called
    sinon.assert.calledOnce(handleClickSpy);
    // check that goBack prop was called
    sinon.assert.calledOnce(goBackSpy);
  });

  it('can press enter on the back link', () => {
    // function property to navigate back
    const goBackSpy = sinon.spy();
    wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        goBack={goBackSpy}
        isLoading={false}
        hasErrored={false}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    // function that handles going back
    const handleClickSpy = sinon.spy(instance, 'navBack');
    // press enter on the link in the title to go back
    wrapper.find('[role="link"]').simulate('keydown', { keyCode: 13 });
    // check that navBack was called
    sinon.assert.calledOnce(handleClickSpy);
    // check that goBack prop was called
    sinon.assert.calledOnce(goBackSpy);
  });

  it('can press (space) on the back link', () => {
    // function property to navigate back
    const goBackSpy = sinon.spy();
    wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        goBack={goBackSpy}
        isLoading={false}
        hasErrored={false}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    // function that handles going back
    const handleClickSpy = sinon.spy(instance, 'navBack');
    // press enter on the link in the title to go back
    wrapper.find('[role="link"]').simulate('keydown', { keyCode: 32 });
    // check that navBack was called
    sinon.assert.calledOnce(handleClickSpy);
    // check that goBack prop was not called
    sinon.assert.notCalled(goBackSpy);
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    wrapper = shallow(
      <PositionTitle
        details={detailsObject}
        isLoading={false}
        hasErrored={false}
        goBack={() => {}}
      />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: true });

    wrapper = shallow(
      <PositionTitle details={detailsObject} isLoading hasErrored={false} goBack={() => {}} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
