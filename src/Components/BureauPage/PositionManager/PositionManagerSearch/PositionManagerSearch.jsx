import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'Components/SearchBar/SearchBar';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';


const PositionManagerSearch = forwardRef((props, ref) => {
  const [q, setQ] = useState('');
  const childRef = useRef();

  function changeText(e) {
    props.onChange(e.target.value);
    setQ(e.target.value);
  }
  function onClear() {
    setQ('');
    props.submitSearch('');
  }

  function submitForm(e) {
    // resolves “Form submission canceled because the form is not connected” warning
    if (e && e.preventDefault) { e.preventDefault(); }
    props.submitSearch(q);
  }

  useImperativeHandle(
    ref,
    () => ({
      clearText() {
        childRef.current.clearSearch();
      },
    }),
  );

  return (
    <form className="usa-grid-full">
      <fieldset>
        <div className="usa-width-one-whole search-results-inputs search-keyword">
          <legend className="usa-grid-full homepage-search-legend">{props.label}</legend>
          <SearchBar
            id="bureau-search-keyword-field"
            defaultValue={props.textSearch || props.defaultValue}
            label="Keywords"
            labelSrOnly
            noForm
            onChangeText={changeText}
            onClear={onClear}
            placeholder={props.placeHolder}
            showClear
            submitText="Search"
            type="medium"
            ref={childRef}
            submitForm={submitForm}
          />
        </div>
      </fieldset>
    </form>
  );
});

PositionManagerSearch.propTypes = {
  submitSearch: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  textSearch: PropTypes.string,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
};

PositionManagerSearch.defaultProps = {
  submitSearch: EMPTY_FUNCTION,
  onChange: EMPTY_FUNCTION,
  defaultValue: '',
  textSearch: '',
  label: '',
  placeHolder: 'Type keywords here',
};

export default PositionManagerSearch;
