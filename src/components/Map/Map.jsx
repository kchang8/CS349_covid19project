import React, { useState, useEffect } from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import styles from './Map.module.css';
const CovidMap = () =>{

        var lat= 51.505;
        var lng= -0.09;
        var zoom= 13;

    let mapClassName = `map`;
    const position = [lat, lng];
    return(
    
        <Map center={position} zoom={zoom}>
            <TileLayer
                url= 'https://api.mapbox.com/styles/v1/rayzalk/cka629vgq05911is41vcpu7vh/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmF5emFsayIsImEiOiJja2E2NjBzZmYwNG5wMnlvenExcmR5dW1lIn0.vfs26Di0lJecriQl05FcEA'
                attribution= 'Map data &copy; <a href=&quothttps://www.mapbox.com/about/maps/&quot>Mapbox</a> © <a href=&quothttp://www.openstreetmap.org/copyright&quot>OpenStreetMap</a> <strong><a href=&quothttps://www.mapbox.com/map-feedback/&quot target=&quot_blank&quot>Improve this map</a></strong>'
            />
        </Map>
    
    );
    
};
export default CovidMap;