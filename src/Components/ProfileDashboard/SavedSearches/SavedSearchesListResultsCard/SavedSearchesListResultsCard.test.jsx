import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import SavedSearchesListResultsCard from './SavedSearchesListResultsCard';
import { mappedParams, searchObject } from '../../../../__mocks__/searchObject';

describe('SavedSearchesListResultsCardComponent', () => {
  const props = {
    mappedParams,
    savedSearch: searchObject,
    goToSavedSearch: () => {},
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can click the navigation button', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
        goToSavedSearch={spy}
      />,
    );
    wrapper.find('.search-title').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
