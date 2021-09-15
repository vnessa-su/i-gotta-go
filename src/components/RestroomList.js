import React from "react";
import RestroomItem from "./RestroomItem";
import ListMap from "./ListMap";
import ListGroup from "react-bootstrap/ListGroup";

function RestroomList({ location, restrooms, onRestroomClick }) {
    const listStyle = {
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: "10px",
    };
    return (
        <div>
            <h1>
                Restrooms near{" "}
                <span className="location-name-text">{location.name}</span>
            </h1>
            <ListMap
                location={location}
                restrooms={restrooms}
                onLinkClick={onRestroomClick}
            />
            <ListGroup style={listStyle}>
                {restrooms.map((restroom) => (
                    <RestroomItem
                        key={restroom.id}
                        data={restroom}
                        onClick={onRestroomClick}
                    />
                ))}
            </ListGroup>
        </div>
    );
}

export default RestroomList;
