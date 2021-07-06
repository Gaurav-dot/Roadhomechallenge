import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDvN1eu-1JbLG57WfCt7dTSKkv_KD9MdRc",
    authDomain: "roamhome-5b92b.firebaseapp.com",
    databaseURL: "https://roamhome-5b92b-default-rtdb.firebaseio.com",
    projectId: "roamhome-5b92b",
    storageBucket: "roamhome-5b92b.appspot.com",
    messagingSenderId: "278641725692",
    appId: "1:278641725692:web:9999d4f1f404c25d3d4779",
    measurementId: "G-XHR9YHM9SX"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
