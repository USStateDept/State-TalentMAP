import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { scrollToGlossaryTerm, termInGlossary } from '../../utilities';
import { toggleGlossary } from '../../actions/showGlossary';
import InteractiveElement from '../InteractiveElement';

class GlossaryTermTrigger extends Component {
  onClickLink = () => {
    const { term, toggle } = this.props;
    toggle();
    scrollToGlossaryTerm(term);
  };

  render() {
    const { text, term, icon, hideMissingTerm, ...rest } = this.props;
    const text$ = text || term;
    const termExists = termInGlossary(term);
    const props$ = omit(rest, 'toggle');
    const displayItem = (hideMissingTerm && termExists) || !hideMissingTerm;
    return (
      <>
        {
          displayItem &&
          <InteractiveElement type="span" onClick={this.onClickLink} {...props$}>
            {
              icon ?
                <FontAwesome id="bypass-glossary" name={`${icon}`} />
                : text$
            }
          </InteractiveElement>
        }
      </>
    );
  }
}

GlossaryTermTrigger.propTypes = {
  text: PropTypes.string,
  term: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  icon: PropTypes.string,
  hideMissingTerm: PropTypes.bool,
};

GlossaryTermTrigger.defaultProps = {
  text: '',
  term: '',
  icon: '',
  hideMissingTerm: false,
};

export const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleGlossary(true)),
});

export default connect(null, mapDispatchToProps)(GlossaryTermTrigger);
