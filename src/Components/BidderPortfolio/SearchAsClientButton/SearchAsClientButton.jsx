import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setClient } from '../../../actions/clientView';
import { scrollTo } from '../../../utilities';
import { ID } from '../../ClientHeader';

export class SearchAsClientButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      hasPushed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { hasPushed } = this.state;
    const { client, isLoading, hasErrored, history, id } = nextProps;
    if (client.perdet_seq_number === id && client && client.perdet_seq_number &&
      !isLoading && !hasErrored && !hasPushed) {
      this.setState({ hasPushed: true }, () => {
        setTimeout(() => {
          history.push('/results');
          const offset = document.getElementById(ID).offsetTop;
          scrollTo(offset);
        }, 0);
      });
    }
  }

  onClick() {
    const { set, id, isLoading } = this.props;
    if (!isLoading) {
      set(id);
    }
  }

  render() {
    const { buttonProps, className } = this.props;
    return (
      <button
        className={`usa-button-primary ${className}`}
        onClick={this.onClick}
        {...buttonProps}
      >
        Search as Client
      </button>
    );
  }
}

SearchAsClientButton.propTypes = {
  id: PropTypes.number.isRequired,
  buttonProps: PropTypes.shape({}),
  className: PropTypes.string,
  client: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  set: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

SearchAsClientButton.defaultProps = {
  buttonProps: {},
  className: '',
  client: {},
  isLoading: false,
  hasErrored: false,
};

const mapStateToProps = ({ clientView: { client, isLoading, hasErrored } }) => ({
  client, isLoading, hasErrored,
});

export const mapDispatchToProps = dispatch => ({
  set: id => dispatch(setClient(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchAsClientButton));
