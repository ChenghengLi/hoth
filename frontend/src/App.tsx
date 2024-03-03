import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MyMapComponent from './pages/MyMapComponent';


function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <MyMapComponent />s
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
