import { Transform } from 'stream';

export default class ROT8 extends Transform {
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
    if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + 8) % 26) + 65)
    }

    if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
      return String.fromCharCode( ((char.charCodeAt(0) - 97 + 8) % 26) + 97)
    }

    return char
  }

  _decode(char) {
    if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + 18) % 26) + 65)
    }

    if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
      return String.fromCharCode(((char.charCodeAt(0) - 97 + 18) % 26) + 97)
    }

    return char
  }
};
