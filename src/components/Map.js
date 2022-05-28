import { MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import airplane from './airplane.png'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RotatedMarker from './RotatedMarker'
import { Polyline } from 'react-leaflet';

import SpecificFlight from './SpecificFlight';


// https://api.infiniteflight.com/public/v2/flights/7e5dcd44-1fb5-49cc-bc2c-a9aab1f6a856?apikey=nvo8c790hfa9q3duho2jhgd2jf8tgwqw'
// Icon 
const airplaneIcon = L.icon({
  iconUrl: airplane,
  iconSize: [30, 30],
});


function Maps() {
  const [flights, setFlights] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [isShowSpecificFlight, setIsShowSpecificFlight] = useState(false);

  console.log(selectedFlightId)

  // Pegando informações da API

  const getLiveFlights = async () => {

    try {
      const response = await axios.get('https://api.infiniteflight.com/public/v2/flights/7e5dcd44-1fb5-49cc-bc2c-a9aab1f6a856?apikey=nvo8c790hfa9q3duho2jhgd2jf8tgwqw');
      const res = response.data.result;
      if (res !== undefined) {
        setFlights(res);
      }
    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {
    getLiveFlights()
  }, [])

  useEffect(() => {

    const intervalId = setInterval(getLiveFlights, 3000)
    return () => {
      console.log('clearing interval')
      clearInterval(intervalId)
    }
  }, [flights])

  //console.log(flights)

  const showSpecificFlight = (id) => {
    setSelectedFlightId(id)
    setIsShowSpecificFlight(true);
  }

  const removeSpecificFlight = () => {
    setSelectedFlightId(null)
    setIsShowSpecificFlight(false);
  }

  return (
    <MapContainer center={[-52.51511964322111, -53.51511964322111]} zoom={3}>
      {isShowSpecificFlight && <SpecificFlight flightId={selectedFlightId} removeSpecificFlight={removeSpecificFlight} />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flights?.length > 0 ? flights?.map((flight, idx) => (
        <RotatedMarker key={idx} position={[flight?.latitude || 0, flight?.longitude || 0]} icon={airplaneIcon} rotationAngle={flight?.heading} rotationOrigin="center"
          eventHandlers={{ click: () => showSpecificFlight(flight?.flightId) }} riseOnHover={true}>
         
          <Tooltip direction="top">
            <strong>{flight?.callsign}</strong>
          </Tooltip>
        </RotatedMarker>
      )) : ""}

    </MapContainer>
  )
}



export default Maps;