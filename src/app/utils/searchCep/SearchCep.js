const axios = require('axios').default;

class SearchCEP {
    static async getAddress(cep) {
        const response = await axios.get(
            `https://viacep.com.br/ws/${cep}/json`
        );
        return response.data;
    }
}

module.exports = SearchCEP;
