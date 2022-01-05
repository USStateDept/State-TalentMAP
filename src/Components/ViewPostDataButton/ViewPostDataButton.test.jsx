import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ViewPostDataButton from './ViewPostDataButton';

describe('ViewPostDataButtonComponent', () => {
  const props = {
    url: { internal: 'https://google.com/1', external: 'https://google-proxy.com/1' },
    type: 'post',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <ViewPostDataButton {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ViewPostDataButton {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
