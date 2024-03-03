import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css';
import tombstone from './tombstone.svg'; // Adjust the path to where your image is located
const customIcon = new L.Icon({
  iconUrl: tombstone,
  iconSize: [35, 35], // Size of the icon
  iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });
  return null;
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const zoom = 13;
  const initialPosition = [34.071907, -118.4523068];

  const addMarker = (e) => {
    const newMarker = {
      id: Date.now(),
      pos: [e.latlng.lat, e.latlng.lng],
      label: 'Click to add label', // Default label
    };
    setMarkers(currentMarkers => [...currentMarkers, newMarker]);
  };

  const handleMarkerClick = (markerId, currentLabel) => {
    setSelectedMarkerId(markerId);
    setEditLabel(currentLabel);
  };

  const updateMarkerLabel = () => {
    setMarkers(currentMarkers => currentMarkers.map(marker => 
      marker.id === selectedMarkerId ? { ...marker, label: editLabel } : marker));
    setSelectedMarkerId(null); // Reset selection
    setEditLabel(''); // Clear edit field
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MapContainer center={initialPosition} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={addMarker} />
        {markers.map(marker => (
          <Marker key={marker.id} position={marker.pos} icon={customIcon} eventHandlers={{
            click: () => handleMarkerClick(marker.id, marker.label),
          }}>
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedMarkerId && (
        <div style={{ position: 'absolute', top: '10px', left: '100px', zIndex: 1000 }}>
          <input
            type="text"
            placeholder="Edit label"
            value={editLabel}
            onChange={e => setEditLabel(e.target.value)}
          />
          <button onClick={updateMarkerLabel}>Update Label</button>
        </div>
      )}
    </div>
  );
};

export default Map;
