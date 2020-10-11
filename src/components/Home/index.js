import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Button, Input } from '../Theme'
import styles from './index.module.scss'
import Map from '../Map'
import Activities from '../Activities'
import axios from 'axios'

const Home = ({
    nav, 
    getUser
}) => {

    const [activities, setActivities] = useState(null)
    const [keyword, setKeyword] = useState([])
    const [currentLoc, setCurrentLoc] = useState([])
    const [createActivity, setCreateActivity] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const location = useLocation()
    let code = location.search.split('=')[1]
    useEffect(() => {
        getUserWithFacebook()
    }, [code])

    const getUserWithFacebook = () => {
        if(code) {
            axios.get(`http://localhost:3001/api/facebook?code=${code}`)
               .then(response => {
                   localStorage.setItem('token', response.data.token)
                   getUser()
               })
               .catch(console.log)
        }
    }
    const getActivity = () => {
        axios
            .get(`http://localhost:3001/api/activities`)
            .then(response => setActivities(response.data.activities))
            .catch(console.log)
    }
    const search = () => {
        axios   
            .get(`http://localhost:3001/api/activity/search?search=${keyword}`)
            .then(response => {
                setActivities(response.data.activities)
            })
            .catch(console.log)
    }
    useEffect(() => {
        getActivity()
    }, [])
    useEffect(() => {
        getActivity()
    }, [createActivity])
    
    return (
        <section className={styles.section}>
            <div className={styles.top}>
                <Button 
                    icon="black/menu"
                    onClick={() => nav.toggle(!nav.open)}
                    white/>
                <Input 
                    className="ml-5 mt-1"
                    type="search"
                    placeholder="Search activities"
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyUp={(e) => {if (e.keyCode === 13) search()}}/>
            </div>
            <Map 
                setCurrentLoc={setCurrentLoc}
                nav={nav}
                activities={activities}/>
            <Card>
                <h1 className="text-center">
                    Activities
                </h1>
                {activities && activities.map((activity, i) => (
                    <div  key={`activity-${i}`}>
                        <Activities 
                            activity ={activity}
                            nav={nav}/>
                    </div>
                ))} 
            </Card>
        </section>
    )
}

export default Home