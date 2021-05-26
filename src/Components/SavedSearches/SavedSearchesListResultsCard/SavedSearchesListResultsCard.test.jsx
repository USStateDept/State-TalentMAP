import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import SavedSearchesListResultsCard from './SavedSearchesListResultsCard';
import { mappedParams, searchObject } from '../../../__mocks__/searchObject';

describe('SavedSearchesListResultsCardComponent', () => {
  const props = {
    mappedParams,
    savedSearch: searchObject,
    goToSavedSearch: () => {},
    deleteSearch: () => {},
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can click the delete button', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <SavedSearchesListResultsCard
        {...props}
        deleteSearch={spy}
      />,
    );
    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('can click the View button', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <SavedSearchesListResultsCard
        {...props}
        goToSavedSearch={spy}
      />,
    );

    wrapper.find('button').at(0).simulate('click');
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

  it('matches snapshot when saved search has no date', () => {
    const savedSearch = { ...props.savedSearch };
    savedSearch.date_created = null;
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
        savedSearch={savedSearch}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when availableCount and addedCount are truthy', () => {
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
        availableCount={3}
        addedCount={2}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
