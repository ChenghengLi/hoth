
import React from 'react';
import { HMSPrebuilt } from '@100mslive/roomkit-react';

const VideoScreen = () => {
  return (
    <div style={{ height: "100vh" }}>
      <HMSPrebuilt roomCode="wez-twwo-uvw" />
    </div>
  );
};

export default VideoScreen;
