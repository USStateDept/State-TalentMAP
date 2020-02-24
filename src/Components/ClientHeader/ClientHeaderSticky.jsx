import React, { Component } from 'react';
import { Sticky } from 'react-sticky';
import { get } from 'lodash';
import ClientHeader from './ClientHeader';

export const CONTAINER_ID = 'sticky-container-client-header';

export class ClientHeaderSticky extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topOffset: 200,
    };
  }
  componentWillReceiveProps() {
    const d = document.getElementById(CONTAINER_ID);
    const topPos = get(d, 'offsetTop');
    if (topPos) {
      this.setState({ topOffset: topPos });
    }
  }
  render() {
    return (
      <div id={CONTAINER_ID}>
        <Sticky topOffset={this.state.topOffset}>
          {({ style }) => (
            <ClientHeader {...this.props} style={style} />
          )}
        </Sticky>
      </div>
    );
  }
}

export default ClientHeaderSticky;
