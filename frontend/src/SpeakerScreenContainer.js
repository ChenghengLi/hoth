import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import MediaControlsContainer from './MediaControlsContainer';
import ParticipantsGridContainer from './ParticipantsGridContainer';
import { authToken } from './api';
import ReactPlayer from "react-player";

const SpeakerScreenContainer = ({ meetingId }) => {
  return (
    <MeetingProvider
      token={authToken}
      config={{
        meetingId,
        name: "Your Name", // Consider dynamically setting this
        micEnabled: true,
        webcamEnabled: true,
      }}
    >
      <MediaControlsContainer meetingId={meetingId} />
      <ParticipantsGridContainer />
    </MeetingProvider>
  );
};

export default SpeakerScreenContainer;
