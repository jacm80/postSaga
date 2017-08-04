import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'
import reducers from './reducers/index'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(combineReducers({
  ...reducers,
  form: formReducer,
}), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
