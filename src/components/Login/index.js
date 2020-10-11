import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import UserAccount from './Account'
import axios from 'axios'
import { Card, Button, Input } from '../Theme'
import styles from './index.module.scss'

const Login = ({
    nav,
    getUser
}) => {
    // const [account, setAccount]  = useState(false)
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const history = useHistory()
    const signIn = () => {
        axios.post('http://localhost:3001/api/login', user)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            getUser()
            history.push('/')
        })
        .catch(console.log)
    }
    return (
        <section className={styles.section}>
            <Button 
                icon="black/menu"
                onClick={() => nav.toggle(!nav.open)}
                white/>
            <img 
                src="/images/cover.jpg"
                alt="login page cover"
                width="100%"/>
            <Card>
                <h2 className="text-center">Explore Vayots <br/>Dzor With Us</h2>
                <Input 
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUser({...user, username: e.target.value})}/>
                <Input 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    onKeyUp={(e) => {if (e.keyCode === 13) signIn()}}/>
                <Button 
                    style={{width: '100%'}}
                    className="mt-5"
                    onClick={() => signIn()}>
                        Sign In
                </Button>
                <a href="https://www.facebook.com/v5.0/dialog/oauth?client_id=2449258651954131&redirect_uri=http://localhost:3000&scope=email,public_profile">
                    <Button 
                        style={{width: '100%'}}
                        className="mt-5">
                            Login with Facebook
                    </Button>
                </a>
            </Card>
        </section>
    )
}

export default Login