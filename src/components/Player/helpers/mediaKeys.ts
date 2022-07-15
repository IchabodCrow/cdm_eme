import { keySystemConfig } from "../services/keySystemConfig";
import { generateLicense } from "src/mokedData/responseWithKeys";
import { DRM_SYSTEM_TYPE } from "src/mokedData/mimeTypes";

export const initMediaKeys = async (
  video: HTMLVideoElement | null
): Promise<MediaKeys> => {
  const keySystem = await navigator.requestMediaKeySystemAccess(
    DRM_SYSTEM_TYPE,
    keySystemConfig
  );
  const mediaKeys = await keySystem.createMediaKeys();
  const videoHasMediaKeys = video?.mediaKeys;

  if (!videoHasMediaKeys) video?.setMediaKeys(mediaKeys);

  return mediaKeys;
};

export const createMediaKeySession = (
  { initDataType, initData }: MediaEncryptedEvent,
  mediaKeys: MediaKeys
): void => {
  const session = mediaKeys.createSession();
  session?.addEventListener("message", messageHandler);
  if (initData) session?.generateRequest(initDataType, initData);
};

function messageHandler({ target, message }: MediaKeyMessageEvent): void {
  const session = target as MediaKeySession;
  let license = generateLicense(message);
  session?.update(license);
}
