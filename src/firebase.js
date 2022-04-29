import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtr33AT6NCRhLjtoOk50hZr1PmpVoOH9c",
  authDomain: "callenbatt-vue-voicechat.firebaseapp.com",
  projectId: "callenbatt-vue-voicechat",
  storageBucket: "callenbatt-vue-voicechat.appspot.com",
  messagingSenderId: "531335790812",
  appId: "1:531335790812:web:a0efefcc7895b1e1b33419",
  measurementId: "G-ZY6R6BQZVL",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
