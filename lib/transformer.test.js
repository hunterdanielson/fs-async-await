const fs = require('fs/promises');
const { transform } = require('./transformer');

describe('transform function', () => {
  beforeAll(() => {
    return fs.writeFile('./test.txt', 'tHIs IS a TeST');
  });
  afterAll(() => {
    return fs.unlink('./test.txt');
  });

  it('should transform a file', async() => {
    const transformed = await transform('./test.txt');
    expect(transformed).toEqual('E A  ST');
  });
});

