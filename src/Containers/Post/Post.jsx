import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemsFetchData } from '../../actions/items';
import PostMissionData from '../../Components/PostMissionData/PostMissionData';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.getPost(this.context.router.route.match.params.id);
  }

  getPost(id) {
    const query = id;
    const api = this.props.api;
    this.props.fetchData(`${api}/organization/posts/${query}/`);
  }

  render() {
    const { items } = this.props;
    const e = this.props.hasErrored ? (
      <span>There was an error loading this post</span>
    ) : null;
    const l = this.props.isLoading && !this.props.hasErrored ? (<span>Loading...</span>) : null;
    const postMissionData = !this.props.isLoading && !this.props.hasErrored ? (
      <div className="usa-grid-full">
        <div style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
          <h3> Post Number: {items.id} </h3>
          <PostMissionData post={items} />
        </div>
      </div>
    ) : null;
    return (
      <div>
        <div className="usa-grid">
          <center>
            {e} {l}
          </center>
        </div>
        {postMissionData}
      </div>
    );
  }
}

Post.propTypes = {
  api: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.shape({
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
};

Post.defaultProps = {
  items: [],
};

Post.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
