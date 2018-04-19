import React from 'react';
import MediaQuery from '../MediaQuery';
import Content from './Content';

const About = () => (
  <div className="usa-grid-full content-container padded-main-content">
    <div className="usa-grid-full about-page">
      <MediaQuery breakpoint="screenSmMax" widthType="min">
        {(matches) => {
          if (matches) {
            return (
              <div className="usa-width-one-half about-content">
                <Content />
              </div>
            );
          }
          return (
            <div className="usa-width-three-fourths about-content">
              <Content />
            </div>
          );
        }}
      </MediaQuery>
    </div>
  </div>
);

export default About;
