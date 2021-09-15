import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LocationForm({ onSubmit }) {
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const locationText = document.getElementById("locationInput").value;
        const unisexFilter = document.getElementById(
            "unisex-filter-checkbox"
        ).checked;
        const accessibleFilter = document.getElementById(
            "accessible-filter-checkbox"
        ).checked;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationText}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

        axios
            .get(url)
            .then((response) => {
                const latLngData = response.data.results[0].geometry.location;
                const locationData = {
                    name: locationText,
                    location: latLngData,
                };
                onSubmit(locationData, unisexFilter, accessibleFilter);
            })
            .catch((error) => console.log(error));
    };

    const onCurrentLocationButtonClick = () => {
        const unisexFilter = document.getElementById(
            "unisex-filter-checkbox"
        ).checked;
        const accessibleFilter = document.getElementById(
            "accessible-filter-checkbox"
        ).checked;
        const currentLocationData = { name: "Current Location" };

        const locationPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        locationPromise.then((position) => {
            currentLocationData.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            onSubmit(currentLocationData, unisexFilter, accessibleFilter);
        });
    };

    const formStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "row wrap",
        margin: "10px",
    };

    const buttonStyle = {
        margin: "5px",
    };

    const inputStyle = {
        width: "300px",
        margin: "5px",
    };

    return (
        <Form onSubmit={formSubmitHandler} style={formStyle}>
            <Form.Group controlId="locationInput">
                <Form.Control
                    type="text"
                    placeholder="Enter in a location..."
                    style={inputStyle}
                />
            </Form.Group>
            <div>
                <Form.Check
                    inline
                    label="Unisex"
                    id="unisex-filter-checkbox"
                    style={{ margin: "5px" }}
                />
                <Form.Check
                    inline
                    label="Accessible"
                    id="accessible-filter-checkbox"
                    style={{ margin: "5px" }}
                />
            </div>
            <div>
                <Button variant="primary" type="submit" style={buttonStyle}>
                    Submit
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={onCurrentLocationButtonClick}
                    style={buttonStyle}
                >
                    Current Location
                </Button>
            </div>
        </Form>
    );
}

export default LocationForm;
