const regex = {
    cpfValid: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,

    //RFC 5322 Format
    cnpjValid: /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/
};

module.exports = regex;
