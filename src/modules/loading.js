const LOADING_START = 'loading/LOADING_START'
const LOADING_END = 'loading/LOADING_END'

export const loadingStart = () => ({ type: LOADING_START })
export const loadingEnd = () => ({ type: LOADING_END })

const initialState = {
  loading: false,
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      }
    case LOADING_END:
      return {
        ...state,
        loading: false,
      }
    default :
      return state
  }
}

export default loadingReducer
