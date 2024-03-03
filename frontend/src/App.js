import React from 'react';
import Home from './pages/home.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
    </div>
  );
}

export default App;