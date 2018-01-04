import React from 'react';
import PropTypes from 'prop-types';
import FieldSet from '../../FieldSet/FieldSet';
import TextInput from '../../TextInput';

const GlossarySearch = ({ changeText, searchTextValue }) => (
  <FieldSet
    className="glossary-fieldset"
    legend="Enter a keyword to search"
    legendSrOnly
  >
    <TextInput
      id="glossary-search"
      label="Enter a keyword to search"
      changeText={changeText}
      value={searchTextValue}
      labelSrOnly
      placeholder="Search for terms"
    />
  </FieldSet>
);

GlossarySearch.propTypes = {
  changeText: PropTypes.func.isRequired,
  searchTextValue: PropTypes.string,
};

GlossarySearch.defaultProps = {
  searchTextValue: '',
};

export default GlossarySearch;
