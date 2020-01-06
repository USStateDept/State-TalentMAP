import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import MediaQuery from '../MediaQuery';

const markdownText = `
# YOUR BIDDING PROCESS – WHO DOES WHAT?
* The process starts with you and/or your Career Development Officer (CDO) submitting your bid (your CDO is your best contact to answer further questions on bidding and assignments you may have)
* If and when you are offered a handshake on a bid, this may come from your CDO or an Assignment Officer (AO)
  * There are HR/CDA Assignment Officers (AO) and Bureau Assignment Officers (AO). The Bureau AO is located in the regional or functional executive office and works exclusively for that Bureau to recruit and manage positions.
* Once you have accepted a handshake for a position, the CDO registers your handshake
* Your HR/CDA AO will bring you to panel for assignments in their Bureau (example: if you accept a handshake for a post in AF, the HR/CDA AO who has the AF portfolio handles your case)
* You go through the paneling process
* Your CDO will send a TMOne (Assignment notification to gaining and losing post) for curtailment, resignation, or retirement
* A HR Assignment Technician will prepare the orders that get you to the assignment in coordination with your AO
As you can see, this is a lengthy and involved process and it could potentially take a long time.
`;

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownText,
    };
  }

  render() {
    return (
      <div className="usa-grid-full content-container padded-main-content">
        <div className="usa-grid-full faq-page">
          <MediaQuery breakpoint="screenSmMax" widthType="min">
            {matches => (
              <div>
                <div className={`${matches ? 'usa-width-one-half' : 'usa-width-three-fourths'} faq-content`}>
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
