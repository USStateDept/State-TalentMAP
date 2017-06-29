import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ajax } from '../../utilities';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  componentWillMount() {
    this.getDetails(this.props.match ? this.props.match.params.id : ''); // eslint-disable-line react/prop-types
  }

  getDetails(id) {
    const query = id;
    const api = this.props.api;
    ajax(`${api}/position/?position_number=${query}`)
        .then((res) => {
          const details = res.data[0];
          this.setState({ details });
        });
  }

  render() {
    const { details } = this.state;
    return (
      <div id="main-content">
        {Object.keys(details).length ?
          <PositionDetails details={details} />
          :
          null
        }
      </div>
    );
  }
}

Details.propTypes = {
  api: PropTypes.string.isRequired,
};

export default Details;
