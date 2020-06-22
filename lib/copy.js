const fs = require('fs/promises');

module.exports = async(src, dst) => {
  const promiseFile = await fs.readFile(src, { encoding: 'utf-8' });
  await fs.writeFile(dst, promiseFile);
};
