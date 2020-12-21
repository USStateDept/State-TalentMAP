import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BoxShadow from './BoxShadow';

describe('BoxShadow', () => {
  it('can receive props', () => {
    const wrapper = shallow(
      <BoxShadow
        is="span"
        inset
        offsetX={23}
        offsetY={25}
        blurRadius={27}
        spreadRadius={29}
        color="#f2f2f2"
        style={{ backgroundColor: 'red' }}
      />,
    );
    const output = {
      backgroundColor: 'red',
      boxShadow: 'inset 23px 25px 27px 29px #f2f2f2',
    };
    expect(wrapper.props().style).toEqual(output);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BoxShadow />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
