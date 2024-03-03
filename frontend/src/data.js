// fetchData.js
async function fetchObituaries() {
    try {
      const response = await fetch('http://localhost:8000/obituariesGet');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem fetching the obituaries data:', error);
    }
  }
  
  export { fetchObituaries };


// sendData.js
async function postObituary(obituaryData) {
  try {
    const response = await fetch('http://localhost:8000/obituariesPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obituaryData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem sending the obituary data:', error);
  }
}

export { postObituary };
