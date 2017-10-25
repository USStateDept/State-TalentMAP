import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import AutoSuggest from './AutoSuggest';

describe('AutoSuggestComponent', () => {
  const suggestions = [
    {
      short_name: 'suggestion 1',
    },
    {
      short_name: 'suggestion 2',
    },
  ];
  it('is defined', () => {
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can accept props', () => {
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
      />,
    );
    expect(wrapper.instance().props.suggestions[0].short_name).toBe(suggestions[0].short_name);
  });

  it('can call the onKeyChange function', () => {
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
      />,
    );
    wrapper.instance().onKeyChange(null, { newValue: { short_name: 'test' } });
    expect(wrapper.instance().state.value).toBe('test');
  });

  it('can call the onSuggestionSelected function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={spy}
      />,
    );
    wrapper.instance().onSuggestionSelected(null, { suggestion: { short_name: 'test' } });
    sinon.assert.calledOnce(spy);
  });

  it('can call the renderSuggestion function', () => {
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
      />,
    );
    const template = wrapper.instance().renderSuggestion({ short_name: 'test', code: '01a' });
    expect(template).toBeDefined();
  });

  it('can call the onSuggestionsFetchRequested function and perform debounce', (done) => {
    const debounce = 200;
    const spy = sinon.spy();
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={spy}
        onSuggestionSelected={() => {}}
        debounce={debounce}
      />,
    );
    wrapper.instance().onSuggestionsFetchRequested({ value: 'test' });
    const f = () => {
      setTimeout(() => {
        sinon.assert.calledOnce(spy);
        done();
      }, debounce);
    };
    f();
  });
});
