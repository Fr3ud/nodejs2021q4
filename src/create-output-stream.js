import WritableStream from './writable-stream.js'
import { lstatSync } from 'fs';

export const createOutputStream = path => {
  console.log(path);
  try {
    if (!path) return process.stdout;

    lstatSync(path).isFile();

    return new WritableStream(path, { highWaterMark: 1 });
  } catch (error) {
    throw new Error('Oops, invalid output path');
  }
};
