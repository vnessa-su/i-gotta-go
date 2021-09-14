import React, { useState } from "react";
import { useHistory } from "react-router";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import restroomIcon from "../img/restroom_marker.png";

function ListMap({ location, restrooms }) {
    const history = useHistory();
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

    if (!location.location || !restrooms[0].name) {
        history.push({ pathname: "/" });
    }

    return (
        <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={center}>
            <Marker key={location.location} position={center} />
            {restrooms.map((restroom) => {
                const latLng = {
                    lat: restroom.latitude,
                    lng: restroom.longitude,
                };
                return (
                    <Marker
                        key={restroom.name}
                        position={latLng}
                        title={restroom.name}
                        onClick={markerClickHandler(restroom)}
                        icon={restroomIcon}
                    />
                );
            })}
            {selectedRestroom.name && (
                <InfoWindow
                    position={{
                        lat: selectedRestroom.latitude,
                        lng: selectedRestroom.longitude,
                    }}
                    clickable={true}
                    onCloseClick={() => setSelectedRestroom({})}
                >
                    <p>{selectedRestroom.name}</p>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default ListMap;
