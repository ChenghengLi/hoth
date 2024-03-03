import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent'; // Adjust the path according to your file structure
import { fetchObituaries, postObituary } from './data.js';

function App() {
  // Initialize the obituaries state as an empty array
  const [obituaries, setObituaries] = useState([]);

  // Fetch obituaries when the component mounts
  useEffect(() => {
    const displayObituaries = async () => {
      const fetchedObituaries = await fetchObituaries();
      setObituaries(fetchedObituaries); // Store the fetched obituaries in the state
      console.log(fetchedObituaries);


    };

    displayObituaries();
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div className="App">
      <MapComponent />
      {}
    </div>
  );
}

export default App;