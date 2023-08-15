import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash';
import SelectForm from 'Components/SelectForm';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const NavTabs = forwardRef((props, ref) => {
  const {
    collapseToDd,
    ddStyle,
    passNavValue,
    tabs,
    value,
    styleVariant,
  } = props;

  const [menuItem, setMenuItem] = useState(value || get(tabs, '[0].value') || '');

  useEffect(() => {
    passNavValue(menuItem);
  }, [menuItem]);

  useEffect(() => {
    setMenuItem(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    setSelectedNav: e => {
      setMenuItem(e);
      document.getElementById(`${e}-tab-container`).focus(); // use InteractiveElement container ID format
    },
  }));

  return (
    <div className={`${!collapseToDd ? 'navTabs' : 'navDropdown'} ${styleVariant}`}>
      {
        !collapseToDd &&
        tabs.map(tab => (
          <InteractiveElement
            id={`${tab.value}-tab-container`}
            key={tab.text}
            onClick={() => { if (!tab.disabled) setMenuItem(tab.value); }}
            className={tab.disabled ? 'disabled' : ''}
          >
            <div className={`tab ${isEqual(tab.value, menuItem) ? ' tab-active' : ''} `} id={tab.value}> {tab.text} </div>
          </InteractiveElement>
        ))
      }
      {
        collapseToDd &&
        <div className="dd-style" style={ddStyle}>
          <SelectForm
            id="navTabs-dd"
            options={tabs}
            defaultSort={menuItem}
            onSelectOption={e => setMenuItem(e.target.value)}
          />
        </div>
      }
    </div>
  );
});

NavTabs.propTypes = {
  collapseToDd: PropTypes.bool,
  ddStyle: PropTypes.shape({}),
  passNavValue: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  value: PropTypes.string, // default value
  styleVariant: PropTypes.string,
};


NavTabs.defaultProps = {
  collapseToDd: false,
  ddCenter: true,
  ddStyle: { width: '180px' },
  passNavValue: EMPTY_FUNCTION,
  tabs: [],
  value: '',
  styleVariant: 'heavyBorderTop',
};

export default NavTabs;
