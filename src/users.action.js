import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'

export default {
   * fetch({ payload }) {
    yield put({ type: 'FETCH_USER_INFO' })
    try {
      const userResponse = yield call(axios.get, `https://jsonplaceholder.typicode.com/user/${payload}`)
      console.log('userResponse: ', userResponse)
      //yield put({ type: 'FETCH_USER_SUCCESS', payload: userResponse.data.slice(0, 10) })
    } catch(error) {
      yield put({ type: 'FETCH_USER_FAILED', error })
    }
  },
}