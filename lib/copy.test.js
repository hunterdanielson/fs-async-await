const fs = require('fs/promises');
const copy = require('./copy');

describe('copy function', () => {
  beforeAll(() => {
    return fs.writeFile('./test.txt', 'This is A test');
  });

  afterAll(() => {
    return Promise.all([
      fs.unlink('./test.txt'),
      fs.unlink('./test-copy.txt')
    ]);
  });

  it('copies a files contents to a specified destination', async() => {
    await copy('./test.txt', './test-copy.txt');
    const testCopy = await fs.readFile('./test-copy.txt', { encoding: 'utf-8' });
    expect(testCopy).toEqual('This is A test');
  });
});
