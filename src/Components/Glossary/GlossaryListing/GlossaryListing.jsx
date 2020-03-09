import React, { Component } from 'react';
import { get, groupBy, trim } from 'lodash';
import Accordion, { AccordionItem } from '../../Accordion';
import { GLOSSARY_ARRAY } from '../../../Constants/PropTypes';
import { formatIdSpacing } from '../../../utilities';

class GlossaryComponent extends Component {
  getGroupedTerms() {
    const { glossaryItems } = this.props;

    const groupedTerms = groupBy(glossaryItems, (term) => {
      const term$ = get(term, 'title', '');
      if (!term$) {
        return null;
      }

      const first = term$.substr(0, 1).toUpperCase();
      // check if it's a letter
      const firstIsAlpha = first.match(/^[a-zA-Z]*$/);
      // if so, assign it to its first letter
      if (firstIsAlpha) {
        return first;
      // else, assign it to the '#' prop
      } return '#';
    });

    return groupedTerms;
  }
  render() {
    const groupedTerms = this.getGroupedTerms();
    return (
      <Accordion className="accordion-inverse" isMultiselectable>
        {
          Object.keys(groupedTerms).map(group => (
            <div className="usa-grid-full" key={group}>
              <h4>{group}</h4>
              {
                groupedTerms[group].map(item =>
                  (<AccordionItem
                    key={item.id}
                    title={item.title}
                    id={formatIdSpacing(trim(item.title))}
                    useIdClass={false}
                  >
                    <div className="usa-grid-full">
                      {item.definition} {item.link && <a href={item.link} rel="noopener noreferrer" target="_blank">Read more here</a>}
                    </div>
                  </AccordionItem>),
                )
              }
            </div>
          ))
        }
      </Accordion>
    );
  }
}

GlossaryComponent.propTypes = {
  glossaryItems: GLOSSARY_ARRAY.isRequired,
};

export default GlossaryComponent;
