import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    this.getDetails(this.props.match ? this.props.match.params.id : ''); // eslint-disable-line react/prop-types
  }

  getDetails(id) {
    const query = id;
    const api = this.props.api;
    axios.get(`${api}/posts/${query}`)
        .then((res) => {
          const details = res.data;
          this.setState({ details });
        });
  }

  render() {
    const { details } = this.state;
    return (
      <div id="main-content">
        <div className="usa-grid-full">
          <div style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px' }}>
            <h3> ID: {details.id} </h3>
            <p>
              Skill: {details.skill_text}
              <br />
              Language: {details.language_text}
              <br />
              Grade: {details.grade}
              <br />
              City: {details.city}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  api: PropTypes.string.isRequired,
};

export default Details;
