import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SaveNewSearchContainer from './SaveNewSearchContainer';

describe('SaveNewSearchContainerComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored="message"
        newSavedSearchSuccess={false}
        newSavedSearchIsSaving={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('accepts different props', () => {
    const success = 'success';
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored={false}
        newSavedSearchSuccess="success"
        newSavedSearchIsSaving={false}
      />,
    );
    expect(wrapper.instance().props.newSavedSearchSuccess).toBe(success);
  });

  it('can call the toggleInput function', () => {
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored={false}
        newSavedSearchSuccess={false}
        newSavedSearchIsSaving={false}
      />,
    );
    expect(wrapper.instance().state.showInput.value).toBe(false);
    wrapper.instance().toggleInput({ preventDefault: () => {} });
    expect(wrapper.instance().state.showInput.value).toBe(true);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored="message"
        newSavedSearchSuccess={false}
        newSavedSearchIsSaving
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
