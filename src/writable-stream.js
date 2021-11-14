import { Writable } from 'stream';
import { open, write, close } from 'fs';

export default class WritableStream extends Writable {
  constructor(filename, options) {
    super(options);
    this.filename = filename;
    this.fd = null;
  }

  _construct(callback) {
    open(this.filename, "a", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    if(this.fd !== null) {
      write(this.fd, chunk, callback);
    }
  }
  
  _destroy(err, callback) {
    if (this.fd) {
      close(this.fd, (error) => callback(error || err));
    } else {
      callback(err);
    }
  }
}
