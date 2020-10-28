import { TinyButton } from 'react-scroll-up-button';

// style is the only way to override most defaults
const style = {
  // this is $primary-blue converted to rgb, with some transparency
  // make sure the hex ($primary-blue-darker) is also set in _scrollUp.scss
  backgroundColor: 'rgb(32, 84, 147, .8)',

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
