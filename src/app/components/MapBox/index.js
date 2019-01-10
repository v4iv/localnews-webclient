import React from 'react';
import {GoogleMap, Marker, withGoogleMap} from "react-google-maps";

const MapBox = ({latitude, longitude}) => {
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
        >
            {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
        </GoogleMap>
    ));
    return (
        <section className='section'>
            <div className='container'>
                <GoogleMapExample
                    containerElement={<div style={{height: `500px`, width: '100%'}}/>}
                    mapElement={<div style={{height: `100%`, width: `100%`}}/>}
                    isMarkerShown={true}
                    lat={latitude}
                    lng={longitude}
                />
            </div>
        </section>
    );
};

export default MapBox;
