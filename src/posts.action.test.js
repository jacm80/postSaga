import assert from 'assert'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import posts from './posts.action'


describe('Posts actions', () => {

  describe('#fetch', () => {
    
    it('catches errors', () => {
      
      const gen = posts.fetch()
      
      assert.deepEqual(
        gen.next().value,
        put({ type: 'FETCH_POSTS_START' }),
        'No se disparó el evento'
      )

      assert.deepEqual(
        gen.next().value,
        call(
          axios.get,
          'https://jsonplaceholder.typicode.com/posts'
        ),
        'No busca los posts'
      )

      assert.deepEqual(
        gen.throw('miau').value,
        put({
          type: 'FETCH_POSTS_FAILED',
          error: 'miau',
        }), 'No se está disparando el evento que maneja el error')
    })

    it('fetch posts', () => {
      
      const gen = posts.fetch()

      assert.deepEqual(
        gen.next().value,
        put({ type: 'FETCH_POSTS_START' }),
        'No se disparó el evento'
      )

      assert.deepEqual(
        gen.next().value,
        call(
          axios.get,
          'https://jsonplaceholder.typicode.com/posts'
        ),
        'No busca los todos'
      )
      /*
      assert.deepEqual(
        gen.next({ data: 1 }).value,
        put({ type: 'FETCH_POSTS_SUCCESS', payload: 1 })
      )
      */
    })
  })

  describe('#destroy', () => {
    
    const gen = posts.destroy(1)
    
    it('delete posts', () => {
        
        assert.deepEqual(
            gen.next().value,
            put({ type: 'DELETE_POST_START' }),
            'No se disparó el evento'
        )

        /*
        assert.deepEqual(
            gen.next({data: undefined}).value,
            call(
                axios.delete,
                `https://jsonplaceholder.typicode.com/posts/1`
            ),
            'No elimina en la api'
        )

        assert.deepEqual(
            gen.next({ data: 1 }).value,
            put({ type: 'DELETE_POST_SUCCESS', payload: 1 }),
            'No se disparó el evento'
        )
        */

    })

  })


  describe('#create', () => {

    const dummy = { id: 101, title:'aaa', body: '111ss aaa aaa' }
    const gen = posts.create(dummy)

    it('create posts', () => {
        
        assert.deepEqual(
            gen.next().value,
            put({ type:'CREATE_POST_START' }),
            'No se disparó el evento'
        )

        /*
        assert.deepEqual(
            gen.next({id:101}).value,
            put({ type:'CREATE_POST_SUCCESS', payload: dummy }),
            'No se disparó el evento'
        )
        */

    })

  })


})

/*
import test from 'tape'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import posts from './posts.action'

test('posts Saga test', function (t) {

    const gen = posts.fetch()
    let next = gen.next()

    t.deepEqual(
        next.value, 
        put({ type: 'FETCH_POSTS_START' }),
        "must select getCart"
    )

    t.end()
    
})
*/