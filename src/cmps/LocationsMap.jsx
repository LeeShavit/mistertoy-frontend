
import React, { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { GoogleMap } from "./GoogleMap";

export function LocationsMap() {

    const [center, setCenter] = useState({ lat: 32.109333, lng: 34.855499 })

    function onLocationClicked(id) {
        const branch= branches.find(branch => branch.id === id)
        setCenter(branch.position)
    }

    const branches = [
        {
          city: 'Haifa',
          id: 101,
          position: {
            lat: 32.820789,
            lng: 34.963488,
          },
        },
        {
          city: 'Tel Aviv',
          id: 102,
          position: {
            lat: 32.071035,
            lng: 34.779118,
          },
        },
        {
          city: 'Jerusalem',
          id: 103,
          position: {
            lat: 31.773362,
            lng: 35.221193,
          },
        },
      ]
    

    return (
        <section className="location-map">
        <ul>
        {branches.map((branch) => (
                <li key={branch.id} className="branch" onClick={()=>onLocationClicked(branch.id)}>
                    <LocationOnIcon/>
                    <h4>{branch.city}</h4>
                </li>
            ))}
        </ul>
       <GoogleMap center={center} setCenter={setCenter} branches={branches}/>
        </section>
    )
}