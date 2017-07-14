import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filtersFetchData } from '../../actions/filters';
import Filters from '../../Components/Filters/Filters';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: { skill__code__in: [], languages__language__code__in: [], grade__code__in: [] },
      items: [
        {
          title: 'Skill code',
          sort: 100,
          description: 'skill',
          endpoint: 'position/skills',
          selectionRef: 'skill__code__in',
          text: 'Choose skill codes',
          choices: [
          ],
        },
        {
          title: 'Language',
          sort: 200,
          description: 'language',
          endpoint: 'language',
          selectionRef: 'languages__language__code__in',
          text: 'Choose languages',
          choices: [
          ],
        },
        {
          title: 'Grade',
          sort: 300,
          description: 'grade',
          endpoint: 'position/grades',
          selectionRef: 'grade__code__in',
          text: 'Choose grades',
          choices: [
          ],
        },
      ],
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
    const api = this.props.api;
    const urlArr = [];
    this.state.items.forEach((item) => {
      const endpoint = item.endpoint;
      urlArr.push({ url: `${api}/${endpoint}/`, item });
    });
    this.props.fetchData(urlArr);
  }

  render() {
    const home = this.props.isLoading ? null : <Filters onSubmit={(e) => this.onChildSubmit(e)} items={this.props.items} />; //eslint-disable-line
    return (
      <div>
        {home}
      </div>
    );
  }
}

Home.propTypes = {
  api: PropTypes.string.isRequired,
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  /*filters: PropTypes.arrayOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      description: PropTypes.string,
      long_description: PropTypes.string,
      short_description: PropTypes.string,
      effective_date: PropTypes.string,
    }),
  ),
),*/
};

Home.defaultProps = {
  filters: [],
  hasErrored: false,
  isLoading: true,
};

const mapStateToProps = state => ({
  items: state.filters,
  hasErrored: state.filtersHasErrored,
  isLoading: state.filtersIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: urls => dispatch(filtersFetchData(urls)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
