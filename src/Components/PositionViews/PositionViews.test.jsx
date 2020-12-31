import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionViews from './PositionViews';

describe('PositionViews', () => {
  const props = {
    views: [{ count: 100, title: 'Test' }],
  };

  it('is defined', () => {
    const wrapper = shallow(
      <PositionViews.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionViews.WrappedComponent {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading', () => {
    const wrapper = shallow(
      <PositionViews.WrappedComponent {...props} viewsIsLoading />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when hasErrored', () => {
    const wrapper = shallow(
      <PositionViews.WrappedComponent {...props} viewsHasErrored />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
