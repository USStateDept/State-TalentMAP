import { Component } from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import FieldSet from '../../FieldSet/FieldSet';
import CheckBox from '../../CheckBox/CheckBox';
import { FILTER_ITEM } from '../../../Constants/PropTypes';
import { getItemLabel } from '../../../utilities';

class MultiSelectFilter extends Component {
  onCheckBoxClick = (value, props) => {
    this.props.queryParamToggle(props.selectionRef, props[this.props.queryProperty], !value);
  };

  getGroupedFilters() {
    const { item } = this.props;

    const groupedTerms = groupBy(item.data, (term) => {
      const first = term.description.substr(0, 1).toUpperCase();
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
    const { item, groupAlpha } = this.props;

    let itemsGroupedByAlpha;
    let alphaGroups;
    if (groupAlpha) {
      itemsGroupedByAlpha = this.getGroupedFilters();
      alphaGroups = Object.keys(itemsGroupedByAlpha);
    }
    return (
      <FieldSet key={item.item.title} legend={item.item.title} legendSrOnly>
        {
          !itemsGroupedByAlpha &&
            item.data.map((itemData) => {
              const itemLabel = getItemLabel(itemData);
              const itemData$ = { ...itemData };
              return (<CheckBox
                _id={itemData.id} /* when we need the original id */
                id={`checkbox${itemLabel}-${item.item.description}-${itemData$.code}`}
                key={`checkbox${itemLabel}-${item.item.description}-${itemData$.code}`}
                label={itemLabel}
                title={itemLabel}
                name={itemLabel}
                value={itemData.isSelected || false}
                code={itemData.code}
                selectionRef={item.item.selectionRef}
                onCheckBoxClick={this.onCheckBoxClick}
                className="tm-checkbox-transparent"
              />);
            })
        }
        {
          itemsGroupedByAlpha &&
            alphaGroups.map((group, i) => (
              <div key={group} className={`usa-grid-full term-group ${i === 0 ? 'term-group-first' : ''}`}>
                <div className="term-title">{group}</div>
                {
                  itemsGroupedByAlpha[group].map((itemData) => {
                    const itemLabel = getItemLabel(itemData);
                    return (
                      <CheckBox
                        _id={itemData.id} /* when we need the original id */
                        id={`checkbox${itemLabel}-${item.item.description}`}
                        key={`checkbox${itemLabel}-${item.item.description}`}
                        label={itemLabel}
                        title={itemLabel}
                        name={itemLabel}
                        value={itemData.isSelected || false}
                        code={itemData.code}
                        selectionRef={item.item.selectionRef}
                        onCheckBoxClick={this.onCheckBoxClick}
                        className="tm-checkbox-transparent"
                      />
                    );
                  },
                  )
                }
              </div>
            ))
        }
      </FieldSet>
    );
  }
}

MultiSelectFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  queryProperty: PropTypes.string,
  groupAlpha: PropTypes.bool,
};

MultiSelectFilter.defaultProps = {
  queryProperty: 'code',
  groupAlpha: false,
};

export default MultiSelectFilter;
