import React from 'react'
import { useDispatch } from 'react-redux'
import { setImgObgectURL, setImgFile, setImgUrl } from '../../store/createPost/createPost.actions'

const AddNewImage = ({ imgUrl, objectUrl }) => {
  const dispatch = useDispatch()

  const handleChangeImage = e => {
    const imgFile = e.target.files[0]
    dispatch(setImgObgectURL(URL.createObjectURL(imgFile))) // create a local image URL  
    dispatch(setImgFile(imgFile)) // set an image file into the store
    dispatch(setImgUrl(''))      // In case of updating the existig image post, remove old the image link in the store
  }

  return (
    <div className="my-10">
      <h3>Add image</h3>
      <form>
        <input type="file" onChange={handleChangeImage} />
      </form>
      {imgUrl && <img className='my-10' src={imgUrl} alt="" />}
      {!imgUrl && <img className='my-10' src={objectUrl} alt="" />}
    </div>
  )
}

export default AddNewImage