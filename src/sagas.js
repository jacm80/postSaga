import { takeEvery } from 'redux-saga/effects'
import posts from './posts.action'

export default function* rootSagas() {
  yield takeEvery('FETCH_POSTS', posts.fetch)
  yield takeEvery('CREATE_POST', posts.create)
  // yield takeEvery('UPDATE_POST', posts.update)
  yield takeEvery('DELETE_POST', posts.destroy)
  // yield takeEvery('SHOW_FORM', posts.showform)
}