import env from '../../env';

exports.isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};


exports.validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};

exports.isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

exports.empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};