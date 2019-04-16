import React, { Component } from 'react';
import Picky from 'react-picky';
import ListItem from './ListItem';

export function renderList({ items, ...rest }) {
  return items.map(item => <ListItem key={item} item={item} {...rest} />);
}

class BidCyclePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: [],
    };
    this.selectOption = this.selectOption.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }
  selectOption(value) {
    this.setState({ value });
  }
  selectMultipleOption(value) {
    this.setState({ arrayValue: value });
  }
  render() {
    const { arrayValue } = this.state;
    return (
      <div className="bid-cycle-picker-container">
        <div className="label">Bid cycle:</div>
        <Picky
          placeholder="Select cycle"
          value={arrayValue}
          options={['2020 PSP', 'Long-term training and details Summer 2020', 'Summer 2020']}
          onChange={this.selectMultipleOption}
          numberDisplayed={1}
          multiple
          dropdownHeight={600}
          renderList={renderList}
        />
      </div>
    );
  }
}

export default BidCyclePicker;
