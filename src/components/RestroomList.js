import React from "react";
import RestroomItem from "./RestroomItem";
import ListMap from "./ListMap";

function RestroomList({ location, restrooms, onRestroomClick }) {
    return (
        <div>
            <h2>Restrooms near {location.name}</h2>
            <ListMap location={location} restrooms={restrooms} />
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
