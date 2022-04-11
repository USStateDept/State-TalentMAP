import { useEffect, useState } from 'react';
import { get, has, isEqual, orderBy, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import TextInput from 'Components/TextInput';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksGlossary = ({ onRemarkClick, remarks, remarkCategories }) => {
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

  const remarks$ = remarks;
  const remarkCategories$ = remarkCategories;

  let remarkCategories$$ = uniqBy(remarkCategories$, 'code').map(({ code, desc_text }) => ({ code, desc_text }));
  remarkCategories$$ = orderBy(remarkCategories$$, 'desc_text');

  const onRemarkClick$ = remark => {
    const textInputValue = getTextInputValue(remark.seq_num);
    const remark$ = { ...remark, textInputValue };
    onRemarkClick(remark$);
  };

  useEffect(() => {
    setTextInputBulk(remarks);
  }, [remarks]);

  return (
    <div className="usa-grid-full remarks-glossary-container">
      {remarkCategories$$.map(category => {
        const remarksInCategory = orderBy(remarks$.filter(f => f.rc_code === category.code), 'order_num');
        return (
          <div key={category.code}>
            <div className={`remark-category remark-category--${category.code}`}>{category.desc_text}</div>
            <ul>
              {remarksInCategory.map(r => {
                // still need indicator to come through for input
                const hasTextInput = false;
                const faProps = {
                  name: r.isActive ? 'minus-circle' : 'plus-circle',
                };
                return (
                  <li key={r.seq_num}>
                    <InteractiveElement onClick={() => onRemarkClick$(r)}>
                      <FA {...faProps} />
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
  );
};

RemarksGlossary.propTypes = {
  onRemarkClick: PropTypes.func,
  remarks: PropTypes.arrayOf(PropTypes.shape({})),
  remarkCategories: PropTypes.arrayOf(PropTypes.shape({})),
};

RemarksGlossary.defaultProps = {
  onRemarkClick: EMPTY_FUNCTION,
  remarks: [],
  remarkCategories: [],
};

export default RemarksGlossary;
