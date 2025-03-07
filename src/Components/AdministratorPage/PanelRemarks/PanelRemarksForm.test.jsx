import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Picky } from 'react-picky';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as toastActions from 'actions/toast';
import PanelRemarksForm from './PanelRemarksForm';

const mockStore = configureStore([thunk]);

const categories = [
  { rccode: 'cat1', rcdesctext: 'Category 1' },
  { rccode: 'cat2', rcdesctext: 'Category 2' },
];

const remarkData = {
  rmrktext: '',
  rmrkshortdesctext: '',
  rmrkordernum: 0,
  rmrkactiveind: false,
  rmrkmutuallyexclusiveind: false,
  rmrkrccode: '',
};

const initialState = {
  panelRemarksCreateSuccess: false,
  panelRemarksEditSuccess: false,
};

const renderComponent = ({ data, onClose = jest.fn() }) => {
  const store = mockStore(initialState);
  return mount(
    <Provider store={store}>
      <PanelRemarksForm
        mode="create"
        categories={categories}
        remarkData={data}
        onClose={onClose}
      />
    </Provider>,
  );
};

describe('PanelRemarksForm', () => {
  it('renders the form with default remarkData - create remark', () => {
    const wrapper = renderComponent({ data: remarkData });

    expect(wrapper.find('textarea#remarkDescription').prop('value')).toBe('');
    expect(wrapper.find('input#remarkShortDescription').prop('value')).toBe('');
    expect(wrapper.find('input#remarkOrder').prop('value')).toBe(0);
    expect(wrapper.find('input[role="switch"]').at(0).prop('checked')).toBe(false);
    expect(wrapper.find('input[role="switch"]').at(1).prop('checked')).toBe(false);
    expect(wrapper.find(Picky).prop('value')).toBe(undefined);
  });

  it('validates the form and shows error message for missing fields', () => {
    const toastWarningSpy = jest.spyOn(toastActions, 'toastWarning');
    const wrapper = renderComponent({ data: remarkData });

    wrapper.find('button').filterWhere((button) => button.text() === 'Create').simulate('click');

    expect(toastWarningSpy).toHaveBeenCalledWith('Missing fields are highlighted red', 'Cannot Submit Form');
    expect(wrapper.find('textarea#remarkDescription').hasClass('input-error')).toBe(true);
    expect(wrapper.find('input#remarkShortDescription').hasClass('input-error')).toBe(true);
    expect(wrapper.find(Picky).hasClass('input-error')).toBe(true);
  });

  it('renders the form with remarkData - edit remark', () => {
    const wrapper = renderComponent({ data: {
      rmrktext: 'Test remark',
      rmrkshortdesctext: 'Test short description',
      rmrkordernum: 1,
      rmrkactiveind: true,
      rmrkmutuallyexclusiveind: false,
      rmrkrccode: 'cat1',
    } });

    expect(wrapper.find('textarea#remarkDescription').prop('value')).toBe('Test remark');
    expect(wrapper.find('input#remarkShortDescription').prop('value')).toBe('Test short description');
    expect(wrapper.find('input#remarkOrder').prop('value')).toBe(1);
    expect(wrapper.find('input[role="switch"]').at(0).prop('checked')).toBe(true);
    expect(wrapper.find('input[role="switch"]').at(1).prop('checked')).toBe(false);
    expect(wrapper.find(Picky).prop('value')).toEqual(categories[0]);
  });
});
