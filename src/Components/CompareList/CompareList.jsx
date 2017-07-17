import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RESULTS } from '../../Constants/PropTypes';
import * as AlertMessages from '../../Constants/AlertMessages';

class CompareList extends Component {

  componentWillMount() {
  }

  onChildToggle() {
    this.forceUpdate();
    this.props.onToggle();
  }

  render() {
    return (
      <div>
        { this.props.compare.map(result => (
          <div key={result.id} id={result.id} className="usa-width-one-half" style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
            <div className="usa-grid-full">
              <Link to={`/details/${result.position_number}`}>
                <h3> Position Number: {result.position_number} </h3>
              </Link>
              <p>
                  Grade: {result.grade}
                <br />
                  Skill: {result.skill}
                <br />
                  Bureau: {result.bureau}
                <br />
                  Organization: {result.organization}
                <br />
                  Post: {result.post ? <Link to={`/post/${result.post.id}`}>{result.post.description}</Link> : AlertMessages.NO_POST }
                <br />
                  Post Differential: {result.post
                    ? result.post.differential_rate : AlertMessages.NO_POST_DIFFERENTIAL}
              </p>
            </div>
          </div>
          ))}
      </div>
    );
  }
}

CompareList.propTypes = {
  compare: RESULTS,
  onToggle: PropTypes.func,
};

CompareList.defaultProps = {
  compare: [],
  onToggle: () => {},
};

export default CompareList;
