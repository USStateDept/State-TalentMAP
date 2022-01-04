import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionSkillCodeList from './PositionSkillCodeList';
import { NO_SKILL } from '../../Constants/SystemMessages';

describe('PositionSkillCodeList', () => {
  const props = {
    primarySkill: 'SKILL (1000)',
    secondarySkill: 'OTHER SKILL (9001)',
  };

  it('is defined', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when props are falsey', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} primarySkill={''} secondarySkill={''} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot with only a primarySkill', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} secondarySkill={''} />);
    expect(wrapper.text()).toBe(props.primarySkill);
  });

  it('renders content correctly when both skills are present', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} />);
    expect(wrapper.text())
      .toBe(`${props.primarySkill}, ${props.secondarySkill}`);
  });

  it('renders content correctly when props are falsey', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} primarySkill={''} secondarySkill={''} />);
    expect(wrapper.text()).toBe(NO_SKILL);
  });

  it('matches snapshot with only a primarySkill', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} secondarySkill={''} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when both skills are present', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when both skills are falsey', () => {
    const wrapper = shallow(<PositionSkillCodeList {...props} primarySkill={''} secondarySkill={''} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
