import React from 'react';
import "./App.css";
import {
  VP8_TYPE,
  VP9_TYPE,
  OPUS_TYPE,
  VORBIS_TYPE,
} from "./mokedData/mimeTypes";
import bunnyVideoUrl from "./assets/big-buck-bunny_trailer_video-clearkey-encrypted.webm";
import bunnyAudioUrl from "./assets/big-buck-bunny_trailer_audio-clearkey-encrypted.webm";
import sintelVideoUrl from "./assets/sintel-trailer_video-clearkey-subsample-encrypted.webm";
import sintelAudioUrl from "./assets/sintel-trailer_audio-clearkey-subsample-encrypted.webm";
import bunnyOriginVideoUrl from "./assets/big-buck-bunny_trailer.webm";
import sintelOriginVideoUrl from "./assets/sintel.webm";
import { Player } from "./components/Player";

function App() {
  return (
    <div className="App">
      <div>Origin video</div>
      <div>Decrypted Video</div>
      <div>Encrypted Video</div>
      <video src={bunnyOriginVideoUrl} controls preload="metadata">Video not supported.</video>
      <Player
        videoUrl={bunnyVideoUrl}
        audioUrl={bunnyAudioUrl}
        videoMimeType={VP8_TYPE}
        audioMimeType={VORBIS_TYPE}
        />
      <video src={bunnyVideoUrl} controls preload="metadata">
        Video not supported.
      </video>
      <video src={sintelOriginVideoUrl} controls preload="metadata">Video not supported.</video>
      <Player
        videoUrl={sintelVideoUrl}
        audioUrl={sintelAudioUrl}
        videoMimeType={VP9_TYPE}
        audioMimeType={OPUS_TYPE}
      />
      <video src={sintelVideoUrl} controls preload="metadata">
        Video not supported.
      </video>
    </div>
  );
}

export default App;