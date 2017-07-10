import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemsFetchData } from '../../actions/items';
import ResultsList from '../../Components/ResultsList/ResultsList';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const query = window.location.search || '';
    const api = this.props.api;
    this.props.fetchData(`${api}/position/${query}`);
  }

  render() {
    const { items } = this.props;
    const e = this.props.hasErrored ? (
      <span>There was an error loading this post</span>
    ) : null;
    const l = this.props.isLoading && !this.props.hasErrored ? (<span>Loading...</span>) : null;
    const n = !this.props.isLoading && !this.props.hasErrored && !items.length ?
      <span>No results with that search criteria</span> : null;
    const results = (items.length && !this.props.hasErrored && !this.props.isLoading) ?
      <ResultsList results={items} /> : null;
    return (
      <div>
        {results}
        <div className="usa-grid">
          <center> {e} {l} {n} </center>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      grade: PropTypes.string,
      skill: PropTypes.string,
      bureau: PropTypes.string,
      organization: PropTypes.string,
      position_number: PropTypes.string.isRequired,
      is_overseas: PropTypes.boolean,
      create_date: PropTypes.string,
      update_date: PropTypes.string,
      post: PropTypes.shape({
        id: PropTypes.number,
        tour_of_duty: PropTypes.string,
        code: PropTypes.string,
        description: PropTypes.string,
        cost_of_living_adjustment: PropTypes.number,
        differential_rate: PropTypes.number,
        danger_pay: PropTypes.number,
        rest_relaxation_point: PropTypes.string,
        has_consumable_allowance: PropTypes.boolean,
        has_service_needs_differential: PropTypes.boolean,
      }),
      languages: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          language: PropTypes.string,
          written_proficiency: PropTypes.string,
          spoken_proficiency: PropTypes.string,
          representation: PropTypes.string,
        }),
      ),
    }),
  ),
};

Results.defaultProps = {
  items: [],
};

Results.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  items: state.items,
  hasErrored: state.itemsHasErrored,
  isLoading: state.itemsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(itemsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
