import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const dummyData = {
    name: "Atlanta, GA",
    location: { lat: 33.749099, lng: -84.390185 },
};

function LocationForm({ onSubmit }) {
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const locationText = document.getElementById("locationInput").value;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationText}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        console.log(url);
        onSubmit(dummyData);

        // axios
        //     .get(url)
        //     .then((response) => {
        //         console.log(response.data);
        //         const latLngData = response.data.results[0].geometry.location;
        //         const locationData = {
        //             name: locationText,
        //             location: latLngData,
        //         };
        //         onSubmit(locationData);
        //     })
        //     .catch((error) => console.log(error));
    };

    const onCurrentLocationButtonClick = () => {
        const currentLocationData = { name: "Current Location" };

        const locationPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        locationPromise.then((position) => {
            console.log(position.coords);
            currentLocationData.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            onSubmit(currentLocationData);
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
