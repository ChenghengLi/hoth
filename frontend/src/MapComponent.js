import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'; // Added useMap to the import
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css';
import tombstone from './tombstone.svg'; // Adjust the path to where your image is located
import axios from 'axios'; // Import axios for API requests
import React, { useEffect, useState } from "react";
import {fetchObituaries, postObituary} from './data.js'
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
const UpdateMapView = ({ center, zoom }) => {
  const map = useMap(); // Access the map instance
  useEffect(() => {
    map.setView(center, zoom); // Update map's center and zoom level
  }, [center, zoom, map]); // Re-run effect if center or zoom changes

  return null;
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  
  const [mapCenter, setMapCenter] = useState([34.071907, -118.4523068]); // Initial map center
  const [mapZoom, setMapZoom] = useState(13); // Initial zoom level
  const [obituaries, setObituaries] = useState([]);
  useEffect(() => {
    const displayObituaries = async () => {
      const fetchedObituaries = await fetchObituaries();
      console.log(fetchedObituaries);
      const initial_markers = fetchedObituaries.map(obituary => ({
        label: obituary.name,
        id : obituary.uid,
        pos: [ obituary.latitude, obituary.longitude]
      }));      
      setMarkers(initial_markers)
    };
    displayObituaries();
  }, []);

  const addMarker = (e) => {
    const newMarker = {
      id: Date.now(),
      pos: [e.lat, e.lng],
      label: '', // Initially no label
      url: 'https://example.com',
    };
    setMarkers(currentMarkers => [...currentMarkers, newMarker]);
    // Set this new marker as selected for labeling
    setSelectedMarkerId(newMarker.id);
    setEditLabel(''); // Reset edit label to be empty, ready for input
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

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
      if (response.data[0]) {
        const { lat, lon } = response.data[0];
        const position = { lat, lng: lon };
        const newCenter = [lat, lon];
        setMapCenter(newCenter); // Update map center
        setMapZoom(15); // Optionally set a new zoom level  
        addMarker(position, searchQuery); // Add marker with search query as label
        setSearchQuery(''); // Clear search field
      } else {
        alert('Location not found. Please try another search.');
      }
    } catch (error) {
      console.error('Failed to fetch location', error);
      alert('Error searching for location. Please try again later.');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMapView center={mapCenter} zoom={mapZoom} />
        <MapClickHandler onMapClick={(e) => addMarker(e.latlng)} />
        {markers.map(marker => (
          <Marker key={marker.id} position={marker.pos} icon={customIcon} eventHandlers={{
            click: () => handleMarkerClick(marker.id, marker.label),
          }}>
            <Popup>
              <div>
                {marker.label}
                <br />
                <a href={marker.url} target="_blank" rel="noopener noreferrer">More Info</a>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {selectedMarkerId && (
        <div style={{ position: 'absolute', top: '100px', left: '10px', zIndex: 1000 }}>
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
