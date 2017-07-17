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
        {
          title: 'Tour of Duty',
          sort: 400,
          description: 'tod',
          endpoint: 'organization/tod',
          selectionRef: 'post__tour_of_duty__in',
          text: 'Choose tour of duty length',
          choices: [
          ],
        },
        {
          title: 'Region',
          sort: 500,
          description: 'region',
          endpoint: 'organization',
          selectionRef: 'organization__code__in',
          text: 'Choose region',
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
      urlArr.push({ url: `${api}/${endpoint}/?available=true`, item });
    });
    this.props.fetchData(urlArr);
  }

  render() {
    return (
      <div>
        <Filters onSubmit={e => this.onChildSubmit(e)} items={this.props.items} />
      </div>
    );
  }
}

Home.propTypes = {
  api: PropTypes.string.isRequired,
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
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
  fetchData: urls => dispatch(filtersFetchData(urls)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
