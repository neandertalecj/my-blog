import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const withAuthRedirect = WrappedComponent => {
    
    const RedirectComponent = props => {
        const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

        if (isLoggedIn) return <Redirect to='/' />

        return <WrappedComponent {...props}/>
    }

    return RedirectComponent
}
