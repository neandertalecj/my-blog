// Outdated configuration from turtorial
// export const firebaseConfig = {
//   apiKey: 'AIzaSyAtkq6eISEeD5EmvIVqGE3PTeLLPvt1hy4',
//   authDomain: 'redux-saga-learning-2f466.firebaseapp.com',
//   databaseURL: 'https://redux-saga-learning-2f466.firebaseio.com',
//   projectId: 'redux-saga-learning-2f466',
//   storageBucket: 'redux-saga-learning-2f466.appspot.com',
//   messagingSenderId: '1004089938686',
//   appId: '1:1004089938686:web:7963a1df14194338428baf',
// }


  // Web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  }
