import React, { useState } from 'react'
import { Card, Button, Input } from '../Theme'
import styles from './index.module.scss'
import axios from 'axios'

const ActivityEdit = ({
    activity, 
    setShowEditButton,
    getOneActivity
}) => {

    const [changedActivity, setChangedActivity] = useState({
        title: activity.title,
        image: activity.image,
        description: activity.description,
        tags: activity.tags,
        category: activity.category
    })
    const onImageUpload = (e) => {
        const data = new FormData()
        data.append('image', e.target.files[0])
        axios
            .post(`http://localhost:3001/api/image`, data, {headers: {'Authorization': localStorage.token}})
            .then(response => {
                setChangedActivity({...changedActivity, image: response.data.file.path })
                console.log(response.data.file.path)
            })
            .catch(console.log)
    }
    const updateActivty = (id) => {
        console.log(changedActivity)
        axios
            .put(`http://localhost:3001/api/activity?activityId=${id}`, changedActivity, {headers: {'Authorization': localStorage.token}})
            .then(response =>  {
                getOneActivity()
                setShowEditButton(false)
            })
            .catch(console.log)
    }
    return (
        <section className={`${styles.section} container`}>
                <h1 className="text-center">
                    Change your activity
                </h1>
                <h3> Activity title </h3>
                <Input 
                    type="text"
                    className="mt-2 mb-2" 
                    value={changedActivity.title}
                    onChange={(e) =>  {
                        setChangedActivity({...changedActivity, title: e.target.value})
                    }}/>
                    <h3> Activity image </h3>
                    <label className={styles.input}>
                        <Input 
                            className="mt-2" 
                            type="file"
                            onChange={onImageUpload}
                            none
                            />
                            choose image
                    </label>
                    <h3> Activity description </h3>
                <textarea 
                    type="text" 
                    className="mt-2" 
                    value={changedActivity.description}
                    onChange={(e) =>  setChangedActivity({...changedActivity, description: e.target.value})}>
                </textarea>
                <h3> Activity tags </h3>
                <Input 
                    type="text" 
                    value={changedActivity.tags}
                    className="mt-2" 
                    onChange={(e) =>  setChangedActivity({...changedActivity, tags: e.target.value})}/>
                    <h3> Activity category </h3>
                <select 
                    className="mt-2" 
                    onChange={(e) => setChangedActivity({...changedActivity, category: e.target.value})}>
                    <option> Category </option>
                    <option> Travel </option>
                    <option> Nature </option>
                    <option> Adventure </option>
                    <option> City </option>
                    <option> Culture </option>
                </select>
                <div className="justify-content-between mt-2">
                    <Button 
                        onClick={() => updateActivty(activity._id)}> 
                        Change 
                    </Button>
                    <Button 
                        onClick={() => setShowEditButton(false)}> 
                        Cancel 
                    </Button>
                </div>
        </section>
    )
}
export default ActivityEdit