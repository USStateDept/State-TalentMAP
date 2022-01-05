import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import About from '../../Components/About';
import { aboutContentFetchData, aboutContentPatchData } from '../../actions/aboutContent';

class AboutContainer extends Component {
  UNSAFE_componentWillMount() {
    this.getData();
  }

  getData() {
    this.props.fetchData();
  }

  patchData = data => {
    this.props.patchData(data);
  };

  render() {
    const { data, hasErrored, isLoading, patchIsLoading, patchHasErrored } = this.props;
    const props = {
      data,
      hasErrored,
      isLoading,
      patchData: this.patchData,
      patchIsLoading,
      patchHasErrored,
    };
    return (
      <About {...props} />
    );
  }
}

AboutContainer.propTypes = {
  data: PropTypes.string,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  patchSuccess: PropTypes.bool,
  patchHasErrored: PropTypes.bool,
  patchIsLoading: PropTypes.bool,
  fetchData: PropTypes.func,
  patchData: PropTypes.func,
};

AboutContainer.defaultProps = {
  data: '',
  hasErrored: false,
  isLoading: false,
  patchSuccess: false,
  patchHasErrored: false,
  patchIsLoading: false,
  fetchData: EMPTY_FUNCTION,
  patchData: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  data: state.aboutContent,
  hasErrored: state.aboutContentHasErrored,
  isLoading: state.aboutContentIsLoading,
  patchSuccess: state.aboutContentPatchSuccess,
  patchHasErrored: state.aboutContentPatchHasErrored,
  patchIsLoading: state.aboutContentPatchIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(aboutContentFetchData()),
  patchData: data => dispatch(aboutContentPatchData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
