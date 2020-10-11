import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'

import Home from '../Home'
import Login from '../Login'
import Account from '../Account'
import Register from '../Register'
import Activity from '../Activity'
import ActivityCreate from '../ActivityCreate'
import Settings from '../Settings'
import ImageUpload from '../ImageUpload'
import Chat from '../Chat'
import Theme from '../Theme'
import styles from './index.module.scss'

const withRouter = Component => ({...props}) => (
    <BrowserRouter>
        <Component {...props}/>
    </BrowserRouter>
)

const ROUTES = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/register', component: Register, name: 'Register' },
    { path: '/chat', component: Chat, name: 'Chat' },
    { path: '/user', component: Account, name: 'Account' },
    { path: '/settings', component: Settings, name: 'Settings' },
    { path: '/user', component: Account, name: 'ActivityCreate' },
    { path: '/theme', component: Theme, name: 'Theme' },
]

const App = () => {
    const [user, setUser] = useState(null)
    const [open, toggle] = useState(false)
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        toggle(false)
    }, [location])

    const getUser = () => {
        axios
            .get(`http://localhost:3001/api/user`, {headers: {'Authorization': localStorage.token}})
            .then(response => {
                localStorage.setItem('user', response.data.user)
                setUser(response.data.user)
            })
            .catch(console.log)
    }

    const updateUser = (user) => {
        axios
            .put(`http://localhost:3001/api/user`, user, {headers: {'Authorization': localStorage.token}})
            .then(() => getUser())
            .catch(console.log)
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)

        if (location.pathname !== '/') {
            history.push('/')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()
        }
    }, [])
    return (
        <div className={styles.app}>
            {/* <Navigation
                routes={ROUTES}
                nav={{open, toggle, user}}/> */}
            <nav 
                className={styles.nav}
                data-open={open}>
                <ul>
                    <li>
                        <Link to='/' >
                            Home 
                        </Link>
                    </li>
                    {user ? ([
                        <li key="user-chat">
                            <Link to='/chat'>
                               Chat
                            </Link>
                        </li>,
                        <li key="your-account">
                            <Link to='/user' >
                                Account
                            </Link>
                        </li>,
                        <li key="user-setting">
                            <Link to='/settings'>
                               Setting
                            </Link>
                        </li>,
                        <li key="logout">
                            <a 
                                href="#"
                                onClick={logout}>
                                    Logout
                            </a>
                        </li>
                    ]) : ([
                        <li key="sign-in">
                            <Link to='/login' >
                                Login
                            </Link>
                        </li>,
                        <li key="sign-up">
                            <Link to='/register'>
                                Register
                            </Link>
                        </li>
                    ])}
                </ul>
                {/* <Link to="/create-activity"> </Link> */}
                {/* <Link to="/create-activity"> </Link> */}
            </nav>
            <main 
                className={styles.main}
                data-open={open}>
                    <Switch>
                        {ROUTES.map(route => (
                            <Route 
                                path={route.path}
                                key={`route-${route.path}`}
                                exact>
                                    <route.component
                                        nav={{toggle, open, user}}
                                        getUser={getUser}
                                        updateUser={updateUser}/>
                            </Route>
                        ))}
                        <Route path='/activities/:id'> 
                            <Activity nav={{toggle, open, user}}/>
                        </Route>
                        <Route path='/upload-image/:id'> 
                            <ImageUpload/>
                        </Route>
                        <Route path='/create-activty/:lng/:lat'> 
                            <ActivityCreate />
                        </Route>
                    </Switch>
            </main>
        </div>
    )
}

export default withRouter(App)