import * as firebase from "firebase";
let firebaseConfig= {
    apiKey: "AIzaSyBEYwLspWM4R4P8tpO_VkWTyBe86LIeHt0",
    authDomain: "react-firebase-abcf0.firebaseapp.com",
    databaseURL: "https://react-firebase-abcf0.firebaseio.com",
    projectId: "react-firebase-abcf0",
    storageBucket: "react-firebase-abcf0.appspot.com",
    messagingSenderId: "453040114149"
}
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
//export const database = firebase.database();
