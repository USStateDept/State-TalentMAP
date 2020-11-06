import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import { scrollToGlossaryTerm } from '../../utilities';
import { toggleGlossary } from '../../actions/showGlossary';
import InteractiveElement from '../InteractiveElement';

class GlossaryTermTrigger extends Component {
  onClickLink = () => {
    const { term, toggle } = this.props;
    toggle();
    scrollToGlossaryTerm(term);
  };

  render() {
    const { text, term, ...rest } = this.props;
    const text$ = text || term;
    const props$ = omit(rest, 'toggle');
    return (
      <InteractiveElement type="span" onClick={this.onClickLink} {...props$}>
        {text$}
      </InteractiveElement>
    );
  }
}

GlossaryTermTrigger.propTypes = {
  text: PropTypes.string,
  term: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

GlossaryTermTrigger.defaultProps = {
  text: '',
  term: '',
};

export const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleGlossary(true)),
});

export default connect(null, mapDispatchToProps)(GlossaryTermTrigger);
