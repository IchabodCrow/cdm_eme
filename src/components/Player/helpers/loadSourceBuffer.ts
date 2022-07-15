async function fetchArrayBuffer(url: string, sourceBuffer: SourceBuffer) {
  const response = await fetch(url);
  const rawChunk = await response.arrayBuffer();
  const chunk = new Uint8Array(rawChunk);
  sourceBuffer?.appendBuffer(chunk);
}

export function loadSourceBuffer(
  mediaSource: MediaSource,
  mediaURL: string,
  mediaMimeType: string
) {
  const sourceBuffer = mediaSource.addSourceBuffer(mediaMimeType);
  fetchArrayBuffer(mediaURL, sourceBuffer);
}
