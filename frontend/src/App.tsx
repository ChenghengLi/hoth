import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';




function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />s
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
