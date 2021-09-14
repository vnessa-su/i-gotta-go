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
        height: "50vh",
        width: "50%",
    };

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={14}
            center={startLocation}
            showsUserLocation={true}
        >
            <DirectionsService
                options={{
                    destination: endLocation,
                    origin: startLocation,
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
            <Marker position={startLocation} title="Starting Point" />
            <Marker
                position={endLocation}
                icon={restroomIcon}
                title="Restroom"
            />
        </GoogleMap>
    );
}

export default DirectionMap;
