import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import Homepage from "./components/Homepage";
import LocationForm from "./components/LocationForm";
import RestroomList from "./components/RestroomList";
import RestroomDetails from "./components/RestroomDetails";
import axios from "axios";
import { LoadScript } from "@react-google-maps/api";
import toiletPaperLogo from "./img/toilet-paper.png";
import Toast from "react-bootstrap/Toast";

function App() {
    const history = useHistory();
    const [targetLocation, setTargetLocation] = useState({});
    const [unisexFilter, setUnisexFilter] = useState(false);
    const [accessibleFilter, setAccessibleFilter] = useState(false);
    const [restroomList, setRestroomList] = useState([]);
    const [selectedRestroom, setSelectedRestroom] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (targetLocation.location) {
            const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=20&offset=0&ada=${accessibleFilter}&unisex=${unisexFilter}&lat=${targetLocation.location.lat}&lng=${targetLocation.location.lng}`;

            axios
                .get(url)
                .then((response) => {
                    setRestroomList(response.data);
                    history.push({ pathname: "/restrooms" });
                })
                .catch((error) => errorHandler(error));
        }
    }, [targetLocation]);

    const errorHandler = (message) => {
        setShowToast(true);
        setErrorMessage(message.toString());
    };

    const formSubmitHandler = (
        targetLocation,
        unisexFilter,
        accessibleFilter
    ) => {
        setUnisexFilter(unisexFilter);
        setAccessibleFilter(accessibleFilter);
        setTargetLocation(targetLocation);
    };

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ display: "flex" }}>
                    <Link to="/">
                        <h1>I Gotta Go</h1>
                    </Link>
                    <img
                        src={toiletPaperLogo}
                        alt="Toilet paper on green circle background"
                        id="header-logo"
                    />
                </div>
                <Link to="/restrooms">
                    <p>Go To Restrooms List</p>
                </Link>
            </header>
            <main>
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                    style={{ color: "red" }}
                >
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
                <LocationForm
                    onSubmit={formSubmitHandler}
                    onError={errorHandler}
                />
                <hr />
                <Route path="/" exact component={Homepage} />
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                    <Route
                        path="/restrooms"
                        exact
                        render={() => (
                            <RestroomList
                                location={targetLocation}
                                restrooms={restroomList}
                                onRestroomClick={setSelectedRestroom}
                            />
                        )}
                    />
                    <Route
                        path="/restrooms/:id"
                        exact
                        render={(routerProps) => (
                            <RestroomDetails
                                id={routerProps.match.params.id}
                                data={selectedRestroom}
                                startLocation={targetLocation}
                            />
                        )}
                    />
                </LoadScript>
            </main>
            <footer>
                <small>
                    Icons made by{" "}
                    <a href="https://www.freepik.com" title="Freepik">
                        Freepik
                    </a>{" "}
                    from{" "}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                        www.flaticon.com
                    </a>
                </small>
            </footer>
        </div>
    );
}

export default App;
