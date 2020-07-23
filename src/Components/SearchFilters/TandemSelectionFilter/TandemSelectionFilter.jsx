import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import { shortenString } from 'utilities';
import Toggle from '../../Toggle';

const TandemSelectionFilter = ({ onChange, userProfile, isLoading }) => {
  const onChange$ = (val) => {
    onChange(val);
  };
  const tandem1Name = get(userProfile, 'display_name', 'Tandem 1');
  const tandem1Name$ = shortenString(tandem1Name, 15);
  const items$ = [
    { label: tandem1Name$, value: '1', tooltip: tandem1Name !== tandem1Name$ ? tandem1Name : null, toggleClass: 'toggle-tandem-1' },
    { label: 'Tandem 2', value: '2', toggleClass: 'toggle-tandem-2' },
  ];
  return (
    <div className="tandem-filter-container">
      {
        !isLoading &&
        <Toggle items={items$} onChange={onChange$} />
      }
    </div>
  );
};

TandemSelectionFilter.propTypes = {
  onChange: PropTypes.func,
  userProfile: USER_PROFILE,
  isLoading: PropTypes.bool,
};

TandemSelectionFilter.defaultProps = {
  onChange: EMPTY_FUNCTION,
  userProfile: DEFAULT_USER_PROFILE,
  isLoading: true,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  isLoading: state.userProfileIsLoading,
});

export default connect(mapStateToProps)(TandemSelectionFilter);
