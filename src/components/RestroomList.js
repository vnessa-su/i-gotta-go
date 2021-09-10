import React from "react";
import RestroomItem from "./RestroomItem";

function RestroomList({ location, restrooms, onRestroomClick }) {
    return (
        <div>
            <h2>Restrooms near {location.location}</h2>
            {restrooms.map((restroom) => (
                <RestroomItem
                    key={restroom.id}
                    data={restroom}
                    onClick={onRestroomClick}
                />
            ))}
        </div>
    );
}

export default RestroomList;
