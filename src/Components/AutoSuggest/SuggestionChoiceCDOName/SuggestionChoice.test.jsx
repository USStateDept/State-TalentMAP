import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SuggestionChoice from './SuggestionChoice';

describe('SuggestionChoiceCDONameComponent', () => {
  const suggestion = {
    id: 2,
    first_name: 'Bob',
    last_name: 'Smith',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SuggestionChoice
        suggestion={suggestion}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SuggestionChoice
        suggestion={suggestion}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isCurrentUser === true', () => {
    const wrapper = shallow(
      <SuggestionChoice
        suggestion={{ ...suggestion, isCurrentUser: true }}
        value={suggestion}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
