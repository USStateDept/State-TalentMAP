import React from 'react';
import PropTypes from 'prop-types';
import Accordion, { AccordionItem } from '../../Accordion';
import SelectForm from '../../SelectForm/SelectForm';
import { FILTER_ITEM, EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import Proficiencies from '../../../Constants/Language';

const LanguageFilter = ({ item, setAccordion, selectedAccordion }) => (
  <Accordion>
    {
          (item.data || []).map(itemData => (
            <AccordionItem
              key={itemData.short_description}
              className="language-accordion-item"
              id={`language-${itemData.short_description}-section`}
              title={itemData.short_description}
              expanded={selectedAccordion.sub === itemData.short_description}
              setAccordion={() => setAccordion(itemData.short_description)}
            >
              <SelectForm
                id={`speaking-${itemData.short_description}-dropdown`}
                label="Speaking"
                options={Proficiencies}
              />
              <SelectForm
                id={`reading-${itemData.short_description}-dropdown`}
                label="Reading"
                options={Proficiencies}
              />
            </AccordionItem>
          ))
        }
  </Accordion>
);

LanguageFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
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
