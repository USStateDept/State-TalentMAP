import { shallow } from 'enzyme';
import ProjectedVacancyCard from './ProjectedVacancyCard';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import resultsObject from '../../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('ProjectedVacancyCard', () => {
  const result = resultsObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ProjectedVacancyCard.WrappedComponent data={result} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
