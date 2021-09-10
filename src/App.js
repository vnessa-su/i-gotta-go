import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import LocationForm from "./components/LocationForm";
import RestroomList from "./components/RestroomList";
import RestroomDetails from "./components/RestroomDetails";

function App() {
    const [targetLocation, setTargetLocation] = useState({});
    const [restroomList, setRestroomList] = useState([]);
    const [selectedRestroom, setSelectedRestroom] = useState({});

    useEffect(() => {
        console.log("useEffect for App triggered");
    }, [targetLocation]);

    return (
        <div className="App">
            <header className="App-header">
                <Link to="/">
                    <h1>I Gotta Go</h1>
                </Link>
            </header>
            <main>
                <LocationForm onSubmit={setTargetLocation} />
                <Route path="/" exact component={<Homepage />} />
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
                        />
                    )}
                />
            </main>
        </div>
    );
}

export default App;
