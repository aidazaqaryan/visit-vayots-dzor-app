/* eslint-disable */
import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import axios from 'axios' 
import { Button, Input, Card} from '../Theme'
import styles from './index.module.scss'

const Settings = ({
    nav, 
    updateUser 
}) => {
    const [userInfo, setUserInfo] = useState([])
    const [input, setInput] = useState({
        username: false,
        fullName: false,
        aboutMe: false,
        interests: false
    })

    const onImageUpload = (e) => {
        const data = new FormData()
        data.append('image', e.target.files[0])
        axios
            .post(`http://localhost:3001/api/image`, data, {headers: {'Authorization': localStorage.token}})
            .then(response => {
                updateUser({ avatar: response.data.file.path })
            })
            .catch(console.log)
    }
    useEffect(() => {
        setUserInfo(nav.user)
    }, [nav.user]) 
    return( 
        <div>
            {nav.user && 
        <section className={styles.section}>
             <Button 
                icon="black/menu"
                onClick={() => nav.toggle(!nav.open)}
                white/>
                <Card>
                    <div>
                        <label>
                            <Input 
                                type="file"
                                onChange={onImageUpload}
                                none/>
                            {nav.user.avatar ? (
                                <img 
                                src={`http://localhost:3001/${nav.user.avatar}`}
                                className={styles.avatar}
                                alt="user avatar"
                                width="100%"/>
                                ) : (
                                    <img 
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                    className={styles.avatar}
                                    alt="user avatar"
                                    width="100%"/>
                                    )}
                        </label>
                    <div>
                        <h3> Username </h3>
                        <div className="justify-content-between">
                            {input.username ? (
                                <Input 
                                    type="text" 
                                    value={userInfo.username} 
                                    onChange={(e) => setUserInfo({...userInfo, username: e.target.value})} 
                                    />
                                ) : <p> { nav.user.username }  </p>
                            }
                            <Button 
                                secondary
                                onClick={() => {
                                    setInput({...input, username: true})
                                    if(input.username) setInput({...input, username: false}), updateUser(userInfo)
                                }}> 
                                { input.username ? 'save' : 'edit' } 
                            </Button>
                        </div>
                        <h3> Full Name </h3>
                        <div className="justify-content-between">
                            {input.fullName ? (
                                <Input 
                                type="text" 
                                value={userInfo.fullName} 
                                onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})} />
                                ) : <p> {nav.user.fullName} </p>
                            }
                            <Button 
                                secondary
                                onClick={() => {
                                    setInput({...input, fullName: true})
                                    if(input.fullName) setInput({...input, fullName: false}), updateUser(userInfo)
                                }}> 
                                { input.fullName ? 'save' : 'edit' }
                            </Button>
                        </div>
                        <h3> Email </h3>
                        <p> {nav.user.email} </p>
                        <h3> About me </h3>
                        <div>
                            {nav.user.aboutMe ? (
                                <div className="justify-content-between">
                                    {input.aboutMe ? (
                                        <textarea 
                                            type="text" 
                                            value={userInfo.aboutMe} 
                                            className="form-control mr-3"
                                            onChange={(e) => setUserInfo({...userInfo, aboutMe: e.target.value})} 
                                            >
                                            </textarea>
                                        ) : <p> { nav.user.aboutMe } </p>
                                    }
                                    <Button 
                                        secondary
                                        style={{height: 40}} 
                                        onClick={() => {
                                            setInput({...input, aboutMe: true})
                                            if(input.aboutMe) setInput({...input, aboutMe: false}), updateUser(userInfo)
                                        }}> 
                                        { input.aboutMe ? 'save' : 'edit' }
                                    </Button>
                                </div>
                                ) : <Button 
                                onClick={() => {
                                    nav.user.aboutMe = ' '
                                    setInput({...input, aboutMe: true})
                                    if(input.interests) setInput({...input, aboutMe: false}), updateUser(userInfo)
                                }}> 
                                        Add 
                                    </Button> 
                            }
                        </div>
                        <h3> Interests </h3>
                        <div>
                            {nav.user.interests  ? (
                                <div className="justify-content-between">
                                    {input.interests ? (
                                        <Input 
                                            type="text" 
                                            value={userInfo.interests} 
                                            className="form-control mr-3"
                                            onChange={(e) => setUserInfo({...userInfo, interests: e.target.value})} 
                                            />
                                            ) : <p> { nav.user.interests } </p>
                                    }
                                    <Button 
                                        secondary
                                        className="btn btn-primary" 
                                        onClick={() => {
                                            setInput({...input, interests: true})
                                            if(input.interests) setInput({...input, interests: false}), updateUser(userInfo)
                                        }}> 
                                        { input.interests ? 'save' : 'edit' } 
                                    </Button>
                                </div> 
                            ) : <Button 
                            className="btn btn-primary"
                            onClick={() => {
                                nav.user.interests = ' '
                                setInput({...input, interests: true})
                                if(input.interests) setInput({...input, interests: false}), updateUser(userInfo)
                            }}> 
                                Add 
                            </Button> 
                        }
                        </div>
                    </div>
                </div>
            </Card>
        </section>
        }
    </div>
    )
}
export default Settings