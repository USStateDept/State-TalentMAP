import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GroupedCardList from './GroupedCardList';
import { groupedGlossaryItems, groupedTerms } from '../../../../__mocks__/glossaryItems';

describe('GroupedCardListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<GroupedCardList
      terms={groupedGlossaryItems}
      submitGlossaryTerm={() => {}}
      groups={groupedTerms}
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when a term id matches the id in the error object', () => {
    const wrapper = shallow(<GroupedCardList
      terms={groupedGlossaryItems}
      submitGlossaryTerm={() => {}}
      groups={groupedTerms}
      glossaryPatchHasErrored={{ id: 3 }}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GroupedCardList
      terms={groupedGlossaryItems}
      submitGlossaryTerm={() => {}}
      groups={groupedTerms}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
