import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import q from 'query-string';
import { get, identity, isArray, pickBy, uniqBy } from 'lodash';
import { ENDPOINT_PARAMS } from 'Constants/EndpointParams';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { lookupAndSetCDO } from 'actions/bidderPortfolio';
import { setClient } from 'actions/clientView';
import { fetchClientSuggestions } from 'actions/clientSuggestions';
import { scrollTo } from 'utilities';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { CONTAINER_ID as ID } from '../../ClientHeader';

export const genSearchParams = (user) => {
  let qString = '';
  let skills$;

  const { skill: skillEndpoint, grade: gradeEndpoint } = ENDPOINT_PARAMS;

  const { skills, grade } = user;

  if (isArray(skills)) {
    skills$ = uniqBy(skills, 'code');
    skills$ = skills$.map(m => m.code).join(',');
  }

  let query = { [skillEndpoint]: skills$, [gradeEndpoint]: grade };
  query = pickBy(query, identity);

  qString = q.stringify(query);
  return qString;
};

export class SearchAsClientButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { clicked } = this.state;
    const { client, isLoading, hasErrored, history,
      user, useRecommended } = nextProps;
    const { perdet_seq_number: id } = user;
    const clientHasLoaded = client && client.perdet_seq_number && client.perdet_seq_number === id &&
      !isLoading && !hasErrored;
    if (clientHasLoaded && clicked && !useRecommended) {
      this.genSearchParamsAndNavigate(user, history);
    }

    const {
      suggestions: NPsuggestions, recIsLoading: NPrecIsLoading,
      recHasErrored: NPrecHasErrored, recId,
    } = nextProps;

    if (recId === id && useRecommended && !NPrecIsLoading &&
      !NPrecHasErrored && NPsuggestions && clientHasLoaded && clicked) {
      this.stringifyParamsAndNavigate(NPsuggestions, history);
    }
  }

  onClick = () => {
    const { fetchSuggestions, set, user, isLoading, recIsLoading, useRecommended } = this.props;
    const { perdet_seq_number: id } = user;
    if (!isLoading && !useRecommended) {
      this.setState({
        clicked: true,
      }, () => set(id));
    } else if (!recIsLoading && useRecommended) {
      this.setState({
        clicked: true,
      }, () => {
        set(id);
        fetchSuggestions(id);
      });
    }
  };

  genSearchParamsAndNavigate(user, history) {
    const query = genSearchParams(user);
    this.setState({ clicked: false }, () => this.navigate(query, history));
  }

  stringifyParamsAndNavigate(params, history) {
    let query = pickBy(params, identity);
    query = q.stringify(query);
    this.setState({ clicked: false }, () => this.navigate(query, history));
  }

  navigate(query = '', history = this.props.history) {
    setTimeout(() => {
      history.push(`/results?${query}`);
      const offset = get(document.getElementById(ID), 'offsetTop');
      if (offset) {
        scrollTo(offset);
      }
    }, 10);
  }

  render() {
    const { buttonProps, className } = this.props;
    return (
      <PermissionsWrapper permissions="cdo">
        <button
          className={`usa-button-primary search-as-client-button ${className}`}
          onClick={this.onClick}
          {...buttonProps}
        >
          Search as Client
        </button>
      </PermissionsWrapper>
    );
  }
}

SearchAsClientButton.propTypes = {
  user: PropTypes.shape({
    perdet_seq_number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  buttonProps: PropTypes.shape({}),
  className: PropTypes.string,
  client: PropTypes.shape({
    perdet_seq_number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  set: PropTypes.func.isRequired,
  history: HISTORY_OBJECT.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  recId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  suggestions: PropTypes.shape({}),
  recIsLoading: PropTypes.bool,
  recHasErrored: PropTypes.bool,
  useRecommended: PropTypes.bool,
};

SearchAsClientButton.defaultProps = {
  user: {},
  buttonProps: {},
  className: '',
  client: {},
  isLoading: false,
  hasErrored: false,
  recId: '',
  suggestions: {},
  recIsLoading: false,
  recHasErrored: false,
  useRecommended: true,
};

const mapStateToProps = (
  {
    clientView: { client, isLoading, hasErrored },
    clientSuggestions: {
      id: recId, suggestions, isLoading: recIsLoading, hasErrored: recHasErrored,
    },
  },
) => ({
  client, isLoading, hasErrored, recId, suggestions, recIsLoading, recHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  set: (id, cdoId) => {
    dispatch(lookupAndSetCDO(cdoId));
    dispatch(setClient(id));
  },
  fetchSuggestions: id => dispatch(fetchClientSuggestions(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchAsClientButton));
