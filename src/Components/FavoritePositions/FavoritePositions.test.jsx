import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import FavoritePositions from './FavoritePositions';
import favoritesObject from '../../__mocks__/favoritesObject';
import bidListObject from '../../__mocks__/bidListObject';


describe('FavoritePositionsComponent', () => {
  const props = {
    favorites: favoritesObject.favorites,
    favoritesPV: favoritesObject.favoritesPV,
    favoritesTandem: favoritesObject.favoritesTandem,
    favoritesPVTandem: favoritesObject.favoritesPVTandem,
    favoritePositionsIsLoading: false,
    favoritePositionsHasErrored: false,
    bidList: bidListObject.results,
    onSortChange: () => {},
    sortType: '',
    page: 1,
    pageSize: 12,
    counts: favoritesObject.counts,
    onPageChange: () => {},
    selectedNav: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  xit('is defined when selected === open', () => {
    const spy = sinon.spy();
    let wrapper;
    act(() => {
      wrapper = mount(
        <FavoritePositions
          {...props}
          selectedNav={spy}
        />,
      );
    });
    wrapper.find('Nav').simulate('onClick', 'open');
    sinon.assert.calledOnce(spy);
  });

  xit('is defined when selected === pv', () => {
    // const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    wrapper.setState({ selected: 'pv' });
    expect(wrapper).toBeDefined();
  });

  xit('is defined when selected === pvTandem', () => {
    // const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    wrapper.setState({ selected: 'pvTandem' });
    expect(wrapper).toBeDefined();
  });

  xit('is defined when selected === openTandem', () => {
    // const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    wrapper.setState({ selected: 'openTandem' });
    expect(wrapper).toBeDefined();
  });

  xit('can receive props', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(wrapper.instance().props.favorites).toBe(props.favorites);
  });

  it('displays an alert if there are no positions', () => {
    const wrapper = shallow(
      <FavoritePositions
        {...props}
        favorites={[]}
        favoritesPV={[]}
        favoritesTandem={[]}
        favoritesPVTandem={[]}
        favoritePositionsIsLoading={false}
      />,
    );
    expect(wrapper.find('NoFavorites').exists()).toBe(true);
  });

  it('renders the Spinner when loading', () => {
    const wrapper = shallow(
      <FavoritePositions
        {...props}
        favoritePositionsIsLoading
        favoritePositionsHasErrored={false}
      />,
    );
    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
