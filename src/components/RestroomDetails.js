import React from "react";
import { useHistory } from "react-router-dom";
import DirectionMap from "./DirectionMap";

function RestroomDetails({ data, startLocation }) {
    const history = useHistory();
    if (!data.distance) {
        history.push({ pathname: "/restrooms" });
        history.go(0);
    }

    const endLocation = {
        name: data.name,
        location: { lat: data.latitude, lng: data.longitude },
    };

    return (
        <div>
            <h2>
                {data.name} - {data.distance.toFixed(2)} miles
            </h2>
            <DirectionMap
                startLocation={startLocation}
                endLocation={endLocation}
            />
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
