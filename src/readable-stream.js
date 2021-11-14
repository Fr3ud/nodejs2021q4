import { Readable } from 'stream';
import { open, read, close } from 'fs';

export default class ReadableStream extends Readable {
  constructor(filename, options) {
    super(options);
    this.filename = filename;
    this.fd = null;
  }

  _construct(callback) {
    open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _read(n) {
    const buf = Buffer.alloc(n);

    read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
      close(this.fd, (error) => callback(error || err));
    } else {
      callback(err);
    }
  }
}
