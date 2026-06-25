export function sanitizeText(value, maxLength = 120) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
}

export function isValidTime(value) {
  return !value || /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function createSalt() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export async function hashPassword(password, salt) {
  return sha256(`${salt}:${password}`);
}

// SHA-256 local para evitar dependencias externas e manter compatibilidade com Expo Go.
function sha256(message) {
  const bytes = utf8Bytes(message);
  const words = [];
  const hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const constants = buildConstants();
  const bitLength = bytes.length * 8;
  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);
  for (let i = 7; i >= 0; i -= 1) bytes.push((bitLength / (2 ** (i * 8))) & 0xff);

  for (let chunk = 0; chunk < bytes.length; chunk += 64) {
    for (let i = 0; i < 16; i += 1) {
      words[i] =
        (bytes[chunk + i * 4] << 24) |
        (bytes[chunk + i * 4 + 1] << 16) |
        (bytes[chunk + i * 4 + 2] << 8) |
        bytes[chunk + i * 4 + 3];
    }
    for (let i = 16; i < 64; i += 1) {
      words[i] = add(sigma1(words[i - 2]), words[i - 7], sigma0(words[i - 15]), words[i - 16]);
    }

    let [a, b, c, d, e, f, g, h] = hash;
    for (let i = 0; i < 64; i += 1) {
      const t1 = add(h, bigSigma1(e), choose(e, f, g), constants[i], words[i]);
      const t2 = add(bigSigma0(a), majority(a, b, c));
      h = g;
      g = f;
      f = e;
      e = add(d, t1);
      d = c;
      c = b;
      b = a;
      a = add(t1, t2);
    }
    hash[0] = add(hash[0], a);
    hash[1] = add(hash[1], b);
    hash[2] = add(hash[2], c);
    hash[3] = add(hash[3], d);
    hash[4] = add(hash[4], e);
    hash[5] = add(hash[5], f);
    hash[6] = add(hash[6], g);
    hash[7] = add(hash[7], h);
  }
  return hash.map((value) => value.toString(16).padStart(8, '0')).join('');
}

function utf8Bytes(value) {
  return unescape(encodeURIComponent(value)).split('').map((char) => char.charCodeAt(0));
}

function rightRotate(value, amount) {
  return (value >>> amount) | (value << (32 - amount));
}

function add(...values) {
  return values.reduce((total, value) => (total + value) >>> 0, 0);
}

function choose(x, y, z) {
  return (x & y) ^ (~x & z);
}

function majority(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}

function bigSigma0(x) {
  return rightRotate(x, 2) ^ rightRotate(x, 13) ^ rightRotate(x, 22);
}

function bigSigma1(x) {
  return rightRotate(x, 6) ^ rightRotate(x, 11) ^ rightRotate(x, 25);
}

function sigma0(x) {
  return rightRotate(x, 7) ^ rightRotate(x, 18) ^ (x >>> 3);
}

function sigma1(x) {
  return rightRotate(x, 17) ^ rightRotate(x, 19) ^ (x >>> 10);
}

function buildConstants() {
  return [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
}
