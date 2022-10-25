import { useEffect, useState } from 'react';
import { find, get, isEqual, orderBy, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import TextInput from 'Components/TextInput';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import DatePicker from 'react-datepicker';
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

  const getInsertionType = (type, ri) => {
    // date: date, date2,
    // number:  #,
    // text: not sure yet, but likely to be the default
    const type$ = type.replace(/[{}\d]/g, '').replace(/#/g, 'number');
    const returnTypes = {
      text: (<TextInput
        value={getTextInputValue(get(ri, 'rirmrkseqnum'), get(ri, 'riseqnum'))}
        changeText={v => setTextInput(get(ri, 'rirmrkseqnum'), get(ri, 'riseqnum'), v)}
        customContainerClass="remark-input"
        inputProps={{ autoComplete: 'off' }}
      />),
      date: (<DatePicker
        selected={getTextInputValue(get(ri, 'rirmrkseqnum'), get(ri, 'riseqnum'))}
        onChange={v => setTextInput(get(ri, 'rirmrkseqnum'), get(ri, 'riseqnum'), v)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="remark-input"
      />),
    };
    return returnTypes[type$] || returnTypes.text;
  };

  const renderText = r => {
    const rText = r.text.split(/(\s+)/);
    const regex = /({.*})/g;
    let regNum = 0;

    rText.forEach((a, i) => {
      if (a.match(regex)) {
        if (r.remark_inserts[regNum]) {
          rText.splice(i, 1, getInsertionType(a, r.remark_inserts[regNum]));
        }
        regNum += 1;
      }
    });

    return (
      <div className="remark-input-container">{rText}</div>
    );
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
                {remarksInCategory.map(r => (
                  (<li key={r.seq_num}>
                    <InteractiveElement onClick={() => updateSelection(r, textInputs)}>
                      <FA name={find(userSelections, { seq_num: r.seq_num }) ? 'minus-circle' : 'plus-circle'} />
                    </InteractiveElement>
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
      ari_insertions: PropTypes.arrayOf(
        PropTypes.shape({
          ri_seq_num: PropTypes.number,
          ari_insertion_text: PropTypes.string,
        }),
      ),
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
