import React, { useState, useEffect } from 'react'
// import { Link, useHistory } from 'react-router-dom'
import {  Button, Card, Input } from '../Theme'
import Activities from '../Activities'
import styles from './index.module.scss'

import axios from 'axios'

const Account = ({
    nav,
    updateUser
}) => {

    const [activities, setActivities] = useState(null)

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

    const getActivity = () => {
        axios
            .get('http://localhost:3001/api/activities')
            .then(response => setActivities(response.data.activities))
            .catch(console.log)
    }

    useEffect(() => {
        getActivity()
    }, [])
    return (
        <section className={styles.section}>
            <Button 
                icon="black/menu"
                onClick={() => nav.toggle(!nav.open)}
                white/>
            <img 
                src="/images/account.jpg"
                alt="account page cover"
                width="100%"/>
            <Card>
                {nav.user && 
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
                                    width="100%"
                                    height="20%"/>
                            ) : (
                                <img 
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                    className={styles.avatar}
                                    alt="user avatar"
                                    width="100%" />
                            )}
                        </label>
                        <div className={`${styles.card} mt-5`}>
                            <div>
                                <h1 className="text-center"> {nav.user.username} </h1>
                                <p className="text-center"> {nav.user.fullName} </p>
                                { nav.user.aboutMe && <p className="text-center"> {nav.user.aboutMe} </p> }
                                {nav.user.interests && <p className="text-center"> {nav.user.interests} </p>}
                            </div>
                        </div>
                        <hr/>
                        {activities && activities.map((activity, i) => (
                            <div  key={`activity-${i}`}>
                                {activity.creator === nav.user._id &&
                                    <Activities 
                                        activity ={activity}
                                        nav={{user: nav.user}}/>
                                }
                            </div>
                        ))} 
                    </div>
                }
            </Card>
        </section>
    )
}
export default Account