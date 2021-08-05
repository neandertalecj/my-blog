// import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from '../../components/Container'

const Home = () => {

  // const loginStatus = useSelector(state => console.log(state))
  return (
    <Container>
      <h1>Home</h1>
      <Link to={'/blog'}>
        Open blog
      </Link>
    </Container>
  )
}

export default Home