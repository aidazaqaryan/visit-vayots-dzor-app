import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import moment from'moment'
import axios from 'axios'
import { Input, Button, Card } from '../Theme'
import styles from './index.module.scss'

const Chat = ({ nav }) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [socket, setSocket] = useState(null)

    const initSockets = () => {
        const socket = io.connect('http://localhost:3001')
        socket.on('new message', (data) => setMessages(messages => [data, ...messages]))
        setSocket(socket)
    }

    const getMessages = () => {
        axios.get(`http://localhost:3001/api/messages`, {headers: {'Authorization': localStorage.token}})
            .then(response => {
                setMessages(response.data.message)
            })
            .catch(console.log)
    }
   
    const addMessages = () => {
        axios
            .post(`http://localhost:3001/api/messages`, {message}, {headers: {'Authorization': localStorage.token}})
            .then(response => {
                console.log(response.data)
            })
            .catch(console.log)
    }
    const submit = () => {
        socket.emit('message', { message:message, userId: nav.user._id })
        setMessage('')
        addMessages()
    }
    const deleteMeddage = (id, userId) => {
        console.log(id)
        axios
            .delete(`http://localhost:3001/api/messages?messageId=${id}&userId=${userId}`, {headers: {'Authorization': localStorage.token}})
            .then(() => setMessages(messages.filter(message => message._id.indexOf(id) === -1)))
            .catch(console.log)
    }
    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            submit()
        }
    }
    useEffect(() => {
        getMessages()
        initSockets()
    }, [])
    useEffect(() => {
        getMessages()
    }, [message])

    return (
        <section className={styles.section}>
            <Button 
                icon="black/menu"
                onClick={() => nav.toggle(!nav.open)}
                white/>
            <img 
                src="/images/background.jpg"
                alt="login page cover"
                width="100%"/>
                <div className={styles.title}>
                    <h1 className="text-center"> Welcome to our chat</h1>
                    <div>
                        <Input 
                            placeholder="New Message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="mt-1"
                            onKeyUp={onKeyUp}/>
                        <Button 
                            icon="black/send"
                            className={`ml-2 mt-1 ${styles.send}`}
                            onClick={submit}
                            white/>
                    </div>
                </div>
                <Card className={`p-1 mt-4 ${styles.card}`}>
                    {messages.map((oneMessage, i) => (
                        <div 
                            key={`message-${i}`}
                            className={oneMessage.userId._id === nav.user._id ? styles.left: styles.right}>
                                {/* <div className={styles.small}>
                                    <small>{moment(oneMessage.createdAt).fromNow()}</small>
                                </div> */}
                            {oneMessage.userId ?
                                <img 
                                    src={ oneMessage.userId.avatar ? `http://localhost:3001/${oneMessage.userId.avatar}` :
                                    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                                    alt="user avatar"
                                    width="100%"
                                    className={`${styles.image} mt-2 ml-3`}/> : 
                                <img 
                                    src={ nav.user.avatar ? `http://localhost:3001/${nav.user.avatar}` : 
                                    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                                    alt="user avatar"
                                    width="100%"
                                    className={`${styles.image} mt-2 ml-3`}/>
                            }
                            <div className="justify-content-between">
                                <div className="ml-4">
                                    <small> { oneMessage.userId ? oneMessage.userId.username : nav.user.username} </small>
                                    <p className="mt-0"> {oneMessage.message}</p>
                                </div>
                                { oneMessage.userId._id === nav.user._id && 
                                    <div>
                                        <Button 
                                            icon="black/close"
                                            className={`mt-1 mr-1`}
                                            onClick={() => deleteMeddage(oneMessage._id, nav.user._id)}
                                            white/>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </Card>
        </section>
    )
}

export default Chat