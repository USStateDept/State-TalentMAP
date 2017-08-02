import handleApiErrors from './api-errors';

describe('api errors', () => {
  it('can return an error', () => {
    expect(() => handleApiErrors({ ok: false, statusText: 404 })).toThrow('404');
  });

  it('can return a response', () => {
    const res = { ok: true };
    expect(handleApiErrors(res)).toBe(res);
  });
});
