import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'

const getId = () => Math.random().toString(36).substr(2)

export default {
  
  /*
  * showform ({ payload }) {
    yield put({ type:'SHOW_FORM', payload: payload })
  },
  */
  
  * fetch() {
    yield put({ type: 'FETCH_POSTS_START' })
    try {
      var postsResponse = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts')
      for (var i in postsResponse.data){
         const userId = postsResponse.data[i].userId
         const user = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${userId}`)
         postsResponse.data[i]['user'] = user.data
      }
      // console.log('postsResponse.data: ',postsResponse.data)
      yield put({ type: 'FETCH_POSTS_SUCCESS', payload: postsResponse.data.slice(0, 10) })
      //yield put({ type: 'FETCH_POSTS_SUCCESS', payload: post.data.slice(0,10) })
    } catch(error) {
      yield put({ type: 'FETCH_POSTS_FAILED', error })
    }
  },

  * create({ payload }) {
    yield put({ type: 'CREATE_POST_START' })
    try {
      // console.log('create :: payload', payload)
      const postsResponse = yield call(
        axios.post,
        'https://jsonplaceholder.typicode.com/posts',
        payload,
      )
      yield put({ type: 'CREATE_POST_SUCCESS', payload: { ...postsResponse.data, id: getId() } })
      // yield put({ type: 'CREATE_POST_SUCCESS', payload: { ...postsResponse.data } })
    } catch(error) {
      yield put({ type: 'CREATE_POST_FAILED', error })
    }
  },

  * update({ payload }) {
   console.log('>> PAYLOAD: ', payload)
    yield put({ type: 'UPDATE_POST_START' })
    try {
      const postsResponse = yield call(
        axios.patch,
        `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
        _.omit(payload, ['id']),
      )
      console.log('postResponse: ', postsResponse)
      yield put({ type: 'UPDATE_POST_SUCCESS', payload: payload })
      //yield put({ type: 'FETCH_TODOS_SUCCESS', payload: todosResponse.data.slice(0, 10) })
    } catch(error) {
      yield put({ type: 'UPDATE_POST_FAILED', error })
    }
  },

  * destroy({ payload }) {
    // console.log('FUI LLAMADO POR DELETE_TODO')
    // console.log('PAYLOAD: ', payload)
    yield put({ type: 'DELETE_POST_START' })
    try {
      if (!isNaN(payload)){
        yield call(
          axios.delete,
          `https://jsonplaceholder.typicode.com/posts/${payload}`,
        )
      }
      yield put({ type: 'DELETE_POST_SUCCESS', payload: payload })
    } catch(error) {
      yield put({ type: 'DELETE_POST_FAILED', error })
    }
  }
}
