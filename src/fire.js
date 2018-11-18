import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDOwKViN5S-0sL9P6yQzxblvPtano3-a6U",
  authDomain: "chat-e8b23.firebaseapp.com",
  databaseURL: "https://chat-e8b23.firebaseio.com",
  projectId: "chat-e8b23",
  storageBucket: "chat-e8b23.appspot.com",
  messagingSenderId: "211022746267"
};

const fire = firebase.initializeApp(config)

export default fire

