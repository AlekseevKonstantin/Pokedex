import axios from 'axios';

export const createRequest = () => {

  const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 6000,
    Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
  }); 

  function fetchList (offset, count) {
    return createAxios(
      instance.get('/pokemon', 
      { 
        params: {
          'offset': `${offset}`,
          'limit': `${count}`
        } 
      }));
  }

  function fetchDesc (name) {
    return createAxios(instance.get(`/pokemon/${name}`));
  }

  function fetchTypeList () {
    return createAxios(instance.get('/type'));
  }

  async function createAxios (res) {
    return await res
    .then(response => {
      return {status: response.status, data: response.data}
    })
    .catch(error => {
      return {config: error.config, msg: error.message}
    });
  }

  return {
    fetchList,
    fetchDesc,
    fetchTypeList
  };
}