import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import FieldSet from '../../FieldSet/FieldSet';
import TextInput from '../../TextInput';

const GlossarySearch = ({ changeText, searchTextValue }) => (
  <Form className="usa-grid-full glossary-form">
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
  </Form>
);

GlossarySearch.propTypes = {
  changeText: PropTypes.func.isRequired,
  searchTextValue: PropTypes.string,
};

GlossarySearch.defaultProps = {
  searchTextValue: '',
};

export default GlossarySearch;
