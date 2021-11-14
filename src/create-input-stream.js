import { lstatSync } from 'fs';
import ReadableStream from './readable-stream.js';

export const createInputStream = path => {
  try {
    if (!path) return process.stdin;

    lstatSync(path).isFile();
    
    return new ReadableStream(path, { highWaterMark: 1 });
  } catch (err) {
    throw new Error('Oops, invalid input path');
  }
};
