import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import PanelMeetingAgenda from './PanelMeetingAgenda';

describe('PanelMeetingAgendaComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <PanelMeetingAgenda isCDO />
      </MemoryRouter>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <PanelMeetingAgenda isCDO />
      </MemoryRouter>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <PanelMeetingAgenda isCDO={false} />
      </MemoryRouter>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
