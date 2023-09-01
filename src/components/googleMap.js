import React from "react"
import GoogleMapReact from "google-map-react"
import LocationPin from "./locationPin"

const GoogleMap = () => {
  const mapLocation = { lat: 40.7175755, lng: -73.9996859 }

  return (
    <div className="contact-map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAP_KEY }}
        defaultCenter={mapLocation}
        defaultZoom={17}
      >
        <LocationPin lat={mapLocation.lat} lng={mapLocation.lng}></LocationPin>
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap
