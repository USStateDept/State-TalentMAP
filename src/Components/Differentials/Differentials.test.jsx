import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DefinitionList from './Differentials';

describe('DefinitionList', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<DefinitionList />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
