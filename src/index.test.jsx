import ReactDOM from 'react-dom';
import Index, { init, render } from './index';
import config from '../public/config/config.json';

describe('index', () => {
  const originalRender = ReactDOM.render;
  const originalGetElement = global.document.getElementById;
  beforeEach(() => {
    global.document.getElementById = () => true;
    ReactDOM.render = jest.fn();
  });
  afterAll(() => {
    global.document.getElementById = originalGetElement;
    ReactDOM.render = originalRender;
  });

  it('renders without crashing', () => {
    expect(JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: 'censored' }),
    )).toMatchSnapshot();
  });

  it('renders without crashing on init()', () => {
    init(config);
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('renders without crashing on render()', () => {
    render();
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
