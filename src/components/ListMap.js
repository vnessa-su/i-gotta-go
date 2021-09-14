import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import restroomIcon from "../img/restroom_marker.png";

function ListMap({ location, restrooms, onLinkClick }) {
    const history = useHistory();
    const [selectedRestroom, setSelectedRestroom] = useState({});

    const markerClickHandler = (restroom) => {
        return () => {
            setSelectedRestroom(restroom);
            onLinkClick(restroom);
        };
    };

    const mapStyles = {
        height: "50vh",
        width: "50%",
    };

    const center = location.location;

    if (!location.name || !restrooms[0].name) {
        history.push({ pathname: "/" });
    }

    return (
        <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={center}>
            <Marker key={location.name} position={center} />
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
                >
                    <Link to={`/restrooms/${selectedRestroom.id}`}>
                        {selectedRestroom.name}
                    </Link>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default ListMap;
