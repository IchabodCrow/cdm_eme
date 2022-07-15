const videoKeyId = "LNsO1hGYU-eFBnHD6ZBsPA";
const audioKeyId = "QU-g5jS0AZ7fyJfhfCE3hg";
const videoKey = new Uint8Array([
  0x80, 0x8b, 0x9a, 0xda, 0xc3, 0x84, 0xde, 0x1e, 0x4f, 0x56, 0x14, 0x0f, 0x4a,
  0xd7, 0x61, 0x94,
]);
const audioKey = new Uint8Array([
  0xac, 0xbd, 0x22, 0xd9, 0x08, 0x35, 0x19, 0x78, 0x7f, 0x34, 0x37, 0x6c, 0x41,
  0x94, 0xb3, 0x97,
]);

const keyMap = { [videoKeyId]: videoKey, [audioKeyId]: audioKey };

function toBase64(u8arr: Uint8Array) {
  return btoa(String.fromCharCode.apply(null, u8arr as unknown as number[]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=*$/, "");
}

export function generateLicense(message: ArrayBuffer) {
  const request = JSON.parse(new TextDecoder().decode(message));
  const [kid] = request.kids;
  const keyObj = {
    kty: "oct",
    alg: "A128KW",
    kid: kid,
    k: toBase64(keyMap[kid as keyof typeof keyMap]),
  };

  return new TextEncoder().encode(
    JSON.stringify({
      keys: [keyObj],
    })
  );
}
