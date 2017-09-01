import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldSet from '../../FieldSet/FieldSet';
import CheckBox from '../../CheckBox/CheckBox';
import Accordion from '../../Accordion/Accordion';
import AccordionItem from '../../Accordion/AccordionItem/AccordionItem';
import SelectForm from '../../SelectForm/SelectForm';
import { FILTER_ITEM, EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import Proficiencies from '../../../Constants/Language';

class LanguageFilter extends Component { // eslint-disable-line
  render() {
    const { item, setAccordion, selectedAccordion, queryParamUpdate } = this.props;
    return (
      <Accordion>
        {
          (item.data || []).map(itemData => (
            <AccordionItem
              key={itemData.short_description}
              id={`language-${itemData.short_description}-section`}
              title={itemData.short_description}
              expanded={selectedAccordion.sub === itemData.short_description}
              setAccordion={() => setAccordion(itemData.short_description)}
            >
              {itemData.short_description}
              <SelectForm
                id={`speaking-${itemData.short_description}-dropdown`}
                label="Speaking"
                options={Proficiencies}
              />
              <SelectForm
                id={`written-${itemData.short_description}-dropdown`}
                label="Written"
                options={Proficiencies}
              />
              <FieldSet legend="Other">
                <CheckBox
                  id={`checkbox-${itemData.short_description}-passed`}
                  key={`${itemData.short_description}-passed`}
                  label="Passed Language Test"
                  title="Passed Language Test"
                  name="Passed Language Test"
                  code="Passed Language Test"
                  value="passed"
                  selectionRef="language"
                />
                <CheckBox
                  id={`checkbox-${itemData.short_description}-notest`}
                  key={`${itemData.short_description}-notest`}
                  label="No Test"
                  title="No Test"
                  name="No Test"
                  code="No Test"
                  value="no test"
                  selectionRef="language"
                />
              </FieldSet>
              <button
                className="usa-button language-view-all"
                type="submit"
                onClick={() => queryParamUpdate(itemData.code)}
              >
                View all {itemData.short_description} positions
              </button>
            </AccordionItem>
          ))
        }
      </Accordion>
    );
  }
}

LanguageFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  setAccordion: PropTypes.func,
  selectedAccordion: PropTypes.shape({
    main: PropTypes.string,
    sub: PropTypes.string,
  }).isRequired,
};

LanguageFilter.defaultProps = {
  setAccordion: EMPTY_FUNCTION,
};

export default LanguageFilter;
