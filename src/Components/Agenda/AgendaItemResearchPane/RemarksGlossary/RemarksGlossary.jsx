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
  const [exclusiveCats, setExclusiveCats] = useState({});

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
      /* eslint-disable no-console */
      console.log('🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹');
      console.log('🥹 current: textInputs$', textInputs$);
      console.log('🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹');

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

  const renderExclusiveCats = () => {
    const rCatCodes = uniqBy(remarkCategories, 'code');
    let exclusiveCategories = { exlusiveSeqs: [] };
    // unfortunately we have to loop twice bc we can't trust all remarks in a category
    // to be consistent in their mutually_exclusive_ind status
    remarks.forEach(r => {
      if(r?.mutually_exclusive_ind === 'Y') {
        exclusiveCategories[r?.rc_code] = { remarkCatSelected: false }
      }
    });
    remarks.forEach(r => {
      const exlusiveRCatCodes = Object.keys(exclusiveCategories);
      if(exlusiveRCatCodes.includes(r?.rc_code)) {
        // i thought having an array of the seqnums would help with optimization
        // but since our remarks usually have the rc_code in them, we can just look up on that
        // to prevent looping on all 😾 to find
        // pending: remove seqNums [] before opening PR for review
        exclusiveCategories[r?.rc_code]['seqNums'] ??= [];
        exclusiveCategories[r?.rc_code]['seqNums'].push(r?.seq_num);
        exclusiveCategories?.exlusiveSeqs.push(r?.seq_num);
      }
    });
    /* eslint-disable no-console */
    console.log('🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁');
    console.log('🧁 current: exclusiveCategories', exclusiveCategories);

    setExclusiveCats(exclusiveCategories);
  };

  const updateExclusiveCats = () => {
    let exclusiveCats$ = {...exclusiveCats};

    // reset cats
    Object.keys(exclusiveCats$).forEach(c => {
      // pending: remove if removing exlusiveSeqs
      if(c !== 'exlusiveSeqs') {
        exclusiveCats$[c].remarkCatSelected = false;
      }
    })

    userSelections.forEach(r => {
      if(exclusiveCats$[r.rc_code]){
        exclusiveCats$[r.rc_code].remarkCatSelected = true;
      }
    });

    setExclusiveCats(exclusiveCats$);
  };

  const getInteractiveType = (r, textInputs) => {
    let interactiveType = '';

    //for this category go through the user remarks and if they already
    // have a selection in that category, disable the adding of more than one per category
    /* eslint-disable no-console */
    console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');
    console.log('🦄 current: r', r);
    console.log('🦄 current: userSelections', userSelections);
    console.log('🦄 current: find(userSelections, { seq_num: r.seq_num })', find(userSelections, { seq_num: r.seq_num }));

    if(find(userSelections, { seq_num: r.seq_num })) {
      interactiveType = 'selectedEnabled'
    } else if(exclusiveCats?.[r.rc_code]?.remarkCatSelected) {
      interactiveType = 'notSelectedDisabled'
    } else {
      interactiveType = 'notSelectedEnabled'
    }

    console.log('🦄 current: interactiveType', interactiveType);
    console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');

    const returnTypes = {
      selectedEnabled: (<InteractiveElement onClick={() => updateSelection(r, textInputs)}>
        <FA name='minus-circle' />
      </InteractiveElement>),
      notSelectedDisabled: (<InteractiveElement onClick={() => {}}>
        <FA
          name='plus-circle'
          className='fa-disabled'
        />
      </InteractiveElement>),
      notSelectedEnabled: (<InteractiveElement onClick={() => updateSelection(r, textInputs)}>
        <FA name='plus-circle' />
      </InteractiveElement>),
    };

    return returnTypes[interactiveType];
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
  let remarkCategories$ = orderBy(remarkCategoriesCodes, 'desc_text');

  const processClick = remark => {
    const el = document.getElementById(`remark-category-${remark.code}`);
    el.scrollIntoView();
  };

  useEffect(() => {
    setTextInputBulk(remarks);
  }, [remarks]);

  useEffect(() => {
    updateExclusiveCats();
  }, [userSelections]);

  useEffect(() => {
    renderExclusiveCats();
  }, []);

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
          const isExclusiveCatText = exclusiveCats.hasOwnProperty(category.code) ? ' (one remark per this category)' : '';

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
