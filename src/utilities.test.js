import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ajax,
         validStateEmail,
         localStorageFetchValue,
         localStorageToggleValue,
         fetchUserToken,
       } from './utilities';

const posts = [
  { id: 6, grade: '05', skill: 'OFFICE MANAGEMENT (9017)', bureau: '150000', organization: 'YAOUNDE CAMEROON (YAOUNDE)', position_number: '00025003', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }] },
  { id: 80, grade: '05', skill: 'INFORMATION MANAGEMENT (2880)', bureau: '110000', organization: 'SAO PAULO BRAZIL (SAO PAULO)', position_number: '55115002', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 22, language: 'Portuguese (PY)', written_proficiency: '1', spoken_proficiency: '1', representation: 'Portuguese (PY) 1/1' }] },
];

describe('ajax', () => {
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

describe('local storage', () => {
  it('should be able to fetch the existence of a value when there is one values in the array', () => {
    localStorage.setItem('key', JSON.stringify(['1']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(true);
    localStorage.clear();
  });

  it('should be able to fetch the existence of a value when there are multiple values in the array', () => {
    localStorage.setItem('key', JSON.stringify(['1', '2']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(true);
    localStorage.clear();
  });

  it('should be able to fetch the existence of a value when that value is not in the array', () => {
    localStorage.setItem('key', JSON.stringify(['2', '3']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(false);
    localStorage.clear();
  });

  it('should be able to fetch the count of an array', () => {
    localStorage.setItem('key', JSON.stringify(['1', '2']));
    const retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.count).toBe(2);
    localStorage.clear();
  });

  it('should be able to toggle a value in the array', () => {
    localStorage.setItem('key', JSON.stringify(['1', '2']));
    let retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(true);
    localStorageToggleValue('key', '1');
    retrieved = localStorageFetchValue('key', '1');
    expect(retrieved.exists).toBe(false);
    localStorage.clear();
  });
});

describe('validStateEmail', () => {
  it('should return true for a valid State email', () => {
    const email = 'joe123@state.gov';
    const output = validStateEmail(email);
    expect(output).toBe(true);
  });

  it('should return false for an invalid State email', () => {
    const email = 'joe123@email.com';
    const output = validStateEmail(email);
    expect(output).toBe(false);
  });
});

describe('fetchUserToken', () => {
  it('should be able to fetch the auth token', () => {
    localStorage.setItem('token', '1234');
    const output = fetchUserToken();
    expect(output).toBe('Token 1234');
    localStorage.clear();
  });
});
