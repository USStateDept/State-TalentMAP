import { getFlags } from './flags';

it('catches errors with the session storage value', () => {
  sessionStorage.setItem('config', '{');
  expect(getFlags()).toEqual({});
});
