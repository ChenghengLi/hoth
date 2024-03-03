0
Jump to Comments
2
Save

Cover image for Building a Live Streaming App with React and Video SDK
Video SDK profile imageUtpalsinh Parmar
Utpalsinh Parmar for Video SDK
Posted on Jun 13, 2023 • Updated on Jun 14, 2023


3
Building a Live Streaming App with React and Video SDK
#
webdev
#
showdev
#
react
#
javascript
Learn how to create a powerful live streaming app with this step-by-step tutorial. Explore the seamless integration of React and a video SDK to build an interactive live streaming experience. Follow along as we guide you through the development process, from setting up the environment to implementing key features such as real-time chat, live video streaming, and interactive engagement tools. Unlock the potential of React and a video SDK to create a captivating live streaming app that engages your audience like never before. Get started today and take your live streaming app development skills to the next level!

In today's digital age, live streaming has become an increasingly popular medium for sharing content and engaging with audiences in real-time. With the rise of platforms like YouTube, Twitch, and Facebook Live, businesses and individuals alike are exploring ways to harness the power of live video to connect with their target audience. If you're looking to build an interactive live streaming app using React and Video SDK, you've come to the right place. In this article, we'll guide you through the process of creating a cutting-edge live streaming app that will help you stand out from the competition.

React has emerged as one of the most widely used JavaScript frameworks for building user interfaces. Its component-based architecture, virtual DOM, and efficient rendering make it a popular choice among developers. When combined with Video SDK, a powerful toolkit that provides developers with the necessary tools and functionalities for integrating live video streaming into their applications, React becomes an even more formidable force in the world of live streaming.

4 Steps to Build React Interactive Live Streaming App using Video SDK
Tools for building an Interactive Live Streaming App
VideoSDK.Live's React SDK
VideoSDK.Live's HLS Composition
VideoSDK.Live's HLS Streaming
Step 1: Understanding our Live Streaming App Functionalities and Project Structure
I will be creating this app for 2 types of users, Speaker and Viewer.

Speaker will have all media controls i.e. they can toggle their webcam and mic to share their information to the viewers. Speaker can also start HLS stream so that viewer consume the content.
Viewer will not have any media controls, they will just watch an VideoSDK HLS Stream, which was started by speaker
Pre-requisites before starting to write code:
VideoSDK Account. If not, you can signup
Coding environment for React
Good understanding of React
After our coding environment is setup, we can now start writing our code, first I will create a new React App using create-react-app, also we will install useful dependencies.
npx create-react-app videosdk-interactive-live-streaming-app

cd videosdk-interactive-live-streaming-app

npm install @videosdk.live/react-sdk react-player hls.js
Project Structure
I will create 3 screens:

Welcome Screen
Speaker Screen
Viewer Screen
Below is the folder structure of our app.
root/
├──node_modules/
├──public/
├──src/
├────screens/
├───────WelcomeScreenContainer.js
├───────speakerScreen/
├──────────MediaControlsContainer.js
├──────────ParticipantsGridContainer.js
├──────────SingleParticipantContainer.js
├──────────SpeakerScreenContainer.js
├──────ViewerScreenContainer.js
├────api.js
├────App.js
├────index.js
App Container
I will prepare a basic App.js, This file will contain all the screens and render all of them conditionally according to the appData state changes.

/src/App.js
import React, { useState } from "react";
import SpeakerScreenContainer from "./screens/speakerScreen/SpeakerScreenContainer";
import ViewerScreenContainer from "./screens/ViewerScreenContainer";
import WelcomeScreenContainer from "./screens/WelcomeScreenContainer";

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
Step 2: Welcome Screen of your React Live Streaming App
Creating a new meeting will require an api call, so we will write some code for that

A temporary auth-token can be fetched from our user dashboard, but in production, we recommend to use an authToken generated by your servers.

Follow this guide to get temporary auth-token from user dashboard.

/src/api.js
export const authToken = "temporary-generated-auth-token-goes-here";

export const createNewRoom = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const { roomId } = await res.json();
  return roomId;
};
WelcomeScreenContainer will be useful for creating a new meeting by speakers. it will also allow to enter already created meetingId to join the existing session.
src/screens/WelcomeScreenContainer.js
import React, { useState } from "react";
import { createNewRoom } from "../api";

const WelcomeScreenContainer = ({ setAppData }) => {
  const [meetingId, setMeetingId] = useState("");

  const createClick = async () => {
    const meetingId = await createNewRoom();

    setAppData({ mode: "CONFERENCE", meetingId });
  };
  const hostClick = () => setAppData({ mode: "CONFERENCE", meetingId });
  const viewerClick = () => setAppData({ mode: "VIEWER", meetingId });

  return (
    <div>
      <button onClick={createClick}>Create new Meeting</button>
      <p>{"\n\nor\n\n"}</p>
      <input
        placeholder="Enter meetingId"
        onChange={(e) => setMeetingId(e.target.value)}
        value={meetingId}
      />
      <p>{"\n\n"}</p>
      <button onClick={hostClick}>Join As Host</button>
      <button onClick={viewerClick}>Join As Viewer</button>
    </div>
  );
};

export default WelcomeScreenContainer;
Step 3: Speaker Screen
This screen will contain all the media controls and participants grid. First I will create a name input box for participant who will be joining.
src/screens/speakerScreen/SpeakerScreenContainer.js
import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import MediaControlsContainer from "./MediaControlsContainer";
import ParticipantsGridContainer from "./ParticipantsGridContainer";

import { authToken } from "../../api";

const SpeakerScreenContainer = ({ meetingId }) => {
  return (
    <MeetingProvider
      token={authToken}
      config={{
        meetingId,
        name: "C.V. Raman",
        micEnabled: true,
        webcamEnabled: true,
      }}
      joinWithoutUserInteraction
    >
      <MediaControlsContainer meetingId={meetingId} />
      <ParticipantsGridContainer />
    </MeetingProvider>
  );
};

export default SpeakerScreenContainer;
MediaControls
This container will be used for toggling mic and webcam. Also, we will add some code for starting HLS streaming.
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import React, { useMemo } from "react";

const MediaControlsContainer = () => {
  const { toggleMic, toggleWebcam, startHls, stopHls, hlsState, meetingId } =
    useMeeting();

  const { isHlsStarted, isHlsStopped, isHlsPlayable } = useMemo(
    () => ({
      isHlsStarted: hlsState === Constants.hlsEvents.HLS_STARTED,
      isHlsStopped: hlsState === Constants.hlsEvents.HLS_STOPPED,
      isHlsPlayable: hlsState === Constants.hlsEvents.HLS_PLAYABLE,
    }),
    [hlsState]
  );

  const _handleToggleHls = () => {
    if (isHlsStarted) {
      stopHls();
    } else if (isHlsStopped) {
      startHls({ quality: "high" });
    }
  };

  return (
    <div>
      <p>MeetingId: {meetingId}</p>
      <p>HLS state: {hlsState}</p>
      {isHlsPlayable && <p>Viewers will now be able to watch the stream.</p>}
      <button onClick={toggleMic}>Toggle Mic</button>
      <button onClick={toggleWebcam}>Toggle Webcam</button>
      <button onClick={_handleToggleHls}>
        {isHlsStarted ? "Stop Hls" : "Start Hls"}
      </button>
    </div>
  );
};

export default MediaControlsContainer;
ParticipantGridContainer
This will get all the joined participants from useMeeting hook and render them individually. Here we will be using SingleParticipantContainer for rendering a single participant's webcam stream.
src/screens/speakerScreen/ParticipantsGridContainer.js
import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useMemo } from "react";
import SingleParticipantContainer from "./SingleParticipantContainer";

const ParticipantsGridContainer = () => {
  const { participants } = useMeeting();

  const participantIds = useMemo(
    () => [...participants.keys()],
    [participants]
  );

  return (
    <div>
      {participantIds.map((participantId) => (
        <SingleParticipantContainer
          {...{ participantId, key: participantId }}
        />
      ))}
    </div>
  );
};

export default ParticipantsGridContainer;
SingleParticipantContainer
This container will get participantId from props and will get webcam streams and other information from useParticipant hook.
It will render both Audio and Video streams of the participant whose participantId is provided from props.
src/screens/speakerScreen/SingleParticipantContainer.js
import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

const SingleParticipantContainer = ({ participantId }) => {
  const { micOn, micStream, isLocal, displayName, webcamStream, webcamOn } =
    useParticipant(participantId);

  const audioPlayer = useRef();

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (!isLocal && audioPlayer.current && micOn && micStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);

      audioPlayer.current.srcObject = mediaStream;
      audioPlayer.current.play().catch((err) => {
        if (
          err.message ===
          "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
        ) {
          console.error("audio" + err.message);
        }
      });
    } else {
      audioPlayer.current.srcObject = null;
    }
  }, [micStream, micOn, isLocal, participantId]);

  return (
    <div style={{ height: 200, width: 360, position: "relative" }}>
      <audio autoPlay playsInline controls={false} ref={audioPlayer} />
      <div
        style={{ position: "absolute", background: "#ffffffb3", padding: 8 }}
      >
        <p>Name: {displayName}</p>
        <p>Webcam: {webcamOn ? "on" : "off"}</p>
        <p>Mic: {micOn ? "on" : "off"}</p>
      </div>
      {webcamOn && (
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

export default SingleParticipantContainer;
Our speaker screen is completed, not we can start coding ViewerScreenContainer

Step 4: Viewer Screen
Viewer screen will be used for viewer participants, they will be watching the HLS stream when speaker starts to stream.
Same as Speaker screen this screen will also have initialization process.
src/screens/ViewerScreenContainer.js
import {
  MeetingConsumer,
  Constants,
  MeetingProvider,
  useMeeting,
} from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";
import { authToken } from "../api";

const HLSPlayer = () => {
  const { hlsUrls, hlsState } = useMeeting();

  const playerRef = useRef(null);

  const hlsPlaybackHlsUrl = useMemo(() => hlsUrls.playbackHlsUrl, [hlsUrls]);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        autoStartLoad: true,
        defaultAudioCodec: "mp4a.40.2",
      });

      let player = document.querySelector("#hlsPlayer");

      hls.loadSource(hlsPlaybackHlsUrl);
      hls.attachMedia(player);
    } else {
      if (typeof playerRef.current?.play === "function") {
        playerRef.current.src = hlsPlaybackHlsUrl;
        playerRef.current.play();
      }
    }
  }, [hlsPlaybackHlsUrl, hlsState]);

  return (
    <video
      ref={playerRef}
      id="hlsPlayer"
      autoPlay
      controls
      style={{ width: "70%", height: "70%" }}
      playsInline
      playing
      onError={(err) => console.log(err, "hls video error")}
    ></video>
  );
};

const ViewerScreenContainer = ({ meetingId }) => {
  return (
    <MeetingProvider
      token={authToken}
      config={{ meetingId, name: "C.V. Raman", mode: "VIEWER" }}
      joinWithoutUserInteraction
    >
      <MeetingConsumer>
        {({ hlsState }) =>
          hlsState === Constants.hlsEvents.HLS_PLAYABLE ? (
            <HLSPlayer />
          ) : (
            <p>Waiting for host to start stream...</p>
          )
        }
      </MeetingConsumer>
    </MeetingProvider>
  );
};

export default ViewerScreenContainer;
Our ViewerScreen is completed, now we can test our application.
npm run start

Output of Interactive Live Streaming App


GIFReact Live Streaming:

Source Code of this app is available in this GithubRepo.

What Next ?
This was a very basic example of interactive Live Streaming App using Video SDK, you can customize it in your way.

Add more CSS to make the UI more interactive
Add Chat using PubSub
Implement Change Mode, by this we can switch any participant from Viewer to Speaker, or vice versa.
You can also take reference from our Prebuilt App which is build using VideoSDK's React package. Here is the Github Repo.
More React Resources
React Video Call Quick Start Docs
React Interactive Live Streaming Quick Start Docs
Build a Video Chat App with React Hooks
Code Samples
Conclusion
With this, we successfully built the React Interactive Live Streaming app with video SDK. You can always refer to our documentations. if you want to add features like chat messaging and screen sharing. If you have any problem with the implementation, Please contact us via our Discord community.

Don't forget to share this article on Twitter .

Top comments (0)
Subscribe
pic
Add to the discussion
Code of Conduct • Report abuse
DEV Community

Awesome CSS Tools


A collection of 70 awesome, web-based tools which generate pure CSS without the need for JS or any external libraries.

Read next
cesarbhering profile image
How to make a Squarespace domain work with Netlify
Cesar Bhering - Feb 24

yogini16 profile image
Leading Meetings for Software Engineers: Guidelines
yogini16 - Feb 28

scofieldidehen profile image
Top Countries to Find Remote Roles in 2024
Scofield Idehen - Feb 27

ahaque98 profile image
What is LOGGING in .NET [8.0] MVC?
Ahsanul Haque - Feb 27


Video SDK
Follow
Real-time video infrastructure for every developer
Sign Up and collect your free 10,000 minutes

𝗧𝗿𝘆 - 𝗳𝗿𝗲𝗲!
More from Video SDK
🔥 Building a video chat app with screen-sharing and React hooks 🤯
#react #webdev #javascript #discuss
Build a JavaScript Live Streaming App with Video SDK
#javascript #webdev #tutorial #react
How to Build a React Native Video Calling App with Callkeep using Firebase and Video SDK
#javascript #react #reactnative #webrtc
DEV Community

Become a Moderator!
Check out this survey and help us moderate our community by becoming a tag moderator here at DEV.

import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

const SingleParticipantContainer = ({ participantId }) => {
  const { micOn, micStream, isLocal, displayName, webcamStream, webcamOn } =
    useParticipant(participantId);

  const audioPlayer = useRef();

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (!isLocal && audioPlayer.current && micOn && micStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);

      audioPlayer.current.srcObject = mediaStream;
      audioPlayer.current.play().catch((err) => {
        if (
          err.message ===
          "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
        ) {
          console.error("audio" + err.message);
        }
      });
    } else {
      audioPlayer.current.srcObject = null;
    }
  }, [micStream, micOn, isLocal, participantId]);

  return (
    <div style={{ height: 200, width: 360, position: "relative" }}>
      <audio autoPlay playsInline controls={false} ref={audioPlayer} />
      <div
        style={{ position: "absolute", background: "#ffffffb3", padding: 8 }}
      >
        <p>Name: {displayName}</p>
        <p>Webcam: {webcamOn ? "on" : "off"}</p>
        <p>Mic: {micOn ? "on" : "off"}</p>
      </div>
      {webcamOn && (
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

export default SingleParticipantContainer;
import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

const SingleParticipantContainer = ({ participantId }) => {
  const { micOn, micStream, isLocal, displayName, webcamStream, webcamOn } =
    useParticipant(participantId);

  const audioPlayer = useRef();

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (!isLocal && audioPlayer.current && micOn && micStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);

      audioPlayer.current.srcObject = mediaStream;
      audioPlayer.current.play().catch((err) => {
        if (
          err.message ===
          "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
        ) {
          console.error("audio" + err.message);
        }
      });
    } else {
      audioPlayer.current.srcObject = null;
    }
  }, [micStream, micOn, isLocal, participantId]);

  return (
    <div style={{ height: 200, width: 360, position: "relative" }}>
      <audio autoPlay playsInline controls={false} ref={audioPlayer} />
      <div
        style={{ position: "absolute", background: "#ffffffb3", padding: 8 }}
      >
        <p>Name: {displayName}</p>
        <p>Webcam: {webcamOn ? "on" : "off"}</p>
        <p>Mic: {micOn ? "on" : "off"}</p>
      </div>
      {webcamOn && (
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

export default SingleParticipantContainer;