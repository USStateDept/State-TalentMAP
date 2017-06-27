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
    axios.get(`${api}/position/?position_number=${query}`)
        .then((res) => {
          const details = res.data[0];
          this.setState({ details });
        });
  }

  render() {
    const { details } = this.state;
    const languageList = (details.languages && details.languages.length)
      ? details.languages.map(choice => (
        <span key={`${choice}-choice`}> {choice.language} </span>
      )) : <span key="no-languages"> None listed </span>;
    return (
      <div id="main-content">
        <div className="usa-grid-full">
          <div style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
            <h3> Position Number: {details.position_number} </h3>
            <p>
              Grade: {details.grade}
              <br />
              Skill: {details.skill}
              <br />
              Bureau: {details.bureau}
              <br />
              Organization: {details.organization}
              <br />
              Overseas: {details.is_overseas ? 'Yes' : 'No'}
              <br />
              Language: <span>{languageList}</span>
              <br />
              Created: {details.create_date}
              <br />
              Updated: {details.update_date}
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
