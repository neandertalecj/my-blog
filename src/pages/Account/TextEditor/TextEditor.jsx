import React from 'react'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setExcerpt, setContent, resetForm, updatePostAction, startCreatePost } from '../../../store/createPost/createPost.actions'
import { getUserInfo } from '../../../utils/api'
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
  const error = useSelector(state => state.createPost.error)
  const isLoading = useSelector(state => state.createPost.isLoading)
  const published = useSelector(state => state.createPost.published)

  // Onchange methods of input fields
  const onChangeTitleValue = e => dispatch(setTitle(e.target.value))
  const onChangeExcerptValue = e => dispatch(setExcerpt(e.target.value))
  const onEditorStateChange = editorState => dispatch(setContent(editorState))

  // Turns data construction into HTML markup
  const getHTMLPost = () => draftToHtml(convertToRaw(editorState.getCurrentContent()))

  // Publish the post whith a post image. First it uploads an image, and thas this link with other filds
  // set into document of the post collection. All operatiom will make a saga
  const handlePublishPost =  () => {//async
    dispatch(startCreatePost({
      file,
      placeIMG: 'images',
      objectUrl,
      placePost: 'posts',
      titleValue,
      content: getHTMLPost(),
      excerptValue,
    }))
  }

    // Update the published post whith a post image. First it uploads an image, and thas this link with other filds
  // thet we want to change in  document of the post collection by ID
  const handleUpdatePost =  () => {//async
    dispatch(updatePostAction({
      postID,
      file,
      placeIMG: 'images',
      objectUrl,
      placePost: 'posts',
      titleValue,
      content: getHTMLPost(),
      excerptValue,
      imgUrl
    }))
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
      
      {!postID && <Button 
        disabled={isLoading}
        color="dark"
        onClick={handlePublishPost}
        className="disabled:opacity-60"
      >Publish post</Button>}

      {error && <div className="text-red-700">{error}</div>}

      {postID && <div>
        <p>{`Post is ${published}. Post ID`}: <i>{postID}</i></p>
        <Button
          disabled={isLoading}
          color="dark"
          onClick={handleUpdatePost}
          className="disabled:opacity-60"
        >Update</Button></div>
      }

      <br /><br />
      <Button color="danger" onClick={() => dispatch(resetForm())}>Reset form</Button>
      <br /><br />
      {/* remove the button below */}
      <Button onClick={getUser} >get user</Button>
      <br /><br />
    </div>
  )
}

export default EditorConvertToHTML