import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RestaurantOnMap from "./RestaurantOnMap";

const icon = L.icon({
  iconUrl: "https://icon-library.com/images/map-locator-icon/map-locator-icon-10.jpg",
  iconSize: [38, 38],
});

const position = [51.505, -0.09];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    console.log('selectPosition ',selectPosition);
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);

  return null;
}

export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  console.log('Select position:', selectPosition);
  console.log('Select position is:', selectPosition?.lat, selectPosition?.lon);
  return (
    <>
    <RestaurantOnMap  restaurantId = {props.restaurantId}/>
    <MapContainer
      center={position}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=YyQN2flspfIm2aH957hL"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
    </>
  );
}
