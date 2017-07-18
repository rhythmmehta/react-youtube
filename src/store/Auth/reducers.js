import {
AUTH_OPEN,
AUTH_LOGIN_SUCCESS,
AUTH_LOGIN_FAILURE,
AUTH_LOGOUT
} from './actions';



export function auth( state= {
  username: null,
  uid: null,
  status: 'AUTH_ANONYMOUS'
},action){
  switch (action.type) {
    case AUTH_OPEN:
        return Object.assign({}, state,{
        status: action.status ,
        username: 'guest',
        uid: null
    })
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
          status: action.status,
          username: action.username,
          uid: action.uid

      })
      case AUTH_LOGIN_FAILURE:
        return Object.assign({}, state, {
            status: action.status,
            username: 'guest',
            uid: null

        })
    case AUTH_LOGOUT:
        return Object.assign({}, state,{
        status: action.status,
        username: 'guest',
        uid: null
    })
    default:
      return state;
  }
};
