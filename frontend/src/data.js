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


// sendData.js
async function postGetUsername(obituaryData) {
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

export { postGetUsername };

// Updated fetchData.js to fetchUserData.js
async function fetchUserData(userId) {
  try {
    const response = await fetch(`http://localhost:8000/userGet?uid=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem fetching the user data:', error);
  }
}

export { fetchUserData };


// Updated sendData.js to postUserData.js
async function postUserData(userId, userInfo) {
  try {
    const response = await fetch('http://localhost:8000/userPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: userId, info: userInfo }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem posting the user data:', error);
  }
}

export { postUserData };