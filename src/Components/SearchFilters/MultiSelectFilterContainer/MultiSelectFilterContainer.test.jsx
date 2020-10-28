import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import MultiSelectFilterContainer from './MultiSelectFilterContainer';

describe('MultiSelectFilterContainerComponent', () => {
  const items = [{
    title: 'title', expanded: true,
  }];

  it('is defined title does not exist', () => {
    const wrapper = shallow(
      <MultiSelectFilterContainer
        queryParamToggle={() => {}}
        multiSelectFilterList={[{ expanded: true }]}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <MultiSelectFilterContainer
        queryParamToggle={() => {}}
        multiSelectFilterList={items}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
