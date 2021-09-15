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

const dummyData = [
    {
        id: 3091,
        name: "Publix",
        street: "104 Town Blvd",
        city: "Atlanta",
        state: "GA",
        accessible: true,
        unisex: true,
        directions:
            ", Suite A100. Restrooms are at the front of the store. One genderfree bathroom is located between the two gendered bathrooms.",
        comment: "Open 7am-10pm.",
        latitude: 33.748315,
        longitude: -84.391109,
        created_at: "2014-02-02T20:53:31.495Z",
        updated_at: "2014-02-02T20:53:31.495Z",
        downvote: 1,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 3091,
        approved: true,
        distance: 0.07584309593263817,
        bearing: "229.685899869079",
    },
    {
        id: 1936,
        name: "High Museum",
        street: "1280 Peachtree Street, N.E. Atlanta, GA 30309",
        city: "Atlanta",
        state: "GA",
        accessible: true,
        unisex: true,
        directions: "at least one of the floors ",
        comment:
            "At least one of the floors has a family bathroom...thankfully",
        latitude: 33.748315,
        longitude: -84.391109,
        created_at: "2014-02-02T20:51:45.782Z",
        updated_at: "2014-02-02T20:51:45.782Z",
        downvote: 4,
        upvote: 5,
        country: "US",
        changing_table: false,
        edit_id: 1936,
        approved: true,
        distance: 0.07584309593263817,
        bearing: "229.685899869079",
    },
    {
        id: 17816,
        name: "F&B",
        street: "unknown",
        city: "atlanta",
        state: "ga",
        accessible: false,
        unisex: true,
        directions: "Just outside F&B restaurant. Single room sexed. ",
        comment: "",
        latitude: 33.7489954,
        longitude: -84.3879824,
        created_at: "2015-06-19T23:23:42.874Z",
        updated_at: "2015-06-19T23:23:42.874Z",
        downvote: 0,
        upvote: 1,
        country: "US",
        changing_table: false,
        edit_id: 17816,
        approved: true,
        distance: 0.12674087017484476,
        bearing: "92.692940698037",
    },
    {
        id: 39690,
        name: "Library North Coffee Shop",
        street: "100 decatur st",
        city: "Atlanta",
        state: "Ga",
        accessible: true,
        unisex: true,
        directions: "Coffee shop to left of main entrance ",
        comment:
            "Must show student ID or government issued ID if not student to get into library",
        latitude: 33.7522537,
        longitude: -84.3869758,
        created_at: "2018-01-28T19:05:14.824Z",
        updated_at: "2018-01-28T19:05:14.824Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 39690,
        approved: true,
        distance: 0.28548274314510436,
        bearing: "45.490665092535",
    },
    {
        id: 39691,
        name: "Georgia State University Sports Arena",
        street: "125 Decatur St",
        city: "Atlanta",
        state: "Ga",
        accessible: false,
        unisex: false,
        directions: "Room 105A and 108",
        comment: "Must be student to enter",
        latitude: 33.7517018,
        longitude: -84.386319,
        created_at: "2018-01-28T19:07:00.245Z",
        updated_at: "2018-01-28T19:07:00.245Z",
        downvote: 0,
        upvote: 0,
        country: "",
        changing_table: false,
        edit_id: 39691,
        approved: true,
        distance: 0.2857761544874309,
        bearing: "56.049430700203",
    },
    {
        id: 1211,
        name: "Georgia State University - Kell Hall",
        street: "24 Peachtree Center Ave SE",
        city: "Atlanta",
        state: "GA",
        accessible: true,
        unisex: true,
        directions:
            "This is on the first floor of Kell Hall, near the Peachtree Center Ave entrance, just before the elevators. ------- As of July 2011, if you enter the building from the Peachtree Center Ave entrance, there will be a large open space eventually connecting to Sparks Hall in front of you; a very large sign for and small hallway to the Cooperative Learning Lab to your right; and a short hallway leading to the elevators to your left. ------- Turn left and walk a few yards - there will be a small alcove with a women's restroom and this single-occupancy, accessible, non-gender-specific bathroom.",
        comment:
            "__Locking the door:__ It may not be immediately clear, but the door to this bathroom *does* lock. It does not have a physical latch, but in the corner across from the toilet (diagonal from the sink) there are two buttons at about three feet above the floor. One locks the door and the other unlocks and automatically opens the door. ------- __Accessibility button by the door:__ This button to automatically open the door does not work. The buttons in the corner described above function fine. ------- __Hours:__ GSU is open late - especially this building, which tends to host a lot of astronomy labs. This building will probably be locked very late at night and very early in the morning, and may have somewhat more limited hours during the summer. ------- __More info about this building:__ The official university webpage for Kell Hall is at  http://www.gsu.edu/site2005/29529.html  or  tinyurl.com/gsukell . ------- __User-Safety:__ Our school is very racially diverse, so campus security is not likely to harass users of this bathroom who are not GSU students *solely* on the basis of their ethnicity, but the police at GSU and in downtown Atlanta in general have been 'cracking down on homelessness' (i.e., perpetuating racism and classism like it'll fix the economic and structural problems in the city), so you may get flack or worse if you 'look' very poor, especially if you are older than traditional college student age and not white.",
        latitude: 33.753843,
        longitude: -84.3869225,
        created_at: "2014-02-02T20:50:41.126Z",
        updated_at: "2014-02-02T20:50:41.126Z",
        downvote: 1,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 1211,
        approved: true,
        distance: 0.3775800653559298,
        bearing: "34.516723357001",
    },
    {
        id: 52374,
        name: "Sparks Hall, 33 Gilmer St SE, Atlanta, GA 30303, USA",
        street: "Sparks Hall",
        city: "Atlanta",
        state: "Georgia",
        accessible: true,
        unisex: true,
        directions:
            "Third Floor near the anthropology department. It is a wheelchair accessible unisex single stall bathroom. ",
        comment: "",
        latitude: 33.7534327,
        longitude: -84.38590719999999,
        created_at: "2019-09-05T21:18:34.900Z",
        updated_at: "2019-09-05T21:18:35.351Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 52374,
        approved: true,
        distance: 0.38736554732253503,
        bearing: "44.628079988778",
    },
    {
        id: 45249,
        name: "Kung Fu Tea",
        street: "2/4 Park Pl. NE S",
        city: "Atlanta",
        state: "Georgia",
        accessible: true,
        unisex: true,
        directions: "Around the corner from the dining area",
        comment: "Restroom code attached to receipt- 1337 as of 10/18/18",
        latitude: 33.754640335230704,
        longitude: -84.38841924095301,
        created_at: "2018-10-18T21:35:13.276Z",
        updated_at: "2018-10-18T21:35:13.276Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 45249,
        approved: true,
        distance: 0.3960791901065189,
        bearing: "17.674597731728",
    },
    {
        id: 34594,
        name: "georgia state university",
        street: "34 peachtree street",
        city: "atlanta",
        state: "GA",
        accessible: false,
        unisex: false,
        directions: "",
        comment: "",
        latitude: 33.7549154,
        longitude: -84.3897312,
        created_at: "2017-04-27T02:42:13.483Z",
        updated_at: "2017-04-27T02:42:13.483Z",
        downvote: 0,
        upvote: 0,
        country: "US",
        changing_table: false,
        edit_id: 34594,
        approved: true,
        distance: 0.4027190998090874,
        bearing: "4.461223237081",
    },
    {
        id: 21282,
        name: "Georgia State University Building",
        street: "25 Park Place",
        city: "Atlanta",
        state: "Georgia ",
        accessible: true,
        unisex: true,
        directions:
            "Walk straight down after the revolving doors and after the men's bathroom and before the women's, there's a marked gender neutral/unisex bathroom",
        comment: "",
        latitude: 33.754711,
        longitude: -84.38806799999999,
        created_at: "2016-04-11T05:04:43.045Z",
        updated_at: "2016-04-11T05:04:43.045Z",
        downvote: 0,
        upvote: 1,
        country: "US",
        changing_table: false,
        edit_id: 21282,
        approved: true,
        distance: 0.4063767478573114,
        bearing: "20.667848260604",
    },
];

function App() {
    const history = useHistory();
    const [targetLocation, setTargetLocation] = useState({});
    const [restroomList, setRestroomList] = useState([]);
    const [selectedRestroom, setSelectedRestroom] = useState({});

    useEffect(() => {
        if (targetLocation.location) {
            const url = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${targetLocation.location.lat}&lng=${targetLocation.location.lng}`;
            console.log(url);
            setRestroomList(dummyData);
            history.push({ pathname: "/restrooms" });

            // axios
            //     .get(url)
            //     .then((response) => {
            //         setRestroomList(response.data);
            //         history.push({ pathname: "/restrooms" });
            //     })
            //     .catch((error) => console.error(error));
        }
    }, [targetLocation]);

    return (
        <div className="App">
            <header className="App-header">
                <Link to="/restrooms">
                    <h1>I Gotta Go</h1>
                </Link>
                <img
                    src={toiletPaperLogo}
                    alt="Toilet paper on green circle background"
                    id="header-logo"
                />
            </header>
            <main>
                <LocationForm onSubmit={setTargetLocation} />
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
        </div>
    );
}

export default App;
