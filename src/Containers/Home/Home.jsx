import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filtersFetchData } from '../../actions/filters';
import Filters from '../../Components/Filters/Filters';
import { ITEMS } from '../../Constants/PropTypes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiency: {},
      qString: null,
      searchText: { value: '' },
    };
  }

  componentWillMount() {
    this.getFilters();
  }

  onChildSubmit(e) {
    this.props.onNavigateTo(e);
  }

  getFilters() {
    const { api, items } = this.props;
    this.props.fetchData(api, items);
  }

  render() {
    return (
      <div>
        <Filters
          isLoading={this.props.isLoading}
          onSubmit={e => this.onChildSubmit(e)}
          items={this.props.items}
        />
      </div>
    );
  }
}

Home.propTypes = {
  api: PropTypes.string.isRequired,
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  items: ITEMS,
};

Home.defaultProps = {
  items: [],
  hasErrored: false,
  isLoading: true,
};

const mapStateToProps = state => ({
  items: state.filters,
  hasErrored: state.filtersHasErrored,
  isLoading: state.filtersIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (api, items) => dispatch(filtersFetchData(api, items)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
