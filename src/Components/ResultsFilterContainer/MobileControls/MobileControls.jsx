import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';
import MediaQuery from '../../MediaQuery';
import InteractiveElement from '../../InteractiveElement';
import { toggleMobileFilter } from '../../../actions/showMobileFilter';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const MobileControls = ({ toggle }) => (
  <MediaQuery breakpoint="screenSmMax" widthType="max">
    {
      matches => (
        matches &&
        <div className="filter-container-top">
          <InteractiveElement onClick={toggle}>
            <FA name="chevron-left" />
          </InteractiveElement>
          <span>Filter</span>
          <div>
            <button onClick={toggle}>View Results</button>
          </div>
        </div>
      )
    }
  </MediaQuery>
);

MobileControls.propTypes = {
  toggle: PropTypes.func,
};

MobileControls.defaultProps = {
  toggle: EMPTY_FUNCTION,
};

export const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleMobileFilter(false)),
});

export default connect(null, mapDispatchToProps)(MobileControls);
