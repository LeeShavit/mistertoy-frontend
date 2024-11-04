
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;

export function GoogleMap({ center, setCenter, branches }) {

    const zoom = 11

    function onMapClicked({ lat, lng }) {
        setCenter({ lat, lng })
    }

    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                center={center}
                defaultZoom={zoom}
                onClick={onMapClicked}
            >
                <AnyReactComponent
                    {...center}
                    text="📍"
                />
                {branches.map((branch) => (
                    <AnyReactComponent
                        lat={branch.position.lat}
                        lng={branch.position.lng}
                        text="📍"
                        key={branch.id}
                    />
                ))}
            </GoogleMapReact>
        </div>
    )
}