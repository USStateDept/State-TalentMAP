import ReactDOM from 'react-dom';
import axios from 'axios';
import Index, { getConfig, init, loadApp, render, renderIFrame, renderLoading } from './index';
import * as utilities from './utilities';

jest.mock('axios');
jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

describe('index', () => {
  const originalRender = ReactDOM.render;
  const originalGetElement = global.document.getElementById;
  let mockSessionStorage = {};

  beforeEach(() => {
    global.document.getElementById = () => true;
    ReactDOM.render = jest.fn();
    Object.defineProperty(global, 'sessionStorage', {
      value: {
        getItem: jest.fn((key) => {
          if (mockSessionStorage[key]) {
            return mockSessionStorage[key];
          }
          mockSessionStorage[key] = key;
          return key;
        }),
        setItem: jest.fn((key, value) => {
          mockSessionStorage[key] = value;
        }),
        removeItem: jest.fn((key) => {
          delete mockSessionStorage[key];
        }),
        clear: jest.fn(() => {
          mockSessionStorage = {};
        }),
      },
      writable: true,
    });
  });

  afterAll(() => {
    global.document.getElementById = originalGetElement;
    ReactDOM.render = originalRender;
    global.sessionStorage = mockSessionStorage;
  });

  it('renders without crashing', () => {
    expect(JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: 'censored' }),
    )).toMatchSnapshot();
  });

  it('renders without crashing on init()', async () => {
    const determineEnvSpy = jest.spyOn(utilities, 'determineEnv');
    axios.get.mockResolvedValueOnce({
      data: {
        apiUrl: 'http://localhost:8000/api/v1',
        hrAuthUrl: 'http://localhost:3333/Authorize?sAppCircuitID=32',
        hrAuthUrlPublic: 'http://msappproxy:3333/Authorize?sAppCircuitID=32',
        flags: { persona_auth: true },
      },
    });
    axios.get.mockResolvedValueOnce({ data: 'jwt-token' });

    await init();

    expect(global.sessionStorage.removeItem).toHaveBeenCalledWith('config');
    expect(determineEnvSpy).toHaveBeenCalledWith('http://localhost/');
    const configCall = global.sessionStorage.setItem.mock.calls.find(
      call => call[0] === 'config'
    );
    
    expect(JSON.parse(configCall[1])).toEqual(
      expect.objectContaining({
        flags: { persona_auth: true }
      })
    );
    expect(determineEnvSpy).toHaveReturnedWith('localhost');
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('renders without crashing on render()', () => {
    render();
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('renders without crashing on renderLoading()', () => {
    renderLoading();
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('renders without crashing on renderIFrame()', () => {
    renderIFrame('env');
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('renders without crashing on loadApp()', async () => {
    const headers = {
      Accept: 'application/json',
    };

    axios.get.mockResolvedValueOnce({
      data: { flags: { persona_auth: true } },
    });

    await loadApp(
      'http://localhost:3333/Authorize?sAppCircuitID=32',
      false,
      headers
    );

    expect(global.sessionStorage.setItem).toHaveBeenCalledWith('jwt', {
      flags: { persona_auth: true },
    });

    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('fetches config on getConfig()', async () => {
    axios.get.mockResolvedValueOnce({ data: { flags: { settings: true } } });

    const config = await getConfig('http://localhost:8000/api/v1/featureflags');

    expect(config).toEqual({ flags: { settings: true } });
  });
});
