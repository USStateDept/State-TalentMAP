import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionsSectionTitle from './PositionsSectionTitle';

describe('PositionsSectionTitleComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PositionsSectionTitle
        title="title"
        viewMoreLink="link"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionsSectionTitle
        title="title"
        viewMoreLink="link"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
