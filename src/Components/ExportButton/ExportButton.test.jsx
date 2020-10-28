import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ExportButton from './ExportButton';

describe('ExportButton', () => {
  it('is defined', () => {
    const favorite = shallow(<ExportButton />);
    expect(favorite).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ExportButton />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading === true', () => {
    const wrapper = shallow(<ExportButton />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
