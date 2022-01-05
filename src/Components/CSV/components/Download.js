/* eslint-disable */
import { Component } from 'react';
import {buildURI} from '../core';
import {
   defaultProps as commonDefaultProps,
   propTypes as commonPropTypes} from '../metaProps';
const defaultProps = {
  target: '_blank'
};

/**
 *
 * @example ../../sample-site/csvdownload.example.md
 */
class CSVDownload extends Component {

  static defaultProps = Object.assign(
    commonDefaultProps,
    defaultProps
  );

  static propTypes = commonPropTypes;

  constructor(props) {
    super(props);
    this.state={};
  }

  buildURI() {
    return buildURI(...arguments);
  }

  componentDidMount(){
    const {data, headers, separator, enclosingCharacter, uFEFF, target, specs, replace, transform} = this.props;
    this.state.page = window.open(
        this.buildURI(data, uFEFF, headers, separator, enclosingCharacter), target, specs, replace, transform
    );
  }

  getWindow() {
    return this.state.page;
  }

  render(){
    return (null)
  }
}

export default CSVDownload;
/* eslint-enable */
