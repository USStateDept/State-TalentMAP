import LoginSaga from './login/sagas';

export default function* IndexSaga() {
  yield [
    LoginSaga(),
  ];
}
