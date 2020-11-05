import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SavedSearchPillList from './SavedSearchPillList';

describe('FavoriteContentComponent', () => {
  // const pills = ['1', '0A', 'Projected Vacancy', 'Los Angeles, CA United States of America'];
  const pills = [
    {
      description: '1',
      isCommon: true,
    },
    {
      description: 'Tandem',
      isCommon: true,
      isToggle: true,
    },
    {
      description: 'Los Angeles, CA United States of America',
      isTandem: true,
    },
  ];
  const props = {
    isProjectedVacancy: true,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={pills}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when length is 0', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={[]}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('shows just PV pill when length is 0 and isProjectedVacancy', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={[]}
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').at(0).children().find('div')
      .at(0)
      .text())
      .toBe('Projected Vacancy');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={pills}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
