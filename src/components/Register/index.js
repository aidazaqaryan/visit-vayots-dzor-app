import React, { useState } from 'react'
import { Card, Button, Input } from '../Theme'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import axios from 'axios'

const Register = ({
    nav
}) => {
    const [user, setUser] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const history = useHistory()
    const createAccount = () => {
        if (user.password !== user.confirmPassword) {
            return alert('check your password')
        }
        axios
            .post(`http://localhost:3001/api/signup`, user)
            .then(data => {
                history.push('/login')
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
                    placeholder="E-Mail"
                    onChange={(e) => setUser({...user, email: e.target.value})}/>
                <Input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUser({...user, username: e.target.value})}/>
                <Input 
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setUser({...user, fullName: e.target.value})}/>
                <Input 
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setUser({...user, password: e.target.value})}/>
                <Input 
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                    onKeyUp={(e) => {if (e.keyCode === 13) createAccount()}}/>
                <Button 
                    style={{width: '100%'}}
                    className="mt-5"
                    onClick={() =>  createAccount()}>
                        Regiter
                </Button>
            </Card>
        </section>
    )
}

export default Register