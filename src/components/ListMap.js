import React, { useState } from "react";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import restroomIcon from "../img/restroom_marker.png";

function ListMap({ location, restrooms }) {
    const [selectedRestroom, setSelectedRestroom] = useState({});

    const markerClickHandler = (restroom) => {
        return () => {
            setSelectedRestroom(restroom);
        };
    };

    const mapStyles = {
        height: "50vh",
        width: "50%",
    };

    const center = {
        lat: location.latitude,
        lng: location.longitude,
    };

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={14}
                center={center}
            ></GoogleMap>
        </LoadScript>
    );
}

export default ListMap;