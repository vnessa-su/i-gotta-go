import React from "react";
import { useHistory } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

function RestroomItem({ data, onClick }) {
    const history = useHistory();

    const onRestroomClick = () => {
        console.log("restroom clicked");
        onClick(data);
        history.push({ pathname: `/restrooms/${data.id}` });
    };

    const listItemStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px 10px 20px",
    };

    return (
        <ListGroup.Item onClick={onRestroomClick} style={listItemStyle}>
            <p className="location-name-text">
                <strong>{data.name}</strong>
            </p>
            <p>{data.distance.toFixed(2)} miles</p>
        </ListGroup.Item>
    );
}

export default RestroomItem;
