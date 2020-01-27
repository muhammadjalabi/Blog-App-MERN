import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from '../../components/authentication/Login'
import Validate from '../../components/form/Validate';
import { login } from '../../actions/authentication_actions'
import { clearErrors } from '../../actions/error_actions'

const LoginPage = ({ login, auth, errors, history, clearErrors }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    errors: {}
  })
  const [message, setMessage] = useState('');
  useEffect(() => {
    const unlisten = history.listen(() => clearErrors());
    if (localStorage.loginMessage) {
      setMessage(localStorage.loginMessage)
      localStorage.setItem('loginMessage', '');
    }
    return () => unlisten();
  }, [history, clearErrors]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/blog')
    }
    setUser(user => {
      return { ...user, errors };
    });
  }, [auth, errors, history]);

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleBlur = event => {
    const { name, value } = event.target;
    const error = { ...user.errors, ...Validate(name, value).errors };
    setUser({ ...user, errors: { ...error } });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = user;
    login({ email, password })
  }

  return (
    <Login
      message={message}
      loading={auth.userLoading}
      user={{ ...user }}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit} />
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { login, clearErrors })(LoginPage)
