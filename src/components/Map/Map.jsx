import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './Map.module.css';
import { fetchData, fetchMarkerData } from '../../api';
mapboxgl.accessToken = 'pk.eyJ1IjoicmF5emFsayIsImEiOiJja2E2NjBzZmYwNG5wMnlvenExcmR5dW1lIn0.vfs26Di0lJecriQl05FcEA';

export class CovidMap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        lng: -90,
        lat: 41,
        zoom: 2
        };

    }
    async componentDidMount() {
        const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
        });
        this.geoJson = await fetchMarkerData()
        console.log("clickhandler in map mount",this.props.clickHandler);
        let temp = this.props.clickHandler;
        console.log("clickhandler in map mount",temp);

        console.log("This is geojson in Covid mounter", this.geoJson);
        map.on('move', () => {
            this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            });
        });
        console.log("This is GeoJson.features", this.geoJson.features);
        var geojson = this.geoJson;
          
        geojson.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = styles.marker;
            el.addEventListener('click',() =>
            {
                temp(marker.properties.country);
                console.log("Clicked on",marker.properties.country);
            })
            
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + marker.properties.country + '</h3><p>' 
                + 'Cases: ' + marker.properties.cases + '</p>'+  
                'Deaths: ' + marker.properties.deaths + '</p>' +
                'Recovered:'+ marker.properties.recovered + '</p>')) 
                .addTo(map);
        });
    }
    render() {
        return (
            <div>
            <div className={styles.sidebarStyle}>
            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
            </div>
            <div ref={el => this.mapContainer = el} className= {styles.mapContainer} />
            </div>
        )
    }
    
};