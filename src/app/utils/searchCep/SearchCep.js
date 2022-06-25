const axios = require('axios').default;

class SearchCEP {
  async getAddress(cep) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    return response.data;
  }
}

module.exports = new SearchCEP();
