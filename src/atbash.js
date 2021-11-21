import { Transform } from 'stream';

export default class Atbash extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      callback(null, chunk.toString().split('').map(this._encode).join(''));
    } catch (err) {
      callback(err);
    }
  }

  _encode(char) {
    if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
      return String.fromCharCode(25 - (char.charCodeAt(0) - 65) + 65)
    }

    if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
      return String.fromCharCode(25 - (char.charCodeAt(0) - 97) + 97)
    }

    return char
  }
};
