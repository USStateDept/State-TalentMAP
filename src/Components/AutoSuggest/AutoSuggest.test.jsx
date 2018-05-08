import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import AutoSuggest from './AutoSuggest';

describe('AutoSuggestComponent', () => {
  const suggestions = [
    {
      short_name: 'suggestion 1',
      custom_prop: 'suggestion one',
    },
    {
      short_name: 'suggestion 2',
      custom_prop: 'suggestion two',
    },
  ];
  it('is defined', () => {
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
        inputId="input"
        label="label"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when labelSrOnly is false', () => {
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
        inputId="input"
        label="label"
        labelSrOnly={false}
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
        inputId="input"
        label="label"
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
        inputId="input"
        label="label"
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
        inputId="input"
        label="label"
      />,
    );
    wrapper.instance().onSuggestionSelected(null, { suggestion: suggestions[0] });
    sinon.assert.calledOnce(spy);
  });

  it('can call the onSuggestionSelected function using a queryProperty prop', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={spy}
        inputId="input"
        label="label"
        queryProperty="custom_prop"
      />,
    );
    wrapper.instance().onSuggestionSelected(null, { suggestion: suggestions[0] });
    sinon.assert.calledOnce(spy);
  });

  it('can call the renderSuggestion function', () => {
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
        inputId="input"
        label="label"
      />,
    );
    const template = wrapper.instance().renderSuggestion({ short_name: 'test', code: '01a' });
    expect(template).toBeDefined();
  });

  it('can add a label', () => {
    const label = 'label';
    const inputId = 'input';
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={() => {}}
        onSuggestionSelected={() => {}}
        inputId={inputId}
        label={label}
      />,
    );
    // check that the inner text is "label"
    expect(wrapper.find('label').text()).toContain(label);
    // and that the htmlFor attribute is "inputId"
    expect(wrapper.find('label').prop('htmlFor')).toBe(inputId);
  });

  it('can call the onSuggestionsFetchRequested function and perform debounce', (done) => {
    const debounce = 200;
    const spy = sinon.spy();
    const wrapper = shallow(
      <AutoSuggest
        suggestions={suggestions}
        getSuggestions={spy}
        onSuggestionSelected={() => {}}
        debounceMillis={debounce}
        inputId="input"
        label="label"
      />,
    );
    wrapper.instance().onSuggestionsFetchRequested({ value: 'test' });
    const f = () => {
      setTimeout(() => {
        sinon.assert.calledOnce(spy);
        done();
      }, debounce + 50);
    };
    f();
  });
});
