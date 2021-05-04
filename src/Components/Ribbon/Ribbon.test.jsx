import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Ribbon from './Ribbon';

describe('RibbonComponent', () => {
  const props = {
    type: 'primary',
    className: '',
    icon: '',
    text: '',
    cutSide: 'left',
    containerProps: {},
  };

  it('is defined', () => {
    const wrapper = shallow(<Ribbon {...props} />);

    expect(wrapper).toBeDefined();
  });

  it('creates class names', () => {
    const props$ = {
      ...props,
      className: 'custom-class',
      cutSide: 'right',
      type: 'primary',
    };
    const wrapper = shallow(<Ribbon {...props$} />);

    expect(wrapper.find('div').at(0).props().className)
      .toBe(`ribbon-outer-container-cut-${props$.cutSide}   ${props$.className}`);
    expect(wrapper.find('div').at(1).props().className)
      .toBe(`ribbon ribbon-${props$.type} ribbon-cut-${props$.cutSide}`);
  });

  it('passes the correct icon name', () => {
    const props$ = {
      ...props,
      icon: 'message',
    };
    const wrapper = shallow(<Ribbon {...props$} />);

    expect(wrapper.find('FontAwesome').at(0).props().name)
      .toBe(props$.icon);
  });

  it('passes the correct text', () => {
    const props$ = {
      ...props,
      text: 'Ribbon text',
    };
    const wrapper = shallow(<Ribbon {...props$} />);

    expect(wrapper.find('span').text())
      .toBe(props$.text);
  });

  it('spreads the containerProps', () => {
    const props$ = {
      ...props,
      containerProps: {
        alt: 'alt text',
        tabIndex: 0,
      },
    };
    const wrapper = shallow(<Ribbon {...props$} />);

    Object.keys(props$.containerProps).map(m => (
      expect(wrapper.find('div').at(0).props()[m])
        .toBe(props$.containerProps[m])
    ));
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Ribbon {...props} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
