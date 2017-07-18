import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    EMAIL_VERIFY
} from './actions';

export function signup(state = {
    message: ' ',
}, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
         message: action.message
      })
    case  SIGN_UP_FAILURE :
      return Object.assign({}, state, {
          message: action.message
      })
      case  EMAIL_VERIFY :
        return Object.assign({}, state, {
            message: action.message
        })
    default:
      return state
  }
}
