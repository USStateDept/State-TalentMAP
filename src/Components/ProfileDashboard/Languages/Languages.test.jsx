import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Languages from './Languages';

describe('LanguagesComponent', () => {
  const props = {
    languagesArray: [
      {
        code: 'GG',
        custom_description: 'Georgian 2+/2',
        language: 'Georgian',
        reading_score: '2',
        speaking_score: '2+',
        test_date: '2003-05-28T12:00:00Z',
      },
    ],
    useWrapper: true,
  };
  it('is defined', () => {
    const wrapper = shallow(<Languages {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when useWrapper is false', () => {
    const wrapper = shallow(<Languages {...props} useWrapper={false} />);
    expect(wrapper).toBeDefined();
  });

  it('renders the .languages-container div when useWrapper is true', () => {
    const wrapper = shallow(<Languages {...props} useWrapper />);
    expect(wrapper.find('.languages-container').exists()).toBe(true);
  });

  it('does not render the .languages-container div when useWrapper is false', () => {
    const wrapper = shallow(<Languages {...props} useWrapper={false} />);
    expect(wrapper.find('.languages-container').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Languages {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useWrapper is false', () => {
    const wrapper = shallow(<Languages {...props} useWrapper={false} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
