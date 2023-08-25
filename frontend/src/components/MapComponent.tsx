import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CountryData } from '../types'; // Define this type in a separate file
import L from 'leaflet';
import redMarker from '../assets/red_marker.png';
interface MapComponentProps {
  countriesData: CountryData[];
}
const customIcon = new L.Icon({
    iconUrl: redMarker,
    iconSize: [12, 12], // Adjust the size based on your icon
  });
const MapComponent: React.FC<MapComponentProps> = ({ countriesData }) => {
  const center: [number, number] = [20, 0]; // Center of the map
  const zoom: number = 2; // Initial zoom level

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countriesData.map((country) => (
        <Marker
          key={country.countryInfo._id}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={customIcon}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <img src={country.countryInfo.flag} alt={`${country.country} Flag`} />
              <p>Active: {country.active}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
