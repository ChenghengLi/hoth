import Map from '../componentes/Map'; // Adjust the path according to your file structure
import SearchBar from '../componentes/SearchBar';

import './../styles/MapPage.css'
const MapPage = () => {
    return (
    <>
       
        <div className="map-container">    
        <div className="search-box"> <SearchBar/> </div>
        <Map />
        </div>
    </>
    )
}


export default MapPage