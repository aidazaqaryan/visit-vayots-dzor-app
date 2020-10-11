import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { Button } from '../Theme'

const Activities = ({
    activity,
    nav
}) => {
    return (
        <div className={styles.section}>
            <div>
                <div className={styles.activity}>
                        <img 
                            src={`http://localhost:3001/${activity.image[0]}`}
                            className={`${styles.image} mt-3`}
                            alt="activity"/>
                    <div className="ml-2">
                        <div>
                            <h4> {activity.title} </h4>
                            <p className="mt-5"> {activity.description.slice(0,15)}... </p>
                        </div>
                        <div>
                            <div className="d-flex">
                                {nav.user ?
                                    <Button 
                                        icon={ activity.likes ? activity.likes[nav.user._id] ? 'primary/like' : 'white/like' : 'white/like'  }
                                        white/> : 
                                    <Button 
                                        icon='white/like'
                                        white/>
                                }
                                    <p> {activity.likesCount} </p>
                            </div>
                            <Link to={`/activities/${activity._id}`}>
                                <Button secondary>
                                    More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}
export default Activities