const fs = require('fs').promises;

const transform = async(src) => {
  const promiseFile = await fs.readFile(src, { encoding: 'utf-8' });
  const replacedCaps = promiseFile.replace(/[A-Z]/g, '');
  const upperCased = replacedCaps.toUpperCase();
  const reversedWord = upperCased.split('').reverse().join('');
  return reversedWord;
};

module.exports = {
  transform
};
