import React from "react";


const Restaurant = (props) => {


  function viewOnMap(id) {
    console.log('Viewing map.......',id);
    window.location.href = 'http://localhost:3000/restaurant/id/'+id;
  }
  
  return (
    <div className="my-2">
      <div className="card">
        <img
          src={props.url} className="card-img-top"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{props.nom} <span className="badge bg-warning text-dark"> Rank {props.rank} </span> </h5>
          <p className="card-text">{props.adresse} </p>
          {/* <a rel="noreferrer" target="_blank" className="btn btn-sm btn-dark" onClick={yourfunc(props.id)}>
            View In Map
          </a> */}
          <button  onClick={() => viewOnMap(props.id)} className="btn btn-sm btn-dark">View In Map</button>
        </div>
      </div>
    </div>
  );
}

export default Restaurant