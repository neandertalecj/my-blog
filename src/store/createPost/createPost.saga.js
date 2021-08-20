import { all, put, takeEvery } from 'redux-saga/effects'
import { START_CREATE_POST, START_UPDATE_POST, succesCreatePost, succesUpdatePost, failCreatePost, failUpdatePost,
          setPostID, 
        } from './createPost.actions'
import { publishPost, uploadImageToStore, updatePost } from '../../utils/api'

function* createPostWorker({ payload: {
    file,
    placeIMG,
    objectUrl,
    placePost,
    titleValue,
    content,
    excerptValue,
  }
}) {
  try {
    // Download an image into the firestore and return an image URL
    const imgUrl = yield uploadImageToStore(file, placeIMG)
      .then(url => {
        URL.revokeObjectURL(objectUrl) // It revokes link of the blob image when we have uploaded the image
        return url
      })

    yield put(succesCreatePost(imgUrl))

    // Publish a post with the image URL that was retrieved in previous operation
    const postID = yield publishPost(placePost, titleValue, content, excerptValue, imgUrl)
    yield put(setPostID(postID))

  } catch (error) {
    yield put(failCreatePost(error.message))
  }
}

function* updatePostWorker({ payload: {
    postID,
    file,         // null or file
    placeIMG,     // a name collection of images
    objectUrl,    // null or blob
    placePost,    // a name colection of post
    titleValue,
    content,
    excerptValue,
    imgUrl,       // Or the it is the old url or its value is an ampty string and file and objectUrl props are not a null
  }
}) {
  try {
    let currentImgUrl = '' // an default image URL

    // Upload an image into the firestore and return an image URL if we set a new one in another case we skip this step
    if (file !== null){
      yield uploadImageToStore(file, placeIMG)
        .then(url => {
          URL.revokeObjectURL(objectUrl) // It revokes link to the blob image when we have uploaded an image
          currentImgUrl = url
          console.log('NEW AN IMAGE URL', url)
        })

      yield put(succesUpdatePost(currentImgUrl))
    } else {
      yield put(succesUpdatePost(imgUrl)) // Sending the ald url
    }

    // Update the existion post. If we change the image we set a new URL that was retrieved in previous operation
    // or if we doesn change the image we send as the URL an emty string
    yield updatePost(postID, placePost, titleValue, content, excerptValue, currentImgUrl)

  } catch (error) {
    yield put(failUpdatePost(error.message))
  }
}

function* createPostFlow() {
  yield takeEvery(START_CREATE_POST, createPostWorker)
}

function* updatePostFlow() {
  yield takeEvery(START_UPDATE_POST, updatePostWorker)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    createPostFlow(),
    updatePostFlow(),
  ])
}