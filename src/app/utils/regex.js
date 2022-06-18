const regex = {
    cpfValid: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,

    cnpjValid: /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/,

    cepValid: /^\d{5}-\d{3}$/
};

module.exports = regex;
