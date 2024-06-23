import React from 'react'
import MuxPlayer from "@mux/mux-player-react"; 


export default function VideoPlayer() {
  return (
        <MuxPlayer
        playbackId="fqOgC00yLXZ3qg5K5MMV5vHUpLDxUNmX1GaA9dcXlznU"
        metadata={{
        video_id: "video-id-54321",
        video_title: "Test video title",
        viewer_user_id: "user-id-007",
        }}
    />
  )
}
