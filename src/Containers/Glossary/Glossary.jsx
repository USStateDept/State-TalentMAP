import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleGlossary } from '../../actions/showGlossary';
import { glossaryFetchData } from '../../actions/glossary';
import { EMPTY_FUNCTION, GLOSSARY_LIST } from '../../Constants/PropTypes';
import Glossary from '../../Components/Glossary';

class GlossaryContainer extends Component {

  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentWillMount() {
    this.props.fetchGlossary();
  }

  toggleVisibility() {
    const { shouldShowGlossary, toggleGlossaryVisibility } = this.props;
    toggleGlossaryVisibility(!shouldShowGlossary);
  }

  render() {
    const { shouldShowGlossary, glossaryItems, glossaryIsLoading } = this.props;
    return (
      <Glossary
        glossaryItems={glossaryItems.results}
        glossaryIsLoading={glossaryIsLoading}
        visible={shouldShowGlossary}
        toggleVisibility={this.toggleVisibility}
      />
    );
  }
}

GlossaryContainer.propTypes = {
  shouldShowGlossary: PropTypes.bool.isRequired,
  toggleGlossaryVisibility: PropTypes.func.isRequired,
  fetchGlossary: PropTypes.func.isRequired,
  glossaryItems: GLOSSARY_LIST.isRequired,
  glossaryIsLoading: PropTypes.bool.isRequired,
};

GlossaryContainer.defaultProps = {
  shouldShowGlossary: false,
  toggleGlossaryVisibility: EMPTY_FUNCTION,
  fetchGlossary: EMPTY_FUNCTION,
  glossaryItems: { results: [] },
  glossaryIsLoading: false,
};

const mapStateToProps = state => ({
  shouldShowGlossary: state.shouldShowGlossary,
  glossaryItems: state.glossary,
  glossaryHasErrored: state.glossaryHasErrored,
  glossaryIsLoading: state.glossaryIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  toggleGlossaryVisibility: shouldDisplay => dispatch(toggleGlossary(shouldDisplay)),
  fetchGlossary: () => dispatch(glossaryFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryContainer);
