import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import q from 'query-string';
import { identity, isArray, pickBy } from 'lodash';
import { ENDPOINT_PARAMS } from 'Constants/EndpointParams';
import { setClient } from '../../../actions/clientView';
import { scrollTo } from '../../../utilities';
import { ID } from '../../ClientHeader';

export const genSearchParams = (user) => {
  let qString = '';
  let skills$;

  const { skill: skillEndpoint, grade: gradeEndpoint } = ENDPOINT_PARAMS;

  const { skills, grade } = user;

  if (isArray(skills)) {
    skills$ = skills.map(m => m.code).join(',');
  }

  let query = { [skillEndpoint]: skills$, [gradeEndpoint]: grade };
  query = pickBy(query, identity);

  qString = q.stringify(query);
  return qString;
};

export class SearchAsClientButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      clicked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { clicked } = this.state;
    const { client, isLoading, hasErrored, history, user } = nextProps;
    const { perdet_seq_number: id } = user;
    if (client.perdet_seq_number === id && client && client.perdet_seq_number &&
      !isLoading && !hasErrored && clicked) {
      const query = genSearchParams(user);
      this.setState({ clicked: false }, () => {
        setTimeout(() => {
          history.push(`/results?${query}`);
          const offset = document.getElementById(ID).offsetTop;
          scrollTo(offset);
        }, 0);
      });
    }
  }

  onClick() {
    const { set, user, isLoading } = this.props;
    const { perdet_seq_number: id } = user;
    if (!isLoading) {
      this.setState({
        clicked: true,
      }, () => set(id));
    }
  }

  render() {
    const { buttonProps, className } = this.props;
    return (
      <button
        className={`usa-button-primary search-as-client-button ${className}`}
        onClick={this.onClick}
        {...buttonProps}
      >
        Search as Client
      </button>
    );
  }
}

SearchAsClientButton.propTypes = {
  user: PropTypes.shape({}).isRequired,
  buttonProps: PropTypes.shape({}),
  className: PropTypes.string,
  client: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  set: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

SearchAsClientButton.defaultProps = {
  user: {},
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
