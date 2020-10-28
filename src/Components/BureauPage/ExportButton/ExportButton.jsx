import { Component } from 'react';
import PropTypes from 'prop-types';
import ExportButton from 'Components/ExportButton';
import { downloadBidderData } from 'actions/bureauPositionBids';

class ExportButtonBureau extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  exportBidders = () => {
    const { id, ordering, filters } = this.props;
    const query = {
      ...filters,
      ordering,
    };
    this.setState({ isLoading: true });
    downloadBidderData(id, query)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <ExportButton onClick={this.exportBidders} isLoading={isLoading} />
    );
  }
}

ExportButtonBureau.propTypes = {
  id: PropTypes.string.isRequired,
  ordering: PropTypes.string,
  filters: PropTypes.shape({}),
};

ExportButtonBureau.defaultProps = {
  ordering: '',
  filters: {},
};

export default ExportButtonBureau;
