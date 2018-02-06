import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';

const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  viewMoreLink: PropTypes.string,
};

const defaultProps = {
  icon: 'star',
  viewMoreLink: '/results',
};

class HomepagePositionsSection extends Component {
  render() {
    return (
      <div className="usa-grid-full positions-section">
        <PositionsSectionTitle
          title={
            <span className="positions-section-title">
              <FontAwesome name={this.props.icon} />
              {this.props.title}
            </span>
        }
          viewMoreLink={this.props.viewMoreLink}
        />
      </div>
    );
  }
}

HomepagePositionsSection.propTypes = propTypes;

HomepagePositionsSection.defaultProps = defaultProps;

export default HomepagePositionsSection;
