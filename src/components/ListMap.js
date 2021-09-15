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

    const center = location.location;

    if (!location.name || !restrooms[0].name) {
        history.push({ pathname: "/" });
    }

    const mapStyles = {
        minHeight: "50vh",
        minWidth: "95%",
        display: "block",
        margin: "0 auto",
    };

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
                        key={restroom.id}
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
                    <div>
                        <Link to={`/restrooms/${selectedRestroom.id}`}>
                            {selectedRestroom.name}
                        </Link>
                        <p>{selectedRestroom.distance.toFixed(2)} miles</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default ListMap;
