import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCG3Cz7Yknj-9KeY9NdRQl2je-l6gSNEqc",
  authDomain: "mytodo-89c6b.firebaseapp.com",
  databaseURL: "https://mytodo-89c6b.firebaseio.com",
  projectId: "mytodo-89c6b",
  storageBucket: "mytodo-89c6b.appspot.com",
  messagingSenderId: "448845162840"
};
firebase.initializeApp(config);

const database = firebase.database();

export { database };
