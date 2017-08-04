const initialState = {
  data: [],
  fetching: false,
  creating: false,
  updating: false,
  deleting: false,
  adding: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_FORM':
      console.log('call me SHOW_FORM')
      return {
         ...state,
        adding: !action.payload,
      }
    case 'FETCH_POSTS_START':
      return {
        ...state,
        fetching: true,
      }
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        fetching: false,
        data: action.payload,
      }
    case 'FETCH_POSTS_FAILED':
      return {
        ...state,
        fetching: false,
        error: action.error,
      }
    case 'CREATE_POST_START':
      return {
        ...state,
        creating: true,
      }
    case 'CREATE_POST_SUCCESS':
      return {
        ...state,
        creating: false,
        data: state.data.concat(action.payload),
      }
    case 'CREATE_POST_FAILED':
      return {
        ...state,
        creating: false,
        error: action.error,
      }
    case 'UPDATE_POST_START':
      return {
        ...state,
        updating: true
      }
    case 'UPDATE_POST_SUCCESS':
      return {
        ...state,
        updating: false,
        data: [ action.payload ]
      }
    case 'UPDATE_POST_FAILED':
      return {
        ...state,
        updating: false,
        data: action.error
      }
    case 'DELETE_POST_START':
      return {
        ...state,
        deleting: true
      }
    case 'DELETE_POST_SUCCESS':
      console.log('DELETE_POST_SUCCESS: ', action.payload)
      const filter = state.data.filter(x => x.id !== action.payload)
      console.log('FILTER: ', filter)
      return {
        ...state,
        deleting: false,
        data: filter
      }
    case 'DELETE_POST_FAILED':
      return {
        ...state,
        deleting: false,
        data: action.error
      }
    default:
      return state
  }
}
