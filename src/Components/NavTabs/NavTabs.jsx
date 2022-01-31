import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash';
import SelectForm from 'Components/SelectForm';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const NavTabs = props => {
  const {
    collapseToDd,
    ddCenter,
    ddStyle,
    passNavValue,
    tabs,
  } = props;

  const [menuItem, setMenuItem] = useState(get(tabs, '[0].value') || '');

  useEffect(() => {
    passNavValue(menuItem);
  }, [menuItem]);

  return (
    <div className="navTabs">
      <div className="menu-style">
        {
          !collapseToDd &&
          tabs.map(tab => (
            <InteractiveElement onClick={() => setMenuItem(tab.value)}>
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
            onSelectOption={value => setMenuItem(value.target.value)}
          />
        }
      </div>
    </div>
  );
};

NavTabs.propTypes = {
  collapseToDd: PropTypes.Boolean,
  ddCenter: PropTypes.Boolean,
  ddStyle: PropTypes.shape({}),
  passNavValue: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,

};


NavTabs.defaultProps = {
  collapseToDd: false,
  ddCenter: true,
  ddStyle: { width: '180px' },
  passNavValue: EMPTY_FUNCTION,
  tabs: [],
};

export default NavTabs;
