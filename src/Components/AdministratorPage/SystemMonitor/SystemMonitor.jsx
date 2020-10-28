import { Component } from 'react';
import api from '../../../api';

class SystemMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      isLoading: false,
      hasErrored: false,
      data: {},
    };
  }

  componentWillMount() {
    setInterval(() => {
      this.getInfo();
    }, 5000);
  }

  getInfo = () => {
    this.setState({ isLoading: true, hasErrored: false }, () => {
      api().get('/stats/sysmon/')
        .then(data => {
          this.setState({
            hasLoaded: true,
            data: data.data,
            isLoading: false,
          });
        })
        .catch(() => {
          this.setState({
            hasLoaded: true,
            hasErrored: true,
            isLoading: false,
          });
        });
    });
  }

  render() {
    const { hasLoaded, hasErrored, data } = this.state;

    let body = (
      <p style={{ whiteSpace: 'pre-wrap' }}>
        {data.memory}
        <br />
        CPU (1 min, 5 min, 15 min, process count, last process)
        <br />
        {data.cpu}
        <br />
        {data.disk}
      </p>
    );

    if (!hasLoaded) body = 'Loading...';

    if (hasErrored) body = 'Error fetching system resources.';

    return (
      <div className="usa-grid-full" style={{ minHeight: 500, padding: '1em' }}>
        {body}
      </div>
    );
  }
}

export default SystemMonitor;
