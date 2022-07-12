const GET_RESULT = 'searchResult/GET_RESULT'

export const getResult = (payload) => ({
  type: GET_RESULT,
  payload,
})

const initialState = {}

const searchResult = (state = initialState, action) => {
  if (action.type === GET_RESULT) {
    return action.payload
  } else {
    return state
  }
}

export default searchResult
