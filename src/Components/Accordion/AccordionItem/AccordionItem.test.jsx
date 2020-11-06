import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AccordionItem from './AccordionItem';

describe('AccordionItemComponent', () => {
  const props = {
    id: 'id',
    title: 'title',
    expanded: true,
    setAccordion: () => {},
  };

  it('receives props', () => {
    const wrapper = shallow(
      <AccordionItem
        {...props}
      >
        <span>child</span>
      </AccordionItem>,
    );
    expect(wrapper.instance().props.id).toBe('id');
  });

  it('is defined when controlled = true', () => {
    const wrapper = shallow(
      <AccordionItem
        {...props}
        controlled
      >
        <span>child</span>
      </AccordionItem>,
    );
    expect(wrapper).toBeDefined();
  });

  it('returns correct value for isExpanded()', () => {
    const wrapper = shallow(
      <AccordionItem
        {...props}
      >
        <span>child</span>
      </AccordionItem>,
    );
    wrapper.instance().setState({ expanded: true });
    expect(wrapper.instance().isExpanded()).toBe(true);
    wrapper.instance().setState({ expanded: false });
    expect(wrapper.instance().isExpanded()).toBe(false);
  });

  it('sets state on setExpandedFromRef()', () => {
    const wrapper = shallow(
      <AccordionItem
        {...props}
      >
        <span>child</span>
      </AccordionItem>,
    );
    wrapper.instance().setState({ expanded: false });
    expect(wrapper.instance().state.expanded).toBe(false);
    wrapper.instance().setExpandedFromRef(true);
    expect(wrapper.instance().state.expanded).toBe(true);
  });

  it('receives different props', () => {
    const wrapper = shallow(
      <AccordionItem
        {...props}
        preContent={<span />}
      >
        <span>child</span>
      </AccordionItem>,
    );
    expect(wrapper.instance().props.id).toBe('id');
  });

  it('clicks the button', () => {
    const expanded = { value: null };
    const wrapper = shallow(
      <AccordionItem
        {...props}
        expanded={false}
        setAccordion={(e) => { expanded.value = e; }}
      >
        <span>child</span>
      </AccordionItem>,
    );
    wrapper.find('button').simulate('click');
    expect(expanded.value).toBe('id');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AccordionItem
        {...props}
        setAccordion={() => {}}
      >
        <span>child</span>
      </AccordionItem>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
