const Validator = require('validator');
const isEmpty = require('is-empty')

const convertEFtoES = data => {
  data = !isEmpty(data) ? data : '';
}

module.exports = validateLogin = data => {
  let errors = {};
  let { email, password } = data;
  convertEFtoES(email);
  convertEFtoES(password);

  if (Validator.isEmpty(email)) {
    errors.email = 'An E-mail is required'
  } else if (!Validator.isEmail(email)) {
    errors.email = 'You need a valid e-mail address';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password required'
  } else if (!Validator.isLength(password, { min: 8, max: 35 })) {
    errors.password = 'Password needs minimum of 8 characters, and maximum of 35';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}