import selectedAccordion from './selectedAccordion';

describe('reducers', () => {
  it('can set reducer SELECTED_ACCORDION', () => {
    expect(selectedAccordion('', { type: 'SELECTED_ACCORDION', accordion: 'test' })).toBe('test');
  });
});
