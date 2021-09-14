import React, { useState } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";
import restroomIcon from "../img/restroom_marker.png";

function DirectionMap({ startLocation, endLocation }) {
    const [directionsData, setDirectionsData] = useState({});

    const directionsCallback = (response) => {
        console.log(response);

        if (response !== null) {
            if (response.status === "OK") {
                setDirectionsData(response);
                console.log(directionsData);
            } else {
                console.log("response: ", response);
            }
        }
    };

    const mapStyles = {
        minHeight: "50vh",
        minWidth: "50%",
        display: "block",
        margin: "0 auto",
    };

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={14}
            center={startLocation.location}
            showsUserLocation={true}
        >
            <DirectionsService
                options={{
                    destination: endLocation.location,
                    origin: startLocation.location,
                    travelMode: "WALKING",
                }}
                callback={directionsCallback}
            />
            <DirectionsRenderer
                options={{
                    directions: directionsData,
                    suppressMarkers: true,
                }}
            />
            <Marker
                position={startLocation.location}
                title={startLocation.name}
            />
            <Marker
                position={endLocation.location}
                icon={restroomIcon}
                title={endLocation.name}
            />
        </GoogleMap>
    );
}

export default DirectionMap;
