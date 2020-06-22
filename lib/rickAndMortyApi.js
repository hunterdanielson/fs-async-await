const request = require('superagent');

const getCharacter = async(id) => {
  const { body: { name, status, species } } = await request.get(`https://rickandmortyapi.com/api/character/${id}`);
  const returnObject = {
    name,
    status,
    species
  };
  return returnObject;
};

const getManyCharacters = arrayOfIds => {
  const promises = [];
  arrayOfIds.forEach(id => promises.push(getCharacter(id)));
  return Promise.all(promises);
};

module.exports = {
  getCharacter,
  getManyCharacters
};
