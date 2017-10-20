import { all } from 'redux-saga/effects';
import LoginSaga from './login/sagas';

export default function* IndexSaga() {
  yield all([
    LoginSaga(),
  ]);
}
