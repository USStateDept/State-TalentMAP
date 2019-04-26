import React from 'react';
import { TinyButton } from 'react-scroll-up-button';

// style is the only way to override most defaults
const style = {
  backgroundColor: 'rgb(0, 113, 188, .8)', // this is $primary-blue converted to rgb, with some transparency
  border: '1px solid white',
  padding: '4px 5px 5px',
};

const ScrollUpButton = props => (
  <TinyButton
    ContainerClassName="tm-scroll-up-container"
    style={style}
    {...props}
  />
);

export default ScrollUpButton;
