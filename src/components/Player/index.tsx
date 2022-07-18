import React, { memo, ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { initMediaKeys, createMediaKeySession } from "./helpers/mediaKeys";
import { loadSourceBuffer } from "./helpers/loadSourceBuffer";

interface PlayerProps {
  videoUrl: string
  audioUrl: string
  videoMimeType: string
  audioMimeType: string
}

const Player = ({videoUrl, audioUrl, videoMimeType, audioMimeType}: PlayerProps): ReactElement => {
  const [$video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [src, setSrc] = useState<string | undefined >()

  useEffect(() => {
    const mediaSource = new MediaSource()

    const handleSourceOpen = (): void => {
      loadSourceBuffer(mediaSource, videoUrl, videoMimeType)
      loadSourceBuffer(mediaSource, audioUrl, audioMimeType)
    }
    
    mediaSource.addEventListener("sourceopen", handleSourceOpen);
    const src = URL.createObjectURL(mediaSource);
    setSrc(src)

    return () => {
      URL.revokeObjectURL(src)
      mediaSource.removeEventListener('sourceopen', handleSourceOpen)
    }
  }, [videoUrl, audioUrl, videoMimeType, audioMimeType]);

  useEffect(() => {
    if ($video != null) initMediaKeys($video);
  }, [$video]);

  const handleEncrypt = (
    e: SyntheticEvent<HTMLVideoElement, MediaEncryptedEvent>
  ) => {
    if ($video?.mediaKeys != null)
      createMediaKeySession(e.nativeEvent, $video.mediaKeys);
  };

  return (
    <video ref={setVideo} onEncrypted={handleEncrypt} src={src} controls preload="metadata">
        Video not supported.
    </video>
  )
};

export default memo(Player)