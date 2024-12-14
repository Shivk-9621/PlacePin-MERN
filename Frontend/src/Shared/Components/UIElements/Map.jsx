import React, { useRef, useEffect } from 'react';
import { withGoogleMap, useLoadScript } from '@react-google-maps/api';

const WrappedMap = withGoogleMap((props) => {
    const mapRef = useRef();
    const { center, zoom } = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        });

        const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: center,
            map,
            title: 'Your Location',
        });

        return () => {
            marker.map = null;
        };
    }, [center, zoom]);

    return <div ref={mapRef} className={`map ${props.className}`} style={props.style} />;
});

const Map = (props) => {
    const mapRef = useRef();
    const MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY
    const { center, zoom } = props;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: MAPS_API_KEY,
        libraries: ['places'],
    });

    useEffect(() => {
        if (isLoaded) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: zoom,
            });

            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                position: center,
                map,
                title: 'Your Location',
            });

            // Add a click event listener to the map
            map.addListener('click', (e) => {
                console.log('Map clicked at:', e.latLng);
            });

            return () => {
                marker.map = null;
            };
        }
    }, [isLoaded]);


    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );
};

export default Map;
