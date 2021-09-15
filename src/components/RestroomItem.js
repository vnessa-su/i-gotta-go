import React from "react";
import { useHistory } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTransgenderAlt,
    faWheelchair,
    faBaby,
} from "@fortawesome/free-solid-svg-icons";

function RestroomItem({ data, onClick }) {
    const history = useHistory();

    const onRestroomClick = () => {
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
            <div style={{ display: "flex" }}>
                {data.unisex && (
                    <FontAwesomeIcon
                        icon={faTransgenderAlt}
                        title="Unisex"
                        className="filter-icon"
                    />
                )}
                {data.accessible && (
                    <FontAwesomeIcon
                        icon={faWheelchair}
                        title="Accessible"
                        className="filter-icon"
                    />
                )}
                {data.changing_table && (
                    <FontAwesomeIcon
                        icon={faBaby}
                        title="Changing Table"
                        className="filter-icon"
                    />
                )}
                <p>{data.distance.toFixed(2)} miles</p>
            </div>
        </ListGroup.Item>
    );
}

export default RestroomItem;
