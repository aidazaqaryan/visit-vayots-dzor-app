import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import { Button } from '../Theme'
import styles from './index.module.scss'


const MapBox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiYWlkYXphcWFyeWFuIiwiYSI6ImNrMzNkOXAxYjA3aWMzb3BqeXptZGJlMzgifQ.M6sW4UQKmr-W_0HZbexIhg'
})

const Map = ({ 
    setCurrentLoc,
    nav,
    activities 
}) => {
    const [marker, setMarker] = useState(null)
    const [center, setCenter] = useState(null)
    // const [select, setSelect] = useState(false)
    const [page, setPage] = useState(false)

    const onMapClick = (e, data) => {
        if ((data.lngLat.lat < 39.48673854432968 ||
            data.lngLat.lat > 39.99896258528878) ||
            (data.lngLat.lng < 45.064879771857306 ||
            data.lngLat.lng > 45.81465625521807)) {
                console.log('true')
                // setCurrentCenter([45.33242210805554, 39.75890775670504])
                // return
            }
            setMarker(data.lngLat)
    } 
    navigator.geolocation.getCurrentPosition((position) => setCenter(position.coords))
    return (
        <div>
            <MapBox
                style="mapbox://styles/mapbox/streets-v11"
                center={[45.3164576, 39.7629985]}
                zoom={[11]}
                onClick={onMapClick}
                containerStyle={{
                    height: '550px',
                    width: '100%'
                }}>
                    {center && (
                        <Marker coordinates={[center.longitude, center.latitude]}>
                            <img 
                                src="/icons/black/pin.svg"
                                height="50px"/>
                        </Marker>
                    )}
                    {marker && (
                        <Marker 
                        coordinates={[marker.lng, marker.lat]}
                        onClick={() => {
                            // 
                        }}>
                            <img src="/icons/primary/pin.svg" height="50px"/>
                        </Marker>
                    )}
                    {nav.user && (
                        marker ? 
                            <Link to={`/create-activty/${marker.lng}/${marker.lat}`}>
                                <Button 
                                    className={styles.add}
                                    icon="black/plus"
                                    white/>  
                            </Link> :
                            <Button 
                                className={styles.add}
                                icon="black/plus"
                                onClick={() => {
                                    if(!marker) {
                                        alert('Please select location')
                                    } else {
                                        setPage(true)
                                    }
                                }}
                                white/>
                    ) 
                    }
                    {activities && (
                        activities.map((activity, i) => {
                            if(activity.likesCount > 10){
                                return (
                                    <Link 
                                        to={`/activities/${activity._id}`}
                                        key={`${i}-key`}>
                                        <Popup 
                                            coordinates={activity.location}
                                            style={{height:20}}>
                                            <div>
                                                <p className="text-muted"> {activity.title} </p>
                                            </div>
                                        </Popup>
                                    </Link>
                                    )
                            }
                            })
                        ) 
                    } 
            </MapBox>
        </div>
    )
}

export default Map