import React from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setExcerpt, setContent, setPostID } from '../../../store/createPost/createPost.actions'
import { publishPost, uploadImageToStore, getUserInfo } from '../../../utils/api'
import { setImgObgectURL, setImgFile, setImgUrl, failCreatePost } from '../../../store/createPost/createPost.actions'
import { Editor } from 'react-draft-wysiwyg'
import { Button } from '../../../components/Button/Button'
import AddNewImage from '../AddNewImage'

const EditorConvertToHTML = () => {

  const dispatch = useDispatch()

  // values from state for the post image
  const file = useSelector(state => state.createPost.file)
  const imgUrl = useSelector(state => state.createPost.post.imgUrl)
  const objectUrl = useSelector(state => state.createPost.objectUrl)

  // values from state for the post text
  const titleValue = useSelector(state => state.createPost.post.title)
  const excerptValue = useSelector(state => state.createPost.post.excerpt)
  const editorState = useSelector(state => state.createPost.post.content)
  const postID = useSelector(state => state.createPost.postID) 

  // Onchange methods of input fields
  const onChangeTitleValue = e => dispatch(setTitle(e.target.value))
  const onChangeExcerptValue = e => dispatch(setExcerpt(e.target.value))
  const onEditorStateChange = editorState => dispatch(setContent(editorState))

  // Turns data construction into HTML markup
  const getHTMLPost = () => draftToHtml(convertToRaw(editorState.getCurrentContent()))

  // Publish the post whith a post image. First it uploads an image, and thas this link with other filds
  // set into document of the post collection 
  const handlePublishPost = async () => {
    try {
      const imgUrl = await uploadImageToStore(file, 'images')
      .then(url => {
        URL.revokeObjectURL(objectUrl)
    
        dispatch(setImgFile(null))
        dispatch(setImgObgectURL(null))
        dispatch(setImgUrl(url))
        return url
      })
  
      const postID = await publishPost('posts', titleValue, getHTMLPost(), excerptValue, imgUrl)

      dispatch(setPostID(postID))
      // console.log('RES PUBLISH POST', postID)
    } catch(error) {
      dispatch(failCreatePost(error.message))
    }
  }

  // remove this mathod
  const getUser = () => console.log(getUserInfo())

  return (
    <div>
      <div className="border p-10 mb-10">
        <label>
          Post title
          <input
            className="border p-2 m-4 block w-full"
            type="text"
            value={titleValue}
            onChange={onChangeTitleValue} 
          />
        </label>
        <label>
          Excerpt
          <textarea
            className="border p-2 m-4 block w-full"
            type="text"
            value={excerptValue}
            onChange={onChangeExcerptValue} 
          />
        </label>
        <AddNewImage imgUrl={imgUrl} objectUrl={objectUrl} />
      </div>

      <div className="border p-10">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>

      <br /><hr /><br />
      <textarea
        disabled
        value={getHTMLPost()}
      />
      <br /><hr /><br />
      {!postID && <Button color="dark" onClick={handlePublishPost}>Publish post</Button>}
      {postID && <div>
        <p>Post is Published. Post ID: <i>{postID}</i></p>
        <Button color="dark">Update</Button></div>
      }
      <br />
      {/* remove the button below */}
      <button onClick={getUser} >get user</button>
    </div>
  )
}

export default EditorConvertToHTML