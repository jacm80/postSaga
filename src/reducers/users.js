const initialState = {
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FECTH_USER_INFO':
        return {
            ...state,
            data: action.payload
        }
    case 'FECTH_USER_FAILED':
        return {
            ...state,
            data: action.error
        }
    default:
      return state
  }
}