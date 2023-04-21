/* eslint-disable */
import { useEffect, useState } from 'react';
import { find, get, isEqual, orderBy, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import TextInput from 'Components/TextInput';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Fuse from 'fuse.js';

const RemarksGlossary = ({ remarks, remarkCategories, userSelections, updateSelection }) => {
  const [textInputs, setTextInputs] = useState({});

  const setTextInput = (rSeq, riSeq, value) => {
    const textInputs$ = { ...textInputs };
    if (!textInputs$[rSeq.toString()]) {
      textInputs$[rSeq.toString()] = {};
      textInputs$[rSeq.toString()][riSeq.toString()] = value;
    } else {
      textInputs$[rSeq.toString()][riSeq.toString()] = value;
    }
    setTextInputs(textInputs$);
  };

  const setTextInputBulk = (remarksArr = []) => {
    const textInputs$ = {};
    remarksArr.forEach(r => {
      r.remark_inserts.forEach(ri => {
        if (!textInputs$[(r.seq_num).toString()]) {
          textInputs$[(r.seq_num).toString()] = {};
          textInputs$[(r.seq_num).toString()][(ri.riseqnum).toString()] = ri.riinsertiontext;
        } else {
          textInputs$[(r.seq_num).toString()][(ri.riseqnum).toString()] = ri.riinsertiontext;
        }
      });
    });
    if (!isEqual(textInputs$, textInputs)) {
      setTextInputs(textInputs$);
    }
  };

  const getTextInputValue = (rSeq, riSeq) => get(textInputs, rSeq[riSeq]) || '';

  const renderText = r => {
    const rText = r?.text?.split(/(\s+)/) || '';
    const rInserts = r?.remark_inserts || [];

    rInserts.forEach((a) => {
      const rInsertionText = a?.riinsertiontext;
      const rTextI = rText.indexOf(rInsertionText);
      if (rTextI > -1) {
        rText.splice(rTextI, 1, <TextInput
          value={getTextInputValue(get(a, 'rirmrkseqnum'), get(a, 'riseqnum'))}
          changeText={v => setTextInput(get(a, 'rirmrkseqnum'), get(a, 'riseqnum'), v)}
          customContainerClass="remark-input"
          placeholder={rInsertionText.replace(/[{}\d]/g, '').replace(/#/g, 'number')}
          id="remarks-custom-input"
          key={a.riseqnum}
          inputProps={{ autoComplete: 'off' }}
        />);
      }
    });
    return (
      <div className="remark-input-container">{rText}</div>
    );
  };

  const getInteractiveType = (r, textInputs) => {

    //for this category go through the user remarks and if they already
    // have a selection in that category, then we'll keep track of it for all categories a
    // and only enable it for the first one
    /* eslint-disable no-console */
    console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');
    console.log('🦄 current: remarkCategoriesCodes', remarkCategoriesCodes);
    console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');

    const returnTypes = {
      mutallyExcusive: (<InteractiveElement onClick={() => updateSelection(r, textInputs)}>
        <FA name={find(userSelections, { seq_num: r.seq_num }) ? 'minus-circle' : 'plus-circle'} />
      </InteractiveElement>),
      notutallyExcusive: (<InteractiveElement onClick={() => updateSelection(r, textInputs)}>
        <FA name={find(userSelections, { seq_num: r.seq_num }) ? 'minus-circle' : 'plus-circle'} />
      </InteractiveElement>),
    };

    return returnTypes['mutallyExcusive'];
  };




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

  const search = a => setRemarks$(fuse$.search(a).map(({ item }) => item));
  const [term, setTerm] = useState('');

  const remarks$$ = term ? remarks$ : remarks;

  const remarkCategoriesCodes = uniqBy(remarkCategories, 'code');

  let remarkCategories$ = remarkCategoriesCodes.map(({ code, desc_text }) => ({ code, desc_text }));
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
        id="remarks-search"
        inputProps={{
          autoComplete: 'off',
        }}
      />
      <div className="remarks-glossary-container">
        <div className="usa-grid-full remarks-categories-container">
          {remarkCategories$.map(a => (
            <a key={a.desc_text} tabIndex={0} role="button" onClick={() => processClick(a)}>{a.desc_text}</a>))}
        </div>
        {remarkCategories$.map(category => {
          const remarksInCategory = orderBy(remarks$$.filter(f => f.rc_code === category.code), 'order_num');
          // eslint-disable-next-line dot-notation
          const isExclusiveCat = remarksInCategory?.[0]?.['mutually_exclusive_ind'] === 'Y';
          const isExclusiveCatText = isExclusiveCat ? ' (one remark per this category)' : '';

          return (
            <div key={category.code}>
              <div id={`remark-category-${category.code}`} className={`remark-category remark-category--${category.code}`}>
                {category.desc_text}{isExclusiveCatText}
              </div>
              <ul>
                {remarksInCategory.map(r => (
                  (<li key={r.seq_num}>
                    {getInteractiveType(r, textInputs)}
                    {renderText(r)}
                  </li>)
                ))}
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
      ari_insertions: PropTypes.shape({
        ri_seq_num: PropTypes.number,
        ari_insertion_text: PropTypes.string,
      }),
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
      ri_insertions: PropTypes.arrayOf(
        PropTypes.shape({
          ri_seq_num: PropTypes.number,
          ri_insertion_text: PropTypes.string,
        }),
      ),
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
