import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import PostFilter from './PostFilter';

describe('PostFilterComponent', () => {
  const postFilter = {
    item: {
      title: 'Post',
      description: 'post',
      endpoint: 'orgpost',
      selectionRef: 'post',
    },
    data: [
      { id: 1, name: 'Name', location: { city: 'City', state: 'ST', country: 'United States' } },
      { id: 2, name: 'Name', location: { city: 'City', country: 'France' } },
    ],
  };

  const props = {
    item: postFilter,
    queryParamToggle: () => {},
    autoSuggestProps: {
      getSuggestions: () => {},
      suggestions: [],
      onSuggestionSelected: () => {},
      queryProperty: 'id',
      displayProperty: 'prop',
      id: 'id',
      inputId: 'id',
      label: 'Search locations',
    },
    queryParamUpdate: () => {},
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <PostFilter
        {...props}
      />,
    );
    expect(wrapper.instance().props.item.item.title).toBe(props.item.item.title);
  });

  it('can call the onCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <PostFilter
        {...props}
        queryParamToggle={spy}
      />,
    );
    wrapper.instance().onCheckBoxClick(true, { selectionRef: 'test', code: 'code' });
    sinon.assert.calledOnce(spy);
  });

  it('can call the onSelectAllDomesticPosts function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <PostFilter
        {...props}
        queryParamUpdate={spy}
      />,
    );
    wrapper.instance().onSelectAllDomesticPosts(true);
    sinon.assert.calledOnce(spy);
    expect(wrapper.instance().state.allDomesticSelected).toBe(false);
  });

  it('can call the onSelectAllOverseasPosts function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <PostFilter
        {...props}
        queryParamUpdate={spy}
      />,
    );
    wrapper.instance().onSelectAllOverseasPosts(true);
    sinon.assert.calledOnce(spy);
    expect(wrapper.instance().state.allOverseasSelected).toBe(false);
  });

  it('can update on componentWillReceiveProps', () => {
    const wrapper = shallow(
      <PostFilter
        {...props}
      />,
    );
    const spy = sinon.spy(wrapper.instance(), 'setSelectedStates');
    wrapper.instance().UNSAFE_componentWillReceiveProps(
      { domesticIsSelected: true, overseasIsSelected: false },
    );
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PostFilter
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can receive null countries for onSelectAllDomesticPosts', () => {
    const nullCountries = [
      { name: 'Name', location: { city: 'City', state: 'ST', country: null } },
      { name: 'Name', location: { city: 'City' } },
      { name: 'Name' },
    ];
    const countryProps = props;
    countryProps.item.data = nullCountries;

    const spy = sinon.spy();

    const wrapper = shallow(
      <PostFilter
        {...countryProps}
        queryParamUpdate={spy}
      />,
    );
    wrapper.instance().onSelectAllDomesticPosts(true);
    sinon.assert.calledOnce(spy);
    expect(wrapper.instance().state.allDomesticSelected).toBe(false);
    wrapper.instance().onSelectAllDomesticPosts(false);
    sinon.assert.calledTwice(spy);
    expect(wrapper.instance().state.allDomesticSelected).toBe(true);
  });

  it('can receive null countries for onSelectAllOverseasPosts', () => {
    const nullCountries = [
      { name: 'Name', location: { city: 'City', state: 'ST', country: null } },
      { name: 'Name', location: { city: 'City' } },
      { name: 'Name' },
    ];
    const countryProps = props;
    countryProps.item.data = nullCountries;

    const spy = sinon.spy();

    const wrapper = shallow(
      <PostFilter
        {...countryProps}
        queryParamUpdate={spy}
      />,
    );
    wrapper.instance().onSelectAllOverseasPosts(true);
    sinon.assert.calledOnce(spy);
    expect(wrapper.instance().state.allOverseasSelected).toBe(false);
    wrapper.instance().onSelectAllOverseasPosts(false);
    sinon.assert.calledTwice(spy);
    expect(wrapper.instance().state.allOverseasSelected).toBe(true);
  });
});
