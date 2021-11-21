import { Transform } from 'stream';

export default class Cesar extends Transform {
  constructor(flag, options) {
    super(options);
    this.flag = flag;
  }

  _transform(chunk, encoding, callback) {
    try {
      if (this.flag === '1') {
        callback(null, chunk.toString().split('').map(this._encode).join(''));
      } else if (this.flag === '0') {
        callback(null, chunk.toString().split('').map(this._decode).join(''));
      } else {
        throw new Error(`Oops, invalid flag: ${this.flag}`);
      }
    } catch (err) {
      callback(err);
    }
  }

  _encode(char) {
    const code = char.charCodeAt(0);

    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      if (code === 122) return String.fromCharCode(97);
      if (code === 90) return String.fromCharCode(65);

      return String.fromCharCode(code + 1)
    }

    return char;
  }

  _decode(char) {
    const code = char.charCodeAt(0);

    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      if (code === 97) return String.fromCharCode(122);
      if (code === 65) return String.fromCharCode(90);

      return String.fromCharCode(code - 1)
    }

    return char;
  }
};
