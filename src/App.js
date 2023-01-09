import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";
import RestaurantsList from "./RestaurantsList";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RestaurantOnMap from "./RestaurantOnMap";

import Select from "react-select";


function App() {
  const defaultLocation = {
    "address": {
      "ISO3166-2-lvl5": "IE-L",
      "ISO3166-2-lvl6": "IE-D",
      "amenity": "Trinity College Dublin",
      "city": "Dublin",
      "city_district": "Mansion House A ED",
      "country": "Ireland",
      "country_code": "ie",
      "county": "County Dublin",
      "postcode": "D02 VR66",
      "region": "Leinster",
      "road": "College Green"
    },
    "boundingbox": {
      "0": "53.3419314",
      "1": "53.3455336",
      "2": "-6.2593238",
      "3": "-6.2495999"
    },
    "class": "amenity",
    "display_name": "Trinity College Dublin, College Green, Mansion House A ED, Dublin, County Dublin, Leinster, D02 VR66, Ireland",
    "icon": "https://nominatim.openstreetmap.org/ui/mapicons/education_university.p.20.png",
    "importance": 0.630634411605724,
    "lat": "53.34366745",
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "lon": "-6.254444724511822",
    "osm_id": 311466843,
    "osm_type": "way",
    "place_id": 180254810,
    "type": "university"
  }
  const [selectPosition, setSelectPosition] = useState(defaultLocation);
  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";


  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [villieOptions, setVillieOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("none");
 

  const url = window.location.href;
  console.log("URL", url);
  let myRestaurant = [];

  useEffect(() => {
    fetchMoreData();
    
  }, [selectPosition]);



 

  // let options = [
  //   // { value: "none", label: "Empty" },
  //   // { value: "left", label: "Open Left" },
  //   // { value: "right", label: "Open Right" },
  //   // {
  //   //   value: "tilt,left",
  //   //   label: "Tilf and Open Left"
  //   // },
  //   // {
  //   //   value: "tilt,right",
  //   //   label: "Tilf and Open Right"
  //   // }
  // ];


  const fetchMoreData = async () => {
    const arr = url.split('/');
    const restaurantId = arr[arr.length - 1];
    let data = await fetch(`http://localhost:9093/restaurants/all/${restaurantId}`);
    let parsedData = await data.json();
    myRestaurant = parsedData;
    setSelectedRestaurant(parsedData);
    console.log("Selected Restaurant ", selectedRestaurant);
    console.log("myRestaurant Restaurant ", myRestaurant);

    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${myRestaurant.lat}&lon=${myRestaurant.longs}`);
    let responseData = await response.json();
    console.log('Parsed responseData', responseData);
    setSelectPosition(responseData);
  }

  if (url.includes('/id')) {
    const arr = url.split('/');
    const restaurantId = arr[arr.length - 1];
    console.log("ID", restaurantId);
    //fetchMoreData();

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Maps selectPosition={selectPosition} restaurantId={restaurantId} />
        </div>
      </div>
    );
  }
  else {
    // displayArea();
    return (
      <>
        <div className="container" style={{ marginTop: "50px", marginBottom: "50px" }}>

          {/* <div className="col-md-4">
            <div className="input-group">
              <div className="form-outline">
                <input type="search" id="form1" className="form-control" placeholder="City"></input>
              </div>
              <button type="button" className="btn btn-sm">
                Search
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <div className="form-outline">
                <input type="search" id="form1" className="form-control" placeholder="City"></input>
              </div>
              <button type="button" className="btn btn-sm">
                Search
              </button>
            </div>
          </div> */}



          <RestaurantsList />
        </div>
      </>
    );
  }


}

export default App;
