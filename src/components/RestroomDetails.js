import React from "react";
import { useHistory } from "react-router-dom";
import DirectionMap from "./DirectionMap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTransgenderAlt,
    faWheelchair,
    faBaby,
} from "@fortawesome/free-solid-svg-icons";

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

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        marginBottom: "10px",
        padding: "10px 50px 10px 10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
    };

    const labelStyle = {
        textAlign: "right",
    };

    const infoStyle = {
        textAlign: "left",
    };

    return (
        <div>
            <h1>
                <span className="location-name-text">{data.name}</span> -{" "}
                {data.distance.toFixed(2)} miles{" "}
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
            </h1>
            <DirectionMap
                startLocation={startLocation}
                endLocation={endLocation}
            />
            <Container style={containerStyle}>
                <Row>
                    <Col sm={3} style={labelStyle}>
                        <p>
                            <strong>Address:</strong>
                        </p>
                    </Col>
                    <Col sm={9} style={infoStyle}>
                        <p>
                            {data.street}, {data.city}, {data.state}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} style={labelStyle}>
                        <p>
                            <strong>Location Directions:</strong>
                        </p>
                    </Col>
                    <Col sm={9} style={infoStyle}>
                        <p>{data.directions}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} style={labelStyle}>
                        <p>
                            <strong>Comments:</strong>
                        </p>
                    </Col>
                    <Col sm={9} style={infoStyle}>
                        <p>{data.comment}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RestroomDetails;
