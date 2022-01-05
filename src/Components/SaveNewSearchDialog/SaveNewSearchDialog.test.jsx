import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SaveNewSearchDialog from './SaveNewSearchDialog';

describe('SaveNewSearchDialogComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        saveSearch={() => {}}
        newSavedSearchHasErrored="error"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the onSubmit function', () => {
    const form = { value: null, preventDefault: sinon.spy() };
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        saveSearch={(e) => { form.value = e; }}
        newSavedSearchHasErrored="error"
      />,
    );
    wrapper.instance().onSubmit(form);
    expect(form.value).toBe(form.value);
    sinon.assert.calledOnce(form.preventDefault);
  });

  it('can call the onSubmit function for an update', () => {
    const form = { value: null, valueSec: null, preventDefault: sinon.spy() };
    const savedSearch = { id: 1, name: 'test' };
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        saveSearch={(e, id) => { form.value = e; form.valueSec = id; }}
        newSavedSearchHasErrored="error"
        currentSavedSearch={savedSearch}
      />,
    );
    wrapper.instance().onSubmit(form);
    expect(form.value).toBe(savedSearch.name);
    expect(form.valueSec).toBe(savedSearch.id);
    sinon.assert.calledOnce(form.preventDefault);
  });

  it('can call the updateSavedSearch function', () => {
    const form = { value: null, valueSec: null, preventDefault: sinon.spy() };
    const savedSearch = { id: 1, name: 'test' };
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        saveSearch={(e, id) => { form.value = e; form.valueSec = id; }}
        newSavedSearchHasErrored="error"
        currentSavedSearch={savedSearch}
      />,
    );
    wrapper.instance().updateSavedSearch(form);
    expect(form.value).toBe(savedSearch.name);
    expect(form.valueSec).toBe(savedSearch.id);
    sinon.assert.calledOnce(form.preventDefault);
  });

  it('can call the changeNewSearchName function', () => {
    const text = 'text';
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        saveSearch={() => {}}
        newSavedSearchHasErrored="error"
      />,
    );
    wrapper.instance().changeNewSearchName(text);
    expect(wrapper.instance().state.newSearchName.value).toBe(text);
  });

  it('can call functions', () => {
    const cancelSpy = sinon.spy();
    const formSubmitSpy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={cancelSpy}
        saveSearch={formSubmitSpy}
      />,
    );
    wrapper.instance().props.onCancel();
    wrapper.instance().onSubmit();
    sinon.assert.calledOnce(cancelSpy);
    sinon.assert.calledOnce(formSubmitSpy);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        saveSearch={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
