import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Map from './components/Map'
import Sidebar from './components/Nav';
import { divIcon } from 'leaflet';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RotatedMarker from './components/RotatedMarker';

import SpecificFlight from './components/SpecificFlight';
import Nav from './components/Nav';



function App() {

    

  return (
    
    <div className="App">
    <Map />
   
    
    
    </div>
  );
}

export default App;
