export const readArguments = args => {
  return args.reduce((acc, arg, idx) => {
    if (arg === '-c' || arg === '--config') {
      if (acc['config']) throw new Error(`Oops, wrong arguments: ${arg} is duplicated`);

      acc['config'] = args[idx + 1];
    }

    if (arg === '-i' || arg === '--input') {
      if (acc['input']) throw new Error(`Oops, wrong arguments: ${arg} is duplicated`);

      acc['input'] = args[idx + 1];
    }

    if (arg === '-o' || arg === '--output') {
      if (acc['output']) throw new Error(`Oops, wrong arguments: ${arg} is duplicated`);

      acc['output'] = args[idx + 1];
    }
    
    return acc
  }, {});
};
