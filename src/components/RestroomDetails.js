import React from "react";
import DirectionMap from "./DirectionMap";

function RestroomDetails({ data, startLocation }) {
    const endLatLng = { lat: data.latitude, lng: data.longitude };
    const startLatLng = {
        lat: startLocation.latitude,
        lng: startLocation.longitude,
    };

    return (
        <div>
            <h2>
                {data.name} - {data.distance.toFixed(2)} miles
            </h2>
            <DirectionMap startLocation={startLatLng} endLocation={endLatLng} />
            <div>
                <p>
                    <strong>Address:</strong> {data.street}, {data.city},{" "}
                    {data.state}
                </p>
                <p>
                    <strong>Directions:</strong> {data.directions}
                </p>
                <p>
                    <strong>Comments:</strong> {data.comment}
                </p>
            </div>
        </div>
    );
}

export default RestroomDetails;
