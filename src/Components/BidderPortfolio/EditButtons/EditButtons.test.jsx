import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EditButtons from './EditButtons';

describe('SearchResultsExportLink', () => {
  it('is defined', () => {
    const wrapper = shallow(<EditButtons />);
    expect(wrapper).toBeDefined();
  });

  // [button index, expected output, should call changeSaveState before test]
  [
    [0, { show: true, type: 'show' }, false],
    [0, { show: false, type: 'cancel' }, true],
    [1, { show: false, type: 'save' }, true],
  ].map(m => (
    it(`responds with the correct prop "${m[1].type}" when button index ${m[0]} is clicked`, () => {
      let val;
      function onChange(v) { val = v; }
      const wrapper = shallow(<EditButtons onChange={onChange} showSave={m[2]} />);
      if (m[2]) { wrapper.instance().changeSaveState(true); }
      wrapper.find('button').at(m[0]).simulate('click');
      expect(val).toEqual(m[1]);
    })
  ));

  it('matches snapshot', () => {
    const wrapper = shallow(<EditButtons />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
