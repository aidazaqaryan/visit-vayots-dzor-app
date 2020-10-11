import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import YouTube from 'react-youtube'
import { Link } from 'react-router-dom'
import { Button, Input, Card } from '../Theme'
import styles from './index.module.scss'
import axios from 'axios'

const opts = {
    height: '300',
    width: '375',
    playerVars: {
      autoplay: 1,
      controls: 1,
      showinfo: 0,
      fs: 0,
      loop: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0
    }
  }

const ActivityCreate = () => { 
    const { lng, lat } = useParams()
    const history = useHistory()
    const [activity, setActivty] = useState({
        title: '',
        image: '',
        location: [lng, lat],
        description: '',
        tags: '',
        category: ''
    })
    const createActivity = () => {
        axios
            .post(`http://localhost:3001/api/activity`, activity, {headers: {'Authorization': localStorage.token}})
            .then((response)=>  {
                console.log(response.data)
                history.push(`/upload-image/${response.data.activity._id}`)
            })
            .catch(console.log)
    }
    const onReady = (event) => {
        event.target.playVideo()
        event.target.mute()
    }
    return (
        <section className={`${styles.section} container`}>
            <div className={styles.youtube}>
                <YouTube
                    videoId="14N5Gtgiw34"
                    opts={opts}
                    onReady={onReady}
                    />
            </div>
            <Card className={styles.card}>
                <h2>Your Activity can help someone!</h2>
                <Input 
                    type="text"
                    className="mt-2 mb-2" 
                    placeholder="Title"
                    onChange={(e) =>  {
                        setActivty({...activity, title: e.target.value})
                    }}/>
                    <hr/>
                <textarea 
                    type="text" 
                    className="mt-2" 
                    placeholder="Description"
                    onChange={(e) =>  setActivty({...activity, description: e.target.value})}>
                </textarea>
                <Input 
                    type="text" 
                    placeholder="Tags"
                    className="mt-2" 
                    onChange={(e) =>  setActivty({...activity, tags: e.target.value})}/>
                    <hr/>
                <select 
                    className="mt-2" 
                    onChange={(e) => setActivty({...activity, category: e.target.value})}>
                    <option> Category </option>
                    <option> Travel </option>
                    <option> Nature </option>
                    <option> Adventure </option>
                    <option> City </option>
                    <option> Culture </option>
                </select>
                <div className="justify-content-between mt-2">
                    <Button 
                        onClick={() => createActivity()}> 
                        Create 
                    </Button>
                    <Link to="/">
                        <Button> 
                            Cancel 
                        </Button>
                    </Link>
                </div>
            </Card>
        </section>
    )
}
export default ActivityCreate