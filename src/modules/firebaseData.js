import { getFirebaseData } from "../datasources/firebase"

const DATA_RESULT = 'firebaseData/DATA_RESULT'

export const dataResultModule = () => dispatch => {
  getFirebaseData('Review').then(result=>{
    let payload = []
    result.forEach(doc=>{
      payload.push({
        id : doc.id,
        data : doc.data()
      })
    })
    dispatch({
      type: DATA_RESULT,
      payload
    })
  })
}

const initalState = []

const firebaseData = (state = initalState, action) => {
  switch (action.type) {
    case DATA_RESULT:
      return {
        ...state,
        review: action.payload
      }
    default:
      return state
  }
}

export default firebaseData