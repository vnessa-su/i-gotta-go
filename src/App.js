import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import LocationForm from "./components/LocationForm";
import RestroomList from "./components/RestroomList";
import RestroomDetails from "./components/RestroomDetails";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Link to="/">
                    <h1>I Gotta Go</h1>
                </Link>
            </header>
            <main>
                <LocationForm />
                <Route path="/" exact component={<Homepage />} />
                <Route
                    path="/restrooms"
                    exact
                    render={() => <RestroomList />}
                />
                <Route
                    path="/restrooms/:id"
                    exact
                    render={() => <RestroomDetails />}
                />
            </main>
        </div>
    );
}

export default App;
