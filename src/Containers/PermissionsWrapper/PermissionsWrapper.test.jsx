import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import PermissionsWrapperContainer, { PermissionsWrapper } from './PermissionsWrapper';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Profile', () => {
  const props = {
    userProfile: {
      permission_groups: ['test1', 'test2'],
    },
    isLoading: false,
  };

  const content = <div>Exists</div>;

  it('is defined', () => {
    const profile = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <PermissionsWrapperContainer {...props}>
        {content}
      </PermissionsWrapperContainer>
    </MemoryRouter></Provider>);
    expect(profile).toBeDefined();
  });

  it('returns the children if permissions match', () => {
    const wrapper = shallow(
      <PermissionsWrapper
        {...props}
        permissions={props.userProfile.permission_groups[0]}
      >{content}</PermissionsWrapper>,
    );
    expect(wrapper.text()).toBe('Exists');
  });

  it('does not return the children if permissions do not match', () => {
    const wrapper = shallow(
      <PermissionsWrapper
        {...props}
        permissions="doesNotExist"
      >{content}</PermissionsWrapper>,
    );
    expect(wrapper.text()).not.toBe('Exists');
  });
});
