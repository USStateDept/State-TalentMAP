import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import MediaQuery from '../MediaQuery';
import Spinner from '../Spinner';
import Alert from '../Alert';
import markdownText from './text.markdown';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownText,
      isLoading: true,
    };
  }

  render() {
    return (
      <div className="usa-grid-full content-container padded-main-content">
        <div className="usa-grid-full about-page">
          <MediaQuery breakpoint="screenSmMax" widthType="min">
            {matches => (
              <div>
                <div className={`${matches ? 'usa-width-one-half' : 'usa-width-three-fourths'} about-content`}>
                  <div>
                    <ReactMarkdown source={markdownText} />
                  </div>
                </div>
              </div>)
            }
          </MediaQuery>
        </div>
      </div>
    );
  }
}

export default Faq;
