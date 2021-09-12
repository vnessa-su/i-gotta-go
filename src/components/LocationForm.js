import React from "react";
import axios from "axios";

const dummyData = {
    location: "Atlanta, GA",
    latitude: 33.749099,
    longitude: -84.390185,
};

function LocationForm({ onSubmit }) {
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const locationText = document.getElementById("locationInput").value;
        const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_GEOCODE_API_KEY}&location=${locationText}`;
        console.log(url);
        onSubmit(dummyData);

        // axios
        //     .get(url)
        //     .then((response) => {
        //         console.log(response.data);
        //         const latLngData = response.data.results[0].locations[0].latLng;
        //         const locationData = {
        //             location: locationText,
        //             latitude: latLngData.lat,
        //             longitude: latLngData.lng,
        //         };
        //         onSubmit(locationData);
        //     })
        //     .catch((error) => console.log(error));
    };

    const onCurrentLocationButtonClick = () => {
        const currentLocationData = { location: "Current Location" };

        const locationPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        locationPromise.then((position) => {
            console.log(position.coords);
            currentLocationData.latitude = position.coords.latitude;
            currentLocationData.longitude = position.coords.longitude;
            onSubmit(currentLocationData);
        });
    };
    return (
        <form onSubmit={formSubmitHandler}>
            <input type="text" id="locationInput" />
            <button type="submit">Submit</button>
            <button type="button" onClick={onCurrentLocationButtonClick}>
                Current Location
            </button>
        </form>
    );
}

export default LocationForm;
