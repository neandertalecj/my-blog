import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import { firebaseConfig } from './firebase'

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage() // for upload images

export const db = firebase.firestore()

/** Registation of a new user
*
* @returns {Promise} A credential of the registered user
*/

export const registerUser = ({ 
  email,
  password,
  firsName='',
  secondName='',
  userName='', }) => {

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    //!!!!!! https://docs.divjoy.com/adding-extra-fields-to-your-authentication-form
    // .then(handleAuth)
    // .then(() => {
    //   return updateProfile(otherFields);
    // })
    .then(cred => {
      db.collection('users').doc(cred.user.uid)
        .set({
          firsName,
          secondName,   //WHERE ARE THESE DATA IN DB !!!!!!
          userName,
        })
      return cred
    })
    .catch((error) => Promise.reject(error));
}

/** Login a user 
 * @return {Promise} user data
*/

export const loginUser = ({ email, password }) => {

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => user)
    .catch((error) => Promise.reject(error))
}

/** Login a user 
 * @return {Promise} an error if logout fail
*/

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


/**  Fetch Posts
 * @return {Promise} An Array of posts
*/

export const fetchPosts = () => {
  const db = firebase.firestore()

  return db.collection('posts')
    .get()
    .then(snapshop => snapshop.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    .catch((error) => Promise.reject(error))
}

/**  Fetch a Post by ID
 * @param {string} id The id of the current post 
 * @return {Promise} An single posts
*/

export const fetchPost = id => {
  const db = firebase.firestore()
  
  return db.collection('posts')
    .where('title', '==', id)
    .get()
    .then(doc => doc.docs[0].data())
    .catch((error) => Promise.reject(error))
}


/**
* Upload image into DB
*
* @author neandertalecj
* @param {file} file A file of image
* @param {string} place A collection in DB for a current images
* @return {Promise} A promise object represents whith url of the uploaded image
*/

export const uploadImageToStore = (file, place) => { //async
  return new Promise((resolve, reject) => {
    const ref = storage.ref(`/${place}/${file.name}`)//images
    const uploadTask = ref.put(file)

    uploadTask.on(
      "state_changed",
      null, 
      function error(err) {
        console.log(`Error. Puttimg image into ${place}`, err)
        reject()
      }, 
      function complete() {
        ref
          .getDownloadURL()
          .then(url => resolve(url))
      }
    )
  })
}

/**
* Publish post
*
* @author neandertalecj
* @param {string} place A collection in DB for a current images
* @param {string} title A title of A Post
* @param {string} content The post's content whit HTML markup
* @return {Promise} A promise object represents success or fail for a publish post operation
*/

export const publishPost = (
  place,
  title,
  content,
  excerpt,
  imgUrl='') => {
  return new Promise((resolve, reject) => {
    var batch = db.batch()

    const postRef = db.collection(place).doc()
    batch.set(postRef, {
      title,
      content,
      excerpt,
      imgUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      auth: getUserInfo().displayName,
    })

    batch.commit()
    .then(() => resolve(postRef.id))
    .catch(err =>  reject(err))
  })
}

/**
* Get user information
*
* @author neandertalecj
* @return {Object} Information about a current user when the user is authorized
*/

export const getUserInfo = () => {
  const user = firebase.auth().currentUser
  
  return {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    uid: user.uid,
  }
}