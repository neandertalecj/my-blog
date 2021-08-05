import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../components/Container'
import { Spinner, SpinnerContainer } from '../../components/Spinner'
import { CardPage } from '../../components/Card/Card'
import { getPosts } from '../../store/blog/blog.actions'
import { ErrorIcon } from '../../components/FieldFormik'



const Blog = () => {
  const isLoading = useSelector(state => state.posts.isLoading)
  const posts = useSelector(state => state.posts.posts)
  const error = useSelector(state => state.posts.error)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  if (!posts || isLoading) return <Container><SpinnerContainer><Spinner className="h-12" /></SpinnerContainer></Container>

  return (
    <Container>
      <h1 className="mb-5">Blog</h1>
      {error && <div className="text-red-300 mb-2 relative"><ErrorIcon />{error}</div>}
      <CardPage posts={posts} />
    </Container>
  )
}

export default Blog
