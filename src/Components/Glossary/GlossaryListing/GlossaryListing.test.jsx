import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryListing from './GlossaryListing';
import glossaryItems from '../../../__mocks__/glossaryItems';

describe('GlossaryListingComponent', () => {
  const props = {
    glossaryItems,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <GlossaryListing
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('displays a link if it is provided', () => {
    const glossaryItems$ = [glossaryItems[0]];
    glossaryItems$[0].link = 'google.com';
    const wrapper = shallow(
      <GlossaryListing
        glossaryItems={glossaryItems$}
      />,
    );
    expect(wrapper.find('a').exists()).toBe(true);
  });

  it('does not display a link if it is not provided', () => {
    const glossaryItems$ = [glossaryItems[0]];
    glossaryItems$[0].link = '';
    const wrapper = shallow(
      <GlossaryListing
        glossaryItems={glossaryItems$}
      />,
    );
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <GlossaryListing
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
