import { shallow } from 'enzyme';
import { Classifications } from 'Constants/Classifications';
import CheckboxList from './CheckboxList';

describe('CheckboxList', () => {
  const props = {
    clientClassifications: ['3', 'T', 'C'],
    list: Classifications,
  };

  it('is defined', () => {
    const wrapper = shallow(<CheckboxList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isDisabled is true', () => {
    const wrapper = shallow(<CheckboxList
      {...props}
      isDisabled
    />);
    expect(wrapper).toBeDefined();
  });
});
