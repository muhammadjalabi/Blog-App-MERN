import React from 'react'

const Validate = (name, value) => {
  const REGEXP_PATTERN = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$';
  let errors = {};
  switch (name) {
    case 'name':
      errors.name = value.length === 0 ? 'A username is required' : '';
      break;
    case 'email':
      errors.email = value.length === 0
        ? 'Email is required!'
        : !value.match(REGEXP_PATTERN)
          ? 'Please enter a valid email'
          : '';
      break;
    case 'password':
      errors.password = value.length === 0
        ? 'Password is required!'
        : value.length < 8
          ? 'Password needs to be atleast 8 characters long!'
          : '';
      break;
    case 'title':
      errors.title = value.length === 0 ? 'A title is required' : '';
      break;
    case 'body':
      errors.body = value.length === 0 ? 'A description is required' : '';
      break;
    default:
      break;
  }

  return (
    <div>
      {errors}
    </div>
  )
}

export default Validate
