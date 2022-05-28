import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Polygon, Polyline } from 'react-leaflet';
import exios from 'axios';
import moment from 'moment';

import LoadingIcon from "../loading.svg";
import "./style.css";


const SpecificFlight = ({ flightId, removeSpecificFlight }) => {

  const [specificFlight, setSpecificFlight] = useState(null);

  const timeFormater = (time, offset) => {
    console.log(time, offset);
    return moment.unix(time).utc().utcOffset(offset).format("HH:mm")
};

const getSpecificFlight = async () => {
  try {
    const response = await exios.get(`https://api.infiniteflight.com/public/v2/sessions/7e5dcd44-1fb5-49cc-bc2c-a9aab1f6a856/flights/01e1116d-baa3-4cf0-96bf-66c239905aab/route?apikey=nvo8c790hfa9q3duho2jhgd2jf8tgwqw`);
    const res = response.data.result;
    //console.log(res);
    
    if (res !== null) {
      setSpecificFlight(res);
    }

  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  getSpecificFlight();

  return () => {
      setSpecificFlight(null);
  }

}, [flightId])

useEffect(() => {

  const intervalId = setInterval(getSpecificFlight, 3000);

  return () => {
      console.log("Interval cleared SPECIFIC FLIGHT")
      clearInterval(intervalId);
  }

}, [specificFlight])

console.log("RENDERING SPECIFIC FLIGHT component");

{for (let i = 0; i < specificFlight.length; i++) {
  console.log(specificFlight[i]);
}
 }

return (
  <div>
    
  </div>
)
  
}
export default React.memo(SpecificFlight);