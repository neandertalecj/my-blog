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

  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  if (!post || isLoading) return <Container><SpinnerContainer><Spinner className="h-12" /></SpinnerContainer></Container>

  return (
    <Container>
      {error && <div className="text-red-300 mb-2 relative"><ErrorIcon />{error}</div>}
      <img src={post.imgUrl} alt='' />{/* alt={post.alt} */}
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post && post.content}}></div>
      <hr />
       <span>{post.auth}</span>
      <span>{new Date(post.createdAt.seconds).toLocaleDateString()}</span>
    </Container>
  )
}

export default Post