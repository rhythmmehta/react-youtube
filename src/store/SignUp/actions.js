import * as firebase from "firebase";


export const SIGN_UP_SUCCESS='SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE='SIGN_UP_FAILURE';
export const EMAIL_VERIFY='EMAIL_VERIFY';

export function signUpSuccess(){
    return{
        type: SIGN_UP_SUCCESS,
        message: 'Signed up Successfully'
    }
}
export function signUpFailure(error){
    return{
        type: SIGN_UP_FAILURE,
        message: error
    }
}
export function emailVerify(){
    return{
        type: EMAIL_VERIFY,
        message: 'Email verification Sent'
    }
}
export function signUp(email,password,confirm){
    return async (dispatch, getState) => {
        if(password===confirm){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            dispatch(signUpSuccess());
            firebase.auth().currentUser.sendEmailVerification().then(function() {
     dispatch(emailVerify());
       alert('Email Verification Sent!');

     });
        }).catch(function(error) {

               var errorCode = error.code;
               var errorMessage = error.message;
              dispatch(signUpFailure(errorMessage));
               if (errorCode === 'auth/weak-password') {
                 alert('The password is too weak.');
               } else {
                 alert(errorMessage);
             }

               console.log(error);
               alert(error.message);
             });

           }
           else{
               alert('Passwords donot match');
           }

    }
}
