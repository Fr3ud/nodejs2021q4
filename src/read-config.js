import ROT8 from './rot8.js'
import Cesar from './cesar.js'
import Atbash from './atbash.js';

const validateConfig = (config) => {
  const validConfig = ['C0', 'C1', 'A', 'R0', 'R1'];

  if (!validConfig.includes(config)) {
    throw new Error('Oops, invalid config');
  }
}

export const readConfig = config => {
  const encoders = [];

  if (!config) throw new Error('Oops, config is missed');

  config.split('-').forEach(option => {
    validateConfig(option)

    if (option === 'R0' || option === 'R1') {
      encoders.push(new ROT8(option[1]));
    }

    if (option === 'C0' || option === 'C1') {
      encoders.push(new Cesar(option[1]));
    }

    if (option === 'A') {
      encoders.push(new Atbash());
    }
  });

return encoders;
};
