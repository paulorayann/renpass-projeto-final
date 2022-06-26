const axios = require('axios').default;

class SearchCEP {
  async getAddress(zipCode) {
    const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json`);
    return response.data;
  }
}

module.exports = new SearchCEP();
