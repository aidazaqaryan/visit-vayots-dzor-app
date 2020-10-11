import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Button } from '../Theme'
import styles from './index.module.scss'
import axios from 'axios'

const ImageUpload = () => {
    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [images, setImages] = useState(null)
    const history = useHistory()
    
    const getImage = () => {
        axios
            .get(`http://localhost:3001/api/activity?activityId=${id}`, {'Authorization': localStorage.token})
            .then((response) => setImages(response.data.activity.image))
            .catch(console.log)
    }

    const onImageUpload = (e) => {
        const data = new FormData()
        data.append('image', e.target.files[0])
        axios
            .post(`http://localhost:3001/api/image`, data, {headers: {'Authorization': localStorage.token}})
            .then(response => {
                setImage({image: response.data.file.path})
            })
            .catch(console.log)
        }        

    const updateActivty = () => {
        axios
            .put(`http://localhost:3001/api/upload/image?imageId=${id}`, image, 
            {headers: {'Authorization': localStorage.token}})
            .then(response => getImage())
            .catch(console.log)
    }
    const deleteImage = (image) => {
        console.log(image)
        axios
            .put(`http://localhost:3001/api/delete/image?imageId=${id}`, {image: image}, 
            {headers: {'Authorization': localStorage.token}})
            .then(response =>  {
                getImage()
            })
            .catch(console.log)
    }
    useEffect(() => {
        if(image) updateActivty()
    }, [image])   
    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <h2>Now upload images </h2>
                <div className={styles.images}>
                    {images && images.map((image, i) => (
                        <img
                            className={styles.each}
                            key={i}
                            src={`http://localhost:3001/${image}`}
                            alt="each"
                            onClick={() => {
                                deleteImage(image)
                            }}/>
                    ))}
                </div>
                <label>
                    <input
                        type="file"
                        className={styles.dNone}
                        onChange={e => {
                            onImageUpload(e)
                        }}/>
                    <div className={styles.upload}>UPLOAD</div>
                </label>
                {images && (
                    <Button
                        style={{width: '100%'}}
                        className={`mt-4 ${styles.done}`}
                        onClick={() => history.push('/')}
                        >
                            Done
                    </Button>
                )}
            </Card>
        </section>
    )
}

export default ImageUpload