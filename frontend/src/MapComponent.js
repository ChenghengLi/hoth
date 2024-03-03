import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css';
import tombstone from './tombstone.svg'; // Adjust the path to where your image is located

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl: tombstone, // URL to your custom image
  iconSize: [35, 35], // Size of the icon
  iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
});

const MapClickHandler = ({ onMapClick, mode }) => {
  useMapEvents({
    click(e) {
      if (mode === 'add') {
        onMapClick(e.latlng);
      }
    },
  });

  return null;
};

const Sidebar = ({ markers }) => {
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, background: 'white', padding: '20px' }}>
      <h4>Labels</h4>
      <ul>
        {markers.map(marker => (
          <li key={marker.id}>{marker.label}</li>
        ))}
      </ul>
    </div>
  );
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState('add'); // 'add' or 'view'
  const zoom = 13;
  const initialPosition = [34.071907, -118.4523068];

  const addMarker = (latlng) => {
    const newMarker = {
      id: Date.now(),
      pos: [latlng.lat, latlng.lng],
      label: `Marker at ${latlng.lat.toFixed(2)}, ${latlng.lng.toFixed(2)}`,
    };
    setMarkers([...markers, newMarker]);
  };

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'add' ? 'view' : 'add'));
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MapContainer center={initialPosition} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={addMarker} mode={mode} />
        {markers.map(marker => (
          <Marker key={marker.id} position={marker.pos} icon={customIcon}>
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {mode === 'view' && <Sidebar markers={markers} />}
      <button
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}
        onClick={toggleMode}
      >
        {mode === 'add' ? 'View Labels' : 'Add Label'}
      </button>
    </div>
  );
};

export default Map;
