import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Validate from '../../components/form/Validate';
import Register from '../../components/authentication/Register'

import { register } from '../../actions/authentication_actions'
import { clearErrors } from '../../actions/error_actions'

const RegisterPage = ({ history, register, auth, errors, clearErrors }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    errors: {}
  });

  useEffect(() => {
    const unlisten = history.listen(() => clearErrors());
    return () => unlisten();
  }, [history, clearErrors]);

  useEffect(() => {
    if (auth.isAuthenticated) history.push('/blog');
    setUser(user => {
      return { ...user, errors };
    });
  }, [errors, auth, history]);


  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  const handleBlur = event => {
    const { name, value } = event.target;
    const error = { ...user.errors, ...Validate(name, value).errors }
    setUser({ ...user, errors: { ...error } })
  }
  const handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = user;
    register({ name, email, password }, history)
  }

  return (
    <Register
      loading={auth.userLoading}
      user={{ ...user }}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit} />
  )
}
RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { register, clearErrors })(RegisterPage)
