/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
function cnpjValidation(cnpj) {
  let userCnpj = 0;
  userCnpj = cnpj.replace(/[^\d]+/g, '');

  if (userCnpj === '') return false;

  if (userCnpj.length !== 14) return false;

  if (
    userCnpj === '00000000000000' ||
    userCnpj === '11111111111111' ||
    userCnpj === '22222222222222' ||
    userCnpj === '33333333333333' ||
    userCnpj === '44444444444444' ||
    userCnpj === '55555555555555' ||
    userCnpj === '66666666666666' ||
    userCnpj === '77777777777777' ||
    userCnpj === '88888888888888' ||
    userCnpj === '99999999999999'
  )
    return false;

  let size = 0;
  let numbers = 0;
  let digits = 0;
  let sum = 0;
  let pos = 0;
  let i = 0;
  let result = 0;

  size = userCnpj.length - 2;
  numbers = userCnpj.substring(0, size);
  digits = userCnpj.substring(size);
  sum = 0;
  pos = size - 7;
  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(0)) return false;

  size += 1;
  numbers = userCnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(1)) return false;

  return true;
}

module.exports = cnpjValidation;
