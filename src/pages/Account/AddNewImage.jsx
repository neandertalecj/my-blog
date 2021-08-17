import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImageToStore } from '../../utils/api'
import { setImgObgectURL, setImgFile, setImgUrl } from '../../store/createPost/createPost.actions'

import { Button } from '../../components/Button/Button'
import { useEffect } from 'react'

const AddNewImage = ({ imgUrl, objectUrl }) => {
  const dispatch = useDispatch()
  // const file = useSelector(state => state.createPost.file)
  // const imgUrl = useSelector(state => state.createPost.post.imgUrl)
  // const objectUrl = useSelector(state => state.createPost.objectUrl)

  useEffect(() => {
    // ===================
    // move it to saga!!!!!
    // return () => URL.revokeObjectURL(objectUrl)
  }, [])

  // console.log('IMG URL = ', imgUrl)
  // console.log('IMG OBJECT URL = ', objectUrl)

  const handleChangeImage = e => {
    const imgFile = e.target.files[0]
    dispatch(setImgObgectURL(URL.createObjectURL(imgFile)))
    dispatch(setImgFile(imgFile))
  }
  
  // const handleUpload =  (e) => {//async
  //   e.preventDefault()

  //   uploadImageToStore(file, 'images') //await
  //     .then(url => {
  //       URL.revokeObjectURL(objectUrl)

  //       dispatch(setImgFile(null))
  //       dispatch(setImgObgectURL(null))
  //       dispatch(setImgUrl(url))
  //     })
  // }

  return (
    <div className="my-10">
      <h3>Add image</h3>
      <form 
      // onSubmit={handleUpload}
      >
        <input type="file" onChange={handleChangeImage} />

        {/* REMOVE BUTTON */}
        {/* <Button disabled={!file}>
          Upload image
        </Button> */}

      </form>
      {imgUrl && <img className='my-10' src={imgUrl} alt="" />}
      {!imgUrl && <img className='my-10' src={objectUrl} alt="" />}
    </div>
  )
}

export default AddNewImage