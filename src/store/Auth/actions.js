import * as firebase from "firebase";
import { auth } from "../../firebaseApp"
import { clearSearchDetails } from "../Search/actions";

export const AUTH_OPEN='AUTH_OPEN';
export const AUTH_LOGIN_SUCCESS='AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE='AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT='AUTH_LOGOUT';

export function open_Auth() {
    return {
        type: AUTH_OPEN,
        status: 'AUTH_AWAITING_RESPONSE'
    }
}

export function loginSuccess(u_name,u_id) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        status: 'AUTH_LOGGED_IN',
        username: u_name,
        uid: u_id

    }
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE,
        status: 'AUTH_LOGIN_FAILED'

    }
}

export function logout() {
    return {
        type: AUTH_LOGIN_FAILURE,
        status: 'AUTH_ANONYMOUS'
    }
}



export function googleAuth() {
    return async (dispatch, getState) => {
  dispatch(open_Auth());
  if (auth.onAuthStateChanged) {

       auth.signOut();

     }
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(function(result) {
      if(result){
      let token = result.credential.accessToken;
      let user = result.user;
       dispatch(loginSuccess(user.displayName,user.uid));
   }
}).catch(error => {
    dispatch(loginFailure());
    dispatch(logout());
  });
}
}
 export function login(email,password){
    return async (dispatch, getState) => {
        dispatch(open_Auth());
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
         if(result){
         let user = result.uid;
          dispatch(loginSuccess(email,user));
      }
   }).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            console.log('Wrong password.');
            alert('Incorrect Password');
          } else {
            console.log(errorMessage);
            alert('Incorrect Password');
          }
 })
 }
 }
export function logoutUser(){
     return async (dispatch, getState) => {
  dispatch(logout());
  dispatch(clearSearchDetails());
  auth.signOut();
}
}

export const PASSWORD_RESET='PASSWORD_RESET';
export function passwordReset(){
    return{
        type: PASSWORD_RESET,
        status: 'AUTH_ANONYMOUS',
        forgot: true
    }
}
export function getPasswordReset(email){
    return async (dispatch, getState) => {
 dispatch(passwordReset());
 firebase.auth().sendPasswordResetEmail(email).then(()=> {

         alert('Password Reset Email Sent!');

       }).catch(function(error) {

         var errorCode = error.code;
         var errorMessage = error.message;

         if (errorCode == 'auth/invalid-email') {
           alert(errorMessage);
         } else if (errorCode == 'auth/user-not-found') {
           alert(errorMessage);
         }
         console.log(error);

       });
}
}
