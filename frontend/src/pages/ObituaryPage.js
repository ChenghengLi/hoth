import React, { useState, useEffect } from 'react';
import '../styles/ObituaryPage.css'; 

const ObituaryPage = () => {
  const [tributes, setTributes] = useState([]);

  useEffect(() => {
    loadTributes();
  }, []);

  const loadTributes = () => {
    // Simulate fetching existing tributes (e.g., from a server)
    const sampleTribute = {
      flowerCount: 3,
      note: "In loving memory. You will be dearly missed.",
    };
    setTributes([sampleTribute]); // Set the initial tribute
  };

  const submitTribute = () => {
    const flowerCount = document.getElementById("flowerCount").value;
    const note = document.getElementById("note").value;

    const newTribute = {
      flowerCount,
      note,
    };

    setTributes([...tributes, newTribute]); // Add the new tribute to the state

    // Clear the form fields
    document.getElementById("flowerCount").value = 1;
    document.getElementById("note").value = "";
  };

  return (
    <div className="container">
      <header>
        <h1>In Loving Memory of [Name]</h1>
        <p>Birthdate: [Birthdate] - Passing Date: [Passing Date]</p>
      </header>
      <section className="tributes">
        <h2>Tributes</h2>
        <div id="tribute-list">
          {tributes.map((tribute, index) => (
            <div key={index} className="tribute-item">
              <p>{tribute.flowerCount} Virtual Flowers</p>
              <p>{tribute.note}</p>
            </div>
          ))}
        </div>
        <form id="tribute-form">
          <label htmlFor="flowerCount">Send Virtual Flowers:</label>
          <input type="number" id="flowerCount" min="1" value="1" required />
          <label htmlFor="note">Write a Note:</label>
          <textarea id="note" rows="4" required></textarea>
          <button type="button" onClick={submitTribute}>Submit Tribute</button>
        </form>
      </section>
    </div>
  );
};

export default ObituaryPage;