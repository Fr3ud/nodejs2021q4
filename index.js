import { pipeline } from 'stream';
import { readArguments } from './src/read-arguments.js';
import { createInputStream } from './src/create-input-stream.js';
import { createOutputStream } from './src/create-output-stream.js';
import { readConfig } from './src/read-config.js';

const main = () => {
  try {
    const args = readArguments(process.argv.slice(2));
    const encoders = readConfig(args.config);
    const input = createInputStream(args.input);
    const output = createOutputStream(args.output);
    
    pipeline(input, ...encoders, output, (err) => {
      if (err) {
        process.stderr.write(`Oops, something went wrong: ${err}`);
        process.stdout.write('\n');
        process.exit(1);
      } else {
        process.stdout.write('Success');
        process.stdout.write('\n');
      }
    });
  } catch (error) {
    process.stderr.write(`${error}`);
    process.stdout.write('\n');
    process.exit(1);
  }
};


main();
