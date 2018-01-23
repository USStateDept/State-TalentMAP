import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdditionalView from '../AdditionalView';
import fetchClient from '../../../../actions/client';

class BidderPortfolioGridItemAdditional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: { value: {} },
      isLoading: { value: false },
      hasErrored: { value: false },
    };
  }
  componentWillMount() {
    this.fetchClient();
  }
  // Since displaying each set of additional details is a one-off request,
  // we don't use redux to maintain state and simply store it in the component's
  // state.
  fetchClient() {
    const { clientId } = this.props;
    const clientPromise = fetchClient(clientId);
    this.setState({ isLoading: { value: true } });
    this.setState({ hasErrored: { value: false } });
    Promise.resolve(clientPromise)
      .then((client) => {
        this.setState({ client: { value: client } });
        this.setState({ isLoading: { value: false } });
        this.setState({ hasErrored: { value: false } });
      })
      .catch(() => {
        this.setState({ isLoading: { value: false } });
        this.setState({ hasErrored: { value: true } });
      });
  }
  render() {
    const { client, isLoading } = this.state;
    return (
      <AdditionalView client={client.value} isLoading={isLoading.value} />
    );
  }
}

BidderPortfolioGridItemAdditional.propTypes = {
  clientId: PropTypes.number.isRequired,
};

export default BidderPortfolioGridItemAdditional;
