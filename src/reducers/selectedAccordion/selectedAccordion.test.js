import selectedAccordion from './selectedAccordion';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';

describe('reducers', () => {
  const accordion = ACCORDION_SELECTION;

  it('can set reducer SELECTED_ACCORDION', () => {
    expect(selectedAccordion('', { type: 'SELECTED_ACCORDION', accordion })).toBe(accordion);
  });
});
