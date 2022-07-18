import { keySystemConfig } from "../services/keySystemConfig";
import { generateLicense } from "src/mokedData/responseWithKeys";
import { DRM_SYSTEM_TYPE } from "src/mokedData/mimeTypes";

export const initMediaKeys = async (
  video: HTMLVideoElement | null
): Promise<void> => {
  const keySystem = await navigator.requestMediaKeySystemAccess(
    DRM_SYSTEM_TYPE,
    keySystemConfig
  );
  const mediaKeys = await keySystem.createMediaKeys();

  video?.setMediaKeys(mediaKeys);
};

export const createMediaKeySession = (
  { initDataType, initData }: MediaEncryptedEvent,
  mediaKeys: MediaKeys | null | undefined
): void => {
  const session = mediaKeys?.createSession();
  session?.addEventListener("message", messageHandler);
  if (initData) session?.generateRequest(initDataType, initData);
};

function messageHandler({ target, message }: MediaKeyMessageEvent): void {
  const session = target as MediaKeySession;
  let license = generateLicense(message);
  session?.update(license);
}
