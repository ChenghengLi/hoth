import React, { useState, useEffect } from 'react'
import Home from './pages/home.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapComponent from './MapComponent.js';
import SpeakerScreenContainer from './SpeakerScreenContainer.js'
import SingleParticipantContainer from './SingleParticipantContainer.js'
import ViewerScreenContainer from './ViewerScreenContainer.js'
import WelcomeScreenContainer from './WelcomeScreenContainer.js'


const App = () => {
  const [appData, setAppData] = useState({ meetingId: null, mode: null });

  return appData.meetingId ? (
    appData.mode === "CONFERENCE" ? (
      <SpeakerScreenContainer meetingId={appData.meetingId} />
    ) : (
      <ViewerScreenContainer meetingId={appData.meetingId} />
    )
  ) : (
    <WelcomeScreenContainer setAppData={setAppData} />
  );
};
export default App;
