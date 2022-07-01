const LOGIN_USER = 'enteruser/LOGIN_USER'

export const loginUserModule = (user) => ({
  type: LOGIN_USER,
  user: user
})

const initalState = {
  user: null,
}

const enteruser = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}

export default enteruser
