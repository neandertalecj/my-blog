import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { firebaseConfig } from './firebase'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export const registerUser = ({ email, password,
  firsName='', secondName='', userName='', }) => {

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      db.collection('users').doc(cred.user.uid)
        .set({
          firsName,
          secondName,
          userName,
        })
      return cred
    })
    .catch((error) => Promise.reject(error));
}

export const loginUser = ({ email, password }) => {

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => user)
    .catch((error) => Promise.reject(error))
}

export const logoutUser = () => {
  return firebase
    .auth()
    .signOut()
    .then(function (data) {
      // Sign-out successful.
    })
    .catch((error) => {
      Promise.reject(error)})
}


// Posts

export const fetchPosts = () => {
  const db = firebase.firestore()

  return db.collection('posts')
    .get()
    .then(snapshop => snapshop.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    .catch((error) => Promise.reject(error))
}


export const fetchPost = id => {
  const db = firebase.firestore()
  
  return db.collection('posts')
    .where('title', '==', id)
    .get()
    .then(doc => doc.docs[0].data())
    .catch((error) => Promise.reject(error))
}