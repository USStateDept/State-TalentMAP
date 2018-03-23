import {
  compact,
  has,
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
  keys,
  pickBy,
} from 'lodash';
import { PROFILE_MENU } from './Menu';

/**
 * Utility function that verifies if objects contains
 * all keys in array of keys passed
 * @param {object} item Object with keys values
 * @param {array} keys Array of keys to search for
 * @returns {boolean} Whether all keys exists
 * @example
 *
 * hasKeys({ key1: 'value1', key2: 'value2' }, ['key2', 'key3'])
 * // => false
 */
function hasKeys(item, keyArray) {
  const result = compact( // Removes false values from array
    keyArray.map(key => has(item, key)), // Maps array to result of has()
  );

  return (result.length === keyArray.length);
}

describe('Menu', () => {
  /**
   * @interface Rule
   *  interface Rule {
   *    type: 'boolean'|'number'|'array'|'string'|'object'
   *    required: boolean,
   *  }
   */
  const rules = {
    text: { type: 'string', required: true },
    icon: { type: 'string', required: false },
    route: { type: 'string', required: false },
    params: { type: 'string', required: false },
    toggleMenuSection: { type: 'boolean', required: false },
    expandedSection: { type: 'boolean', required: false },
    isCDO: { type: 'boolean', required: false },
    isGlossaryEditor: { type: 'boolean', required: false },
    children: { type: 'array', required: false },
  };

  const types = {
    array: isArray,
    boolean: isBoolean,
    number: isNumber,
    object: isObject,
    string: isString,
  };

  it('Verify PROFILE_MENU contains required options', () => {
    const requiredRules = pickBy(rules, item => item.required);
    const requiredKeys = keys(requiredRules);
    const expectAllToContainRequired = (items) => {
      items.forEach((item) => {
        expect(hasKeys(item, requiredKeys)).toBe(true);

        if (isArray(item.children)) {
          expectAllToContainRequired(item.children);
        }
      });
    };

    expectAllToContainRequired(PROFILE_MENU);
  });

  it('Verify PROFILE_MENU contains valid option values', () => {
    /**
     * Iterates through object keys and validates against rule definitions
     * @param  {object} item value
     * @return {boolean}     validation result
     */
    const validateRules = (item) => {
      let key;
      let rule;
      let value;
      let type;
      let validate;

      /* eslint-disable  no-restricted-syntax */
      for (key in item) {
        if (rules[key]) {
          rule = rules[key];
          type = rule.type;
          validate = types[type];
          value = item[key];

          // If tests fail, use:
          // console.log([key, type, value, validate(value)]);
          if (!validate(value)) {
            return false;
          }
        }
      }

      return true;
    };
    /* eslint-enable  no-restricted-syntax */

    const expectAllToValidate = (items) => {
      items.forEach((item) => {
        // If tests fail, use:
        // console.log([key, validateRules(item)]);
        expect(validateRules(item)).toBe(true);

        if (isArray(item.children)) {
          expectAllToValidate(item.children);
        }
      });
    };

    expectAllToValidate(PROFILE_MENU);
  });
});
