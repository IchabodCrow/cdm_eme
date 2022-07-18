import React, { ReactElement, SyntheticEvent, useEffect, useRef, useState } from "react";
import { initMediaKeys, createMediaKeySession } from "./helpers/mediaKeys";
import { loadSourceBuffer } from "./helpers/loadSourceBuffer";

interface PlayerProps {
  videoUrl: string
  audioUrl: string
  videoMimeType: string
  audioMimeType: string
}

export const Player = ({videoUrl, audioUrl, videoMimeType, audioMimeType}: PlayerProps): ReactElement => {
  const [mediaSource] = useState(new MediaSource());
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.setAttribute('src', URL.createObjectURL(mediaSource));
    mediaSource.addEventListener("sourceopen", async () => {
     loadSourceBuffer(mediaSource, videoUrl, videoMimeType)
     loadSourceBuffer(mediaSource, audioUrl, audioMimeType)
    });
  }, [mediaSource, videoUrl, audioUrl, videoMimeType, audioMimeType]);

  useEffect(() => {
    initMediaKeys(videoRef.current);
  }, [videoRef]);

  const handleEncrypt = (e:SyntheticEvent<HTMLVideoElement, MediaEncryptedEvent>) => {
    createMediaKeySession(e.nativeEvent, videoRef.current?.mediaKeys)
  }

  return (
    <video ref={videoRef} onEncrypted={handleEncrypt} controls preload="metadata">
        Video not supported.
    </video>
  )
};
