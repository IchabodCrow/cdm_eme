import {
  OPUS_TYPE,
  VORBIS_TYPE,
  VP8_TYPE,
  VP9_TYPE,
} from "src/mokedData/mimeTypes";

export const keySystemConfig = [
  {
    initDataTypes: ["keyids", "webm"],
    audioCapabilities: [
      { contentType: OPUS_TYPE },
      { contentType: VORBIS_TYPE },
    ],
    videoCapabilities: [{ contentType: VP9_TYPE }, { contentType: VP8_TYPE }],
  },
];
