import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Card, Button } from '../Theme'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import styles from './index.module.scss'
import axios from 'axios'
import ActivityEdit from '../ActivityEdit'

const MapBox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiYWlkYXphcWFyeWFuIiwiYSI6ImNrMzNkOXAxYjA3aWMzb3BqeXptZGJlMzgifQ.M6sW4UQKmr-W_0HZbexIhg'
})
const Activity = ({
    nav
}) => {
    const { id } = useParams()
    const history = useHistory()
    const [activity, setActivity] = useState(null)
    const [showEditButton, setShowEditButton] = useState(false)

    const getOneActivity = () => {
        axios
            .get(`http://localhost:3001/api/activity?activityId=${id}`, {'Authorization': localStorage.token})
            .then((response) => setActivity(response.data.activity))
            .catch(console.log)
    }
    const deleteActivity = (id) => {
        axios
            .delete(`http://localhost:3001/api/activity?activityId=${id}`, {headers: {'Authorization': localStorage.token}})
            .then(() => history.push('/user'))
            .catch(console.log)
    }

    const toggleLike = () => {
        const likes = activity.likes ? {...activity.likes} : {}
        let likesCount = activity.likesCount

        if (activity.likes && activity.likes[nav.user._id]) {
            delete likes[nav.user._id]
            likesCount--
        } else {
            likes[nav.user._id] = true
            likesCount++
        }
 
        setActivity({
            ...activity,
            likes,
            likesCount
        })

        axios
            .put(`http://localhost:3001/api/activity?activityId=${activity._id}`, { likes, likesCount }, {headers: {'Authorization': localStorage.token}})
            .catch(console.log)
    }

    useEffect(() => {
        getOneActivity()
    }, [id])
    return (
        <div>
            {activity &&
                <section className={styles.section}>
                    <Button 
                        icon="black/menu"
                        onClick={() => nav.toggle(!nav.open)}
                        white/>
                            <img 
                                src={`http://localhost:3001/${activity.image[0]}`}
                                alt="activity"
                                width="100%"
                                height="47%"/>
                    <Card>
                        <div className="justify-content-between">
                            <h2> {activity.title} </h2>
                            <div>
                                <div className="d-flex mt-1">
                                    {nav.user ?
                                        <Button 
                                            icon={ activity.likes ? activity.likes[nav.user._id] ? 'primary/like' : 'white/like' : 'white/like'  }
                                            onClick={toggleLike}
                                            white/> : 
                                        <Button 
                                            icon='white/like'
                                            white/>
                                    }
                                    <p> {activity.likesCount} </p>
                                </div>
                            </div>
                        </div>
                        <p> {activity.creator.username} </p>
                        <h3> Overview </h3>
                        <p> {activity.description} </p>
                        <p> { activity.tags } </p>
                        <p> { activity.category } </p>
                        <Carousel>
                            {activity.image.map((image, i) => (
                                <div key={`image-${i}`}>
                                    <img 
                                        src={`http://localhost:3001/${image}`}
                                        alt="activity"
                                        width="100%"
                                        height="47%"/>
                                </div>
                            ))}
                        </Carousel>
                        {nav.user && activity.creator._id === nav.user._id  && (
                            <div
                                className="justify-content-between">
                                <Button 
                                    onClick={() => setShowEditButton(true)}> 
                                    Edit
                                </Button>
                                <Button 
                                    onClick={() => deleteActivity(id)}> 
                                    Delete
                                </Button>
                            </div>
                        )}
                        <div className='mt-3'>
                            <MapBox
                                style="mapbox://styles/mapbox/satellite-v9"
                                center={[45.3164576, 39.7629985]}
                                zoom={[11]}
                                onClick={() => {}}
                                containerStyle={{
                                    height: '250px',
                                    width: '100%'
                                }}>
                                <Marker coordinates={[activity.location[0], activity.location[1]]}>
                                    <img 
                                        src="/icons/black/pin.svg"
                                        height="50px"/>
                                </Marker>
                            </MapBox>
                        </div>
                    </Card>
                </section>
            }
            {showEditButton && (
                <ActivityEdit 
                nav={nav}
                activity={activity}
                setShowEditButton={setShowEditButton}
                getOneActivity={getOneActivity}/>
            )}    
        </div>
    )
}

export default Activity