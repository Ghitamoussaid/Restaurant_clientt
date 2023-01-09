import React, { useState, useEffect } from "react";
import Restaurant from "./Restaurant";

import Select from "react-select";

const RestaurantsList = () => {

    const [restaurants, setRestaurants] = useState([])
    const [zoneOptions, setZoneOptions] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [villieOptions, setVillieOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("none");
  
  useEffect(() => {
    fetchMoreData();
    displayArea();
    // eslint-disable-next-line
  },[])

 
  const handleTypeSelect = e => {
    setSelectedOption(e.value);
    console.log('Selected Option',e.value);


  };

  const handleZoneTypeSelect = async e => {
    setSelectedOption(e.value);
    console.log('Selected Zone',e.value);
    let data = await fetch(`http://localhost:9093/search/zones/${e.value}`);
    let zoneJsonData = await data.json();
    console.log('handleZoneTypeSelect',zoneJsonData);
    setRestaurants(zoneJsonData);
  };
  
  const handleSeriesTypeSelect = async e => {
    setSelectedOption(e.value);
    console.log('Selected Zone',e.value);
    let data = await fetch(`http://localhost:9093/search/series/${e.value}`);
    let zoneJsonData = await data.json();
    console.log('handleSeriesTypeSelect',zoneJsonData);
    setRestaurants(zoneJsonData);
  };

  const handleVilliesTypeSelect = async e => {
    setSelectedOption(e.value);
    console.log('Selected Zone',e.value);
    let data = await fetch(`http://localhost:9093/search/villies/${e.value}`);
    let zoneJsonData = await data.json();
    console.log('handleSeriesTypeSelect',zoneJsonData);
    setRestaurants(zoneJsonData);
  };

  const displayArea = async () => {
    let zoneData = await fetch(`http://localhost:9093/zones/data/all`);
    let zoneJsonData = await zoneData.json();
    setZoneOptions(zoneJsonData);

    let seriesData = await fetch(`http://localhost:9093/series/data/all`);
    let seriesJsonData = await seriesData.json();
    setSeriesOptions(seriesJsonData);

    let villiesData = await fetch(`http://localhost:9093/villes/data/all`);
    let villieJsonData = await villiesData.json();
    setVillieOptions(villieJsonData);

  }

  const searchRestaurants = async () => {
    alert('selectedOption', selectedOption);
    //console.log('SelectedOption', selectedOption);

  }

  const fetchMoreData = async () => {
    const url = "http://localhost:9093/restaurants/all";

    let data = await fetch(url);
    let parsedData = await data.json();
    setRestaurants(parsedData)
  }
  return (
    <>
      

      <div className="row">
            <div className="col-sm">
            <label>Area</label>
              <div className="input-group">
                <div className="form-outline">
                  
                  <Select
                    options={zoneOptions}
                    onChange={handleZoneTypeSelect}
                    value={zoneOptions.filter(function (option) {
                      return option.value === selectedOption;
                    })}
                    label="Single select"
                  />
                </div>
                {/* <button type="button" className="btn btn-primary" onClick={searchRestaurants}>
                  Search
                </button> */}
              </div>
            </div>
            <div className="col-sm">
            <label>Food</label>
              <div className="input-group">
                <div className="form-outline">
                  <Select
                    options={seriesOptions}
                    onChange={handleSeriesTypeSelect}
                    value={seriesOptions.filter(function (option) {
                      return option.value === selectedOption;
                    })}
                    label="Single select"
                  />
                </div>
                {/* <button type="button" className="btn btn-primary" onClick={searchRestaurants}>
                  Search
                </button> */}
              </div>
            </div>
            <div className="col-lg">
            <label>Series</label>
              <div className="input-group">
                <div className="form-outline">
                <Select
                    options={villieOptions}
                    onChange={handleVilliesTypeSelect}
                    value={villieOptions.filter(function (option) {
                      return option.value === selectedOption;
                    })}
                    label="Single select"
                  />
                </div>
                {/* <button type="button" className="btn btn-primary" onClick={searchRestaurants}>
                  Search
                </button> */}
              </div>
            </div>
           
          </div>
      <div className="row">
        {
          restaurants.map((element) => {
            return (
              <div className="col-md-4" key={element.id}>
                <Restaurant
                  url={element.url}
                  nom={element.nom}
                  adresse={element.adresse}
                  rank={element.rank}
                  id={element.id}
                />
              </div>
            );
          })}
      </div>
    </> 
  );
}

export default RestaurantsList;