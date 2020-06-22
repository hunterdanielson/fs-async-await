const { getCharacter, getManyCharacters } = require('./rickAndMortyApi');

jest.mock('superagent', () => ({
  get: () => {
    return Promise.resolve({
      body: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human'
      }
    });
  }
}));

describe('get character function', () => {
  it('gets a character by id', async() => {
    const character = await getCharacter(1);
    expect(character).toEqual({ 'name': 'Rick Sanchez', 'species': 'Human', 'status': 'Alive' });
  });
  
  it('gets many characters with an array of ids', async() => {
    const characters = await getManyCharacters([1, 1, 1]);
    expect(characters).toEqual([{ 'name': 'Rick Sanchez', 'species': 'Human', 'status': 'Alive' }, { 'name': 'Rick Sanchez', 'species': 'Human', 'status': 'Alive' }, { 'name': 'Rick Sanchez', 'species': 'Human', 'status': 'Alive' }]);
  });
});
