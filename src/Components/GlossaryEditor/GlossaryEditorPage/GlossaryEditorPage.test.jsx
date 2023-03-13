import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorPage from './GlossaryEditorPage';
import glossaryItems from '../../../__mocks__/glossaryItems';

describe('GlossaryEditorPageComponent', () => {
  const props = {
    glossaryItems,
    glossaryIsLoading: false,
    glossaryHasErrored: false,
    submitGlossaryTerm: () => {},
    submitNewGlossaryTerm: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when glossaryIsLoading is true', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} glossaryIsLoading />);
    expect(wrapper).toBeDefined();
  });

  it('can call the changeText function', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    wrapper.instance().changeText({ q: 'text' });
    expect(wrapper.instance().state.searchText).toBe('text');
    expect(wrapper.instance().state.localSearchIsLoading).toBe(false);
  });

  it('can call the changeFirstLetter function', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    wrapper.instance().changeFirstLetter('A');
    expect(wrapper.instance().state.firstLetter).toBe('A');
    expect(wrapper.instance().state.localSearchIsLoading).toBe(false);
  });

  it('can call the debouncedChangeText function', (done) => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    wrapper.instance().debouncedChangeText({ q: 'text' });
    expect(wrapper.instance().state.localSearchIsLoading).toBe(true);
    setTimeout(() => {
      expect(wrapper.instance().state.searchText).toBe('text');
      expect(wrapper.instance().state.localSearchIsLoading).toBe(false);
      done();
    }, wrapper.instance().debounceTimeMs + 100);
  });

  it('can call the debouncedChangeLetter function', (done) => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    wrapper.instance().debouncedChangeLetter('A');
    expect(wrapper.instance().state.localSearchIsLoading).toBe(true);
    setTimeout(() => {
      expect(wrapper.instance().state.firstLetter).toBe('A');
      expect(wrapper.instance().state.localSearchIsLoading).toBe(false);
      done();
    }, wrapper.instance().debounceTimeMs + 100);
  });

  it('groups glossary terms by their first characters', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    const terms = wrapper.instance().filteredTermsBySearch();
    // '#' and 'A' should both be in the returned object
    expect(terms['#']).toBeDefined();
    expect(terms.A).toBeDefined();
  });

  it('groups glossary terms by their first characters and filters by firstLetter', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    wrapper.instance().changeFirstLetter('A');
    const terms = wrapper.instance().filteredTermsBySearchAndGlossary();
    // '#' should not exist, while 'A' should be in the returned object
    expect(terms['#']).toBeUndefined();
    expect(terms.A).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when glossaryIsLoading is true', () => {
    const wrapper = shallow(<GlossaryEditorPage {...props} glossaryIsLoading />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
