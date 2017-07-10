import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ajax } from './utilities';

const posts = [
  { id: 6, grade: '05', skill: 'OFFICE MANAGEMENT (9017)', bureau: '150000', organization: 'YAOUNDE CAMEROON (YAOUNDE)', position_number: '00025003', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }] },
  { id: 80, grade: '05', skill: 'INFORMATION MANAGEMENT (2880)', bureau: '110000', organization: 'SAO PAULO BRAZIL (SAO PAULO)', position_number: '55115002', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 22, language: 'Portuguese (PY)', written_proficiency: '1', spoken_proficiency: '1', representation: 'Portuguese (PY) 1/1' }] },
];

describe('utils', () => {
  it('Should return data from response', (done) => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/').reply(200,
      posts,
    );

    const f = () => {
      setTimeout(() => {
        ajax('http://localhost:8000/api/v1/position/')
       .then((res) => {
         const data = res;
         expect(data).toBeDefined();
         done();
       });
      }, 0);
    };
    f();
  });
});
