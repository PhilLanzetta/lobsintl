import React from "react"
import { HiLocationMarker } from "react-icons/hi"

const LocationPin = () => {
  return (
    <div>
      <HiLocationMarker className="contact-map-marker"></HiLocationMarker>
      <div className="contact-map-text">
        <p>
          L'Observatoire <br />
          International
        </p>
      </div>
    </div>
  )
}

export default LocationPin
