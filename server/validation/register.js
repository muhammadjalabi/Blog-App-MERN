const Validator = require('validator');
const isEmpty = require('is-empty');

const convertEFtoES = data => {
  data = !isEmpty(data) ? data : '';
}

module.exports = validateRegister = data => {
  let errors = {};
  let { name, email, password } = data;
  convertEFtoES(name);
  convertEFtoES(email);
  convertEFtoES(password);

  if (Validator.isEmpty(name)) {
    errors.name = 'Username is required'
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email is required'
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Enter a valid email address'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required'
  } else if (!Validator.isLength(password, { min: 8, max: 35 })) {
    errors.password = 'Password must at least be 8 characters, and max 35 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};