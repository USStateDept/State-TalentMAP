import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash';
import SelectForm from 'Components/SelectForm';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const NavTabs = forwardRef((props, ref) => {
  const {
    collapseToDd,
    ddCenter,
    ddStyle,
    passNavValue,
    tabs,
    value,
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
    <div className="navTabs">
      <div className="menu-style">
        {
          !collapseToDd &&
          tabs.map(tab => (
            <InteractiveElement onClick={() => setMenuItem(tab.value)} id={`${tab.value}-tab-container`}>
              <div className={`tab ${isEqual(tab.value, menuItem) ? ' tab-active' : ''} `} id={tab.value}> {tab.text} </div>
            </InteractiveElement>
          ))
        }
      </div>
      <div className={`dd-style ${ddCenter ? 'dd-style-center' : ''} `} style={ddStyle}>
        {
          collapseToDd &&
          <SelectForm
            id="navTabs-dd"
            options={tabs}
            defaultSort={menuItem}
            onSelectOption={e => setMenuItem(e.target.value)}
          />
        }
      </div>
    </div>
  );
});

NavTabs.propTypes = {
  collapseToDd: PropTypes.bool,
  ddCenter: PropTypes.bool,
  ddStyle: PropTypes.shape({}),
  passNavValue: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string, // default value
};


NavTabs.defaultProps = {
  collapseToDd: false,
  ddCenter: true,
  ddStyle: { width: '180px' },
  passNavValue: EMPTY_FUNCTION,
  tabs: [],
  value: '',
};

export default NavTabs;
