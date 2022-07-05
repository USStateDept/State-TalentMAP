import { useEffect, useState } from 'react';
import { find, get, has, isEqual, orderBy, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import TextInput from 'Components/TextInput';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Fuse from 'fuse.js';

const RemarksGlossary = ({ remarks, remarkCategories, userSelections, updateSelection }) => {
  const [textInputs, setTextInputs] = useState({});

  // still need indicator to come through for input
  const setTextInput = (key, value) => {
    const textInputs$ = { ...textInputs };
    textInputs$[key] = value;
    setTextInputs(textInputs$);
  };

  const setTextInputBulk = (remarksArr = []) => {
    const textInputs$ = {};
    remarksArr.forEach(f => {
      if (has(f, 'text')) {
        textInputs$[f.seq_num] = f.text;
      }
    });
    if (!isEqual(textInputs$, textInputs)) {
      setTextInputs(textInputs$);
    }
  };

  const getTextInputValue = key => get(textInputs, key) || '';

  const [remarks$, setRemarks$] = useState(remarks);

  const fuseOptions = {
    shouldSort: false,
    findAllMatches: true,
    tokenize: true,
    includeScore: false,
    threshold: 0.25,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'text',
    ],
  };

  const fuse$ = new Fuse(remarks, fuseOptions);

  const search = a => setRemarks$(fuse$.search(a));
  const [term, setTerm] = useState('');

  const remarks$$ = term ? remarks$ : remarks;

  let remarkCategories$ = uniqBy(remarkCategories, 'code').map(({ code, desc_text }) => ({ code, desc_text }));
  remarkCategories$ = orderBy(remarkCategories$, 'desc_text');

  const processClick = remark => {
    const el = document.getElementById(`remark-category-${remark.code}`);
    el.scrollIntoView();
  };

  useEffect(() => {
    setTextInputBulk(remarks);
  }, [remarks]);

  return (
    <div className="usa-grid-full remarks-glossary-container">
      <TextInput
        changeText={e => { search(e); setTerm(e); }}
        value={term}
        labelSrOnly
        placeholder="Search for Remarks"
        inputProps={{
          autoComplete: 'off',
        }}
      />
      <div className="remarks-glossary-container">
        <div className="usa-grid-full remarks-categories-container">
          {remarkCategories$.map(a => (
            <a tabIndex={0} role="button" onClick={() => processClick(a)}>{a.desc_text}</a>))}
        </div>
        {remarkCategories$.map(category => {
          const remarksInCategory = orderBy(remarks$$.filter(f => f.rc_code === category.code), 'order_num');
          return (
            <div key={category.code}>
              <div id={`remark-category-${category.code}`} className={`remark-category remark-category--${category.code}`}>{category.desc_text}</div>
              <ul>
                {remarksInCategory.map(r => {
                // still need indicator to come through for input
                  const hasTextInput = false;
                  return (
                    <li key={r.seq_num}>
                      <InteractiveElement onClick={() => updateSelection(r)}>
                        <FA name={find(userSelections, { seq_num: r.seq_num }) ? 'minus-circle' : 'plus-circle'} />
                      </InteractiveElement>
                      <span className="remark-text">{r.text}</span>
                      {
                        hasTextInput &&
                      <TextInput
                        value={getTextInputValue(r.seq_num)}
                        changeText={v => setTextInput(r.seq_num, v)}
                        customContainerClass="remarks-input-container"
                        inputProps={{ autoComplete: 'off' }}
                      />
                      }
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

RemarksGlossary.propTypes = {
  userSelections: PropTypes.arrayOf(
    PropTypes.shape({
      seq_num: PropTypes.number,
      rc_code: PropTypes.string,
      order_num: PropTypes.number,
      short_desc_text: PropTypes.string,
      mutually_exclusive_ind: PropTypes.string,
      text: PropTypes.string,
      active_ind: PropTypes.string,
    }),
  ),
  remarks: PropTypes.arrayOf(
    PropTypes.shape({
      seq_num: PropTypes.number,
      rc_code: PropTypes.string,
      order_num: PropTypes.number,
      short_desc_text: PropTypes.string,
      mutually_exclusive_ind: PropTypes.string,
      text: PropTypes.string,
      active_ind: PropTypes.string,
    }),
  ),
  remarkCategories: PropTypes.arrayOf(PropTypes.shape({})),
  updateSelection: PropTypes.func,
};

RemarksGlossary.defaultProps = {
  userSelections: [],
  remarks: [],
  remarkCategories: [],
  updateSelection: EMPTY_FUNCTION,
};

export default RemarksGlossary;
