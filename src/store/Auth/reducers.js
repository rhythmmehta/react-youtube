import {
AUTH_OPEN,
AUTH_LOGIN_SUCCESS,
AUTH_LOGIN_FAILURE,
AUTH_LOGOUT,
PASSWORD_RESET
} from './actions';



export function auth( state= {
  username: null,
  uid: null,
  status: 'AUTH_ANONYMOUS',
  forgot: false
},action){
  switch (action.type) {
    case AUTH_OPEN:
        return Object.assign({}, state,{
        status: action.status ,
        username: 'guest',
        uid: null,
        forgot: false
    })
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
          status: action.status,
          username: action.username,
          uid: action.uid,
          forgot: false

      })
      case AUTH_LOGIN_FAILURE:
        return Object.assign({}, state, {
            status: action.status,
            username: 'guest',
            uid: null,
            forgot: false

        })
    case AUTH_LOGOUT:
        return Object.assign({}, state,{
        status: action.status,
        username: 'guest',
        uid: null,
        forgot: false
    })
    case PASSWORD_RESET:
        return Object.assign({}, state,{
        status: action.status ,
        username: 'guest',
        uid: null,
        forgot: true
    })
    default:
      return state;
  }
};
