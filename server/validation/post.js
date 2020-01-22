const Validator = require('validator');
const isEmpty = require('is-empty');

const convertEFtoES = data => {
  data = !isEmpty(data) ? data : '';
}

module.exports = validatePost = data => {
  let errors = {};
  let { title, body } = data
  convertEFtoES(title)
  convertEFtoES(body)
  if (Validator.isEmpty(title)) {
    errors.title = 'Title is required'
  }
  if (Validator.isEmpty(body)) {
    errors.body = 'A description is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};