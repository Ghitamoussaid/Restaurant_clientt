import React, { useEffect, useState } from "react";

const RestaurantOnMap = (props) => {

    const [restaurant, setRestaurant] = useState([])
    useEffect(() => {
        fetchMoreData();
    }, []);

    const fetchMoreData = async () => {
        const id = props.restaurantId;
        let data = await fetch(`http://localhost:9093/restaurants/all/${id}`);
        let parsedData = await data.json();
        setRestaurant(parsedData);
      }

    return (
        <div className="container">
      <div className="card col-md-3">
        <img
          src={restaurant.url} className="card-img-top"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{restaurant.nom} <span className="badge bg-warning text-dark"> Rank {restaurant.rank} </span> </h5>
          <p className="card-text">{restaurant.adresse} </p>
          {/* <a rel="noreferrer" target="_blank" className="btn btn-sm btn-dark" onClick={yourfunc(props.id)}>
            View In Map
          </a> */}
          {/* <button  onClick={() => viewOnMap(restaurant.id)} className="btn btn-sm btn-dark">View In Map</button> */}
        </div>
      </div>
    </div>
    );
}

export default RestaurantOnMap