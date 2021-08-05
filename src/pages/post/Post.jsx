import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { getPost } from '../../store/post/post.actions'
import { Container } from '../../components/Container'
import { Spinner, SpinnerContainer } from '../../components/Spinner'
import { ErrorIcon } from '../../components/FieldFormik'

const Post = () => {
  let { id } = useParams()
  const isLoading = useSelector(state => state.post.isLoading)
  const post = useSelector(state => state.post.post)
  const error = useSelector(state => state.post.error)
  const dispatch = useDispatch()

  // if (post) { const { title, text, author, date, imgUrl, alt, shortText } = post}
  // console.log('POST', post)

  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  if (!post || isLoading) return <Container><SpinnerContainer><Spinner className="h-12" /></SpinnerContainer></Container>

  return (
    <Container>
      {error && <div className="text-red-300 mb-2 relative"><ErrorIcon />{error}</div>}
      <img src={post.imgUrl} alt={post.alt} />
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <hr />
      <span>{post.author}</span>
      <span> {post.date}</span>
    </Container>
  )
}

export default Post