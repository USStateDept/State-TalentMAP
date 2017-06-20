import Index from './index';

it('renders without crashing', () => {
  expect(JSON.stringify(
    Object.assign({}, Index, { _reactInternalInstance: 'censored' }),
  )).toMatchSnapshot();
});
