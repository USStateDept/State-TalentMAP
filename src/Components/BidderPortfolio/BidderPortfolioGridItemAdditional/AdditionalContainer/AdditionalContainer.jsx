import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdditionalView from '../AdditionalView';
import { fetchAllClientData } from '../../../../actions/client';

class BidderPortfolioGridItemAdditional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      isLoading: false,
      hasErrored: false,
    };
  }
  componentWillMount() {
    this.fetchClient();
  }
  // Since displaying each set of additional details is a one-off request,
  // we don't use redux to maintain state and simply store it in the component's
  // state.
  fetchClient() {
    const { clientId, getClient } = this.props;
    const clientPromise = getClient(clientId);
    this.setState({ isLoading: true, hasErrored: false });
    Promise.resolve(clientPromise)
      .then((client) => {
        if (client instanceof Error) {
          this.setState({ isLoading: false, hasErrored: true });
        } else {
          this.setState({
            client,
            isLoading: false,
            hasErrored: false,
          });
        }
      });
  }
  render() {
    const { client, isLoading, hasErrored } = this.state;
    return (
      <AdditionalView
        client={client}
        isLoading={isLoading}
        hasErrored={hasErrored}
      />
    );
  }
}

BidderPortfolioGridItemAdditional.propTypes = {
  clientId: PropTypes.number.isRequired,
  getClient: PropTypes.func.isRequired, // set this as a prop to make testing easier
};

BidderPortfolioGridItemAdditional.defaultProps = {
  getClient: fetchAllClientData,
};

export default BidderPortfolioGridItemAdditional;
