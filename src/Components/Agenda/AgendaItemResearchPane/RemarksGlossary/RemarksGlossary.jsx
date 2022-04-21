import { useEffect, useState } from 'react';
import { get, has, isEqual, orderBy, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import TextInput from 'Components/TextInput';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
// import Scroll from 'react-scroll';
import Fuse from 'fuse.js';

const RemarksGlossary = ({ onRemarkClick, remarks }) => {
  const [textInputs, setTextInputs] = useState({});
  // const categoryRef = useRef();

  const setTextInput = (key, value) => {
    const textInputs$ = { ...textInputs };
    textInputs$[key] = value;
    setTextInputs(textInputs$);
  };

  const setTextInputBulk = (remarksArr = []) => {
    const textInputs$ = {};
    remarksArr.forEach(f => {
      if (has(f, 'textInputValue')) {
        textInputs$[f.rmrkseqnum] = f.textInputValue;
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
      'rmrktext',
    ],
  };

  const fuse$ = new Fuse(remarks, fuseOptions);

  const search = a => setRemarks$(fuse$.search(a));
  const [term, setTerm] = useState('');

  const remarks$$ = term ? remarks$ : remarks;

  let remarksCategories = uniqBy(remarks$$, 'rmrkrccode').map(({ rmrkrccode, rcdesctext }) => ({ rmrkrccode, rcdesctext }));
  remarksCategories = orderBy(remarksCategories, 'rcdesctext');

  // const categoriesList = remarksCategories.map(a => <li key={a.rcdesctext}>{a.rcdesctext}</li>);

  const onRemarkClick$ = remark => {
    const textInputValue = getTextInputValue(remark.rmrkseqnum);
    const remark$ = { ...remark, textInputValue };
    onRemarkClick(remark$);
  };

  const processClick = remark => {
    console.log(remark);
    const el = document.getElementById(`remark-category-${remark.rmrkrccode}`);
    console.log(el);
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
      <div className="usa-grid-full remarks-categories-container">
        {remarksCategories.map(a => (
          <a tabIndex={0} role="button" onClick={() => processClick(a)}>{a.rcdesctext}</a>))}
      </div>
      {remarksCategories.map(category => {
        const remarksInCategory = orderBy(remarks$$.filter(f => f.rmrkrccode === category.rmrkrccode), 'rmrkordernum');
        return (
          <div>
            <div key={category.rmrkrccode}>
              <div id={`remark-category-${category.rmrkrccode}`} className={`remark-category remark-category--${category.rmrkrccode}`}>{category.rcdesctext}</div>
              <ul>
                {remarksInCategory.map(r => {
                  const hasTextInput = has(r, 'textInputValue');
                  const faProps = {
                    name: r.isActive ? 'minus-circle' : 'plus-circle',
                  };
                  return (
                    <li key={r.rmrkseqnum}>
                      <InteractiveElement onClick={() => onRemarkClick$(r)}>
                        <FA {...faProps} />
                      </InteractiveElement>
                      <span className="remark-text">{r.rmrktext}</span>
                      {
                        hasTextInput &&
                        <TextInput
                          value={getTextInputValue(r.rmrkseqnum)}
                          changeText={v => setTextInput(r.rmrkseqnum, v)}
                          customContainerClass="remarks-input-container"
                          inputProps={{ autoComplete: 'off' }}
                        />
                      }
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

RemarksGlossary.propTypes = {
  onRemarkClick: PropTypes.func,
  remarks: PropTypes.arrayOf(PropTypes.shape({

  })),
};

RemarksGlossary.defaultProps = {
  onRemarkClick: EMPTY_FUNCTION,
  remarks: [
    {
      rmrkseqnum: 1,
      rcdesctext: 'Extension',
      rmrkrccode: 'E',
      rmrkordernum: 4,
      rmrkshortdesctext: 'timely',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Timely',
      rmrkactiveind: 'Y',
      isActive: true,
      textInputValue: 'A remark with some existing text',
    },
    {
      rmrkseqnum: 2,
      rcdesctext: 'Extension',
      rmrkrccode: 'E',
      rmrkordernum: 3,
      rmrkshortdesctext: 'summer cycle',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Move to Summer cycle',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 3,
      rcdesctext: 'Extension',
      rmrkrccode: 'E',
      rmrkordernum: 1,
      rmrkshortdesctext: 'BOP',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'BOP',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 4,
      rcdesctext: 'Civil Service',
      rmrkrccode: 'G',
      rmrkordernum: 6,
      rmrkshortdesctext: 'return CS',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Returning CS LNA',
      rmrkactiveind: 'Y',
      isActive: true,
    },
    {
      rmrkseqnum: 5,
      rcdesctext: 'Civil Service',
      rmrkrccode: 'G',
      rmrkordernum: 6,
      rmrkshortdesctext: 'return CS',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Returning CS LNA',
      rmrkactiveind: 'Y',
      isActive: true,
    },
    {
      rmrkseqnum: 6,
      rcdesctext: 'Civil Service',
      rmrkrccode: 'G',
      rmrkordernum: 6,
      rmrkshortdesctext: 'return CS',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Returning CS LNA',
      rmrkactiveind: 'Y',
      isActive: true,
    },
    {
      rmrkseqnum: 7,
      rcdesctext: 'Civil Service',
      rmrkrccode: 'G',
      rmrkordernum: 6,
      rmrkshortdesctext: 'return CS',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Returning CS LNA',
      rmrkactiveind: 'Y',
      isActive: true,
    },
    {
      rmrkseqnum: 8,
      rcdesctext: 'Civil Service',
      rmrkrccode: 'G',
      rmrkordernum: 6,
      rmrkshortdesctext: 'return CS',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Returning CS LNA',
      rmrkactiveind: 'Y',
      isActive: true,
    },
    {
      rmrkseqnum: 9,
      rcdesctext: 'Civil Service',
      rmrkrccode: 'G',
      rmrkordernum: 6,
      rmrkshortdesctext: 'return CS',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'Returning CS LNA',
      rmrkactiveind: 'Y',
      isActive: true,
    },
    {
      rmrkseqnum: 10,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 2,
      rmrkshortdesctext: 'DCM Lang. Waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Language Requirement Waived by DCM Committee',
      rmrkactiveind: 'Y',
      isActive: true,
      textInputValue: '',
    },
    {
      rmrkseqnum: 11,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 1,
      rmrkshortdesctext: 'Lang. waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Full language waiver granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 12,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 3,
      rmrkshortdesctext: 'Partial Lg Waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Partial Language Waiver Granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 13,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 6,
      rmrkshortdesctext: 'RLP Assignment',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'RLP Assignment',
      rmrkactiveind: 'Y',
      isActive: false,
      textInputValue: '',
    },
    {
      rmrkseqnum: 14,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 1,
      rmrkshortdesctext: 'Lang. waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Full language waiver granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 15,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 3,
      rmrkshortdesctext: 'Partial Lg Waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Partial Language Waiver Granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 16,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 6,
      rmrkshortdesctext: 'RLP Assignment',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'RLP Assignment',
      rmrkactiveind: 'Y',
      isActive: false,
      textInputValue: '',
    },
    {
      rmrkseqnum: 17,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 1,
      rmrkshortdesctext: 'Lang. waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Full language waiver granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 18,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 3,
      rmrkshortdesctext: 'Partial Lg Waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Partial Language Waiver Granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 19,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 6,
      rmrkshortdesctext: 'RLP Assignment',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'RLP Assignment',
      rmrkactiveind: 'Y',
      isActive: false,
      textInputValue: '',
    },
    {
      rmrkseqnum: 20,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 1,
      rmrkshortdesctext: 'Lang. waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Full language waiver granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 21,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 3,
      rmrkshortdesctext: 'Partial Lg Waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Partial Language Waiver Granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 22,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 6,
      rmrkshortdesctext: 'RLP Assignment',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'RLP Assignment',
      rmrkactiveind: 'Y',
      isActive: false,
      textInputValue: '',
    },
    {
      rmrkseqnum: 23,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 1,
      rmrkshortdesctext: 'Lang. waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Full language waiver granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 24,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 3,
      rmrkshortdesctext: 'Partial Lg Waiver',
      rmrkmutuallyexclusiveind: 'Y',
      rmrktext: 'Partial Language Waiver Granted on {date}',
      rmrkactiveind: 'Y',
      isActive: false,
    },
    {
      rmrkseqnum: 25,
      rcdesctext: 'Language',
      rmrkrccode: 'L',
      rmrkordernum: 6,
      rmrkshortdesctext: 'RLP Assignment',
      rmrkmutuallyexclusiveind: 'N',
      rmrktext: 'RLP Assignment',
      rmrkactiveind: 'Y',
      isActive: false,
      textInputValue: '',
    },
  ],
};

export default RemarksGlossary;
