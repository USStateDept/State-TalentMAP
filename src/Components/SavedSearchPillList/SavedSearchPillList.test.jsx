import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SavedSearchPillList from './SavedSearchPillList';

describe('FavoriteContentComponent', () => {
  const pills = [
    {
      description: '1',
      isCommon: true,
    },
    {
      description: 'Tandem',
      isCommon: false,
      isToggle: true,
    },
    {
      description: 'Los Angeles, CA United States of America',
      isTandem: true,
    },
  ];
  const props = {
    isProjectedVacancy: true,
    isTandemSearch: true,
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
    expect(wrapper.find('div').children().find('div').text()).toBe('Projected Vacancy');
    expect(wrapper.find('div').children().find('div')
      .find('.saved-search-pill')
      .find('.pill--projected-vacancy')
      .find('.pill--highlight')
      .exists()).toBe(true);
  });

  it('shows just AP pill when length is 0 and not isProjectedVacancy', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={[]}
        isTandemSearch
        isProjectedVacancy={false}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').children().find('div').text()).toBe('Available Position');
    expect(wrapper.find('div').children().find('div')
      .find('.saved-search-pill')
      .exists()).toBe(true);
  });

  it('pill classes render properly when isTandemSearch and isProjectedVacancy', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={pills}
        {...props}
      />,
    );
    expect(wrapper.find('div').children().find('div')).toHaveLength(3);

    expect(wrapper.find('div').children().find('div').at(0)
      .find('.pill--projected-vacancy')
      .exists()).toBe(true);
    expect(wrapper.find('div').children().find('div').at(1)
      .find('.pill--tandem-search')
      .exists()).toBe(true);
    expect(wrapper.find('div').children().find('div').at(2)
      .find('.pill--tandem2')
      .exists()).toBe(true);
  });

  it('pill classes render properly when isTandemSearch and not isProjectedVacancy', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={pills}
        isProjectedVacancy={false}
        isTandemSearch
      />,
    );
    expect(wrapper.find('div').children().find('div')).toHaveLength(3);

    expect(wrapper.find('div').children().find('div').at(0)
      .find('.pill--projected-vacancy')
      .exists()).toBe(false);
    expect(wrapper.find('div').children().find('div').at(1)
      .find('.pill--tandem-search')
      .exists()).toBe(true);
    expect(wrapper.find('div').children().find('div').at(2)
      .find('.pill--tandem2')
      .exists()).toBe(true);
  });

  it('pill classes render properly when not isTandemSearch and not isProjectedVacancy', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={pills}
        isProjectedVacancy={false}
        isTandemSearch={false}
      />,
    );
    expect(wrapper.find('div').children().find('div')).toHaveLength(3);

    expect(wrapper.find('div').children().find('div').at(0)
      .find('.pill--projected-vacancy')
      .exists()).toBe(false);
    expect(wrapper.find('div').children().find('div').at(1)
      .find('.pill--tandem-search')
      .exists()).toBe(false);
    expect(wrapper.find('div').children().find('div').at(2)
      .find('.pill--tandem2')
      .exists()).toBe(false);
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
