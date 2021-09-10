import React from "react";

function RestroomDetails({ data }) {
    return (
        <div>
            <h2>
                {data.name} - {data.distance.toFixed(2)} miles
            </h2>
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
