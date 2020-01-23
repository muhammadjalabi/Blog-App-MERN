import axios from 'axios';
import jwt_decode from 'jwt-decode'


import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from './types'
import setAuthToken from '../utils/setAuthToken'
// import { resetPost } from "./postActions";
// import { setErrors } from "./errorActions";

const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}
const toggleUserLoading = () => {
  return {
    type: TOGGLE_USER_LOADING
  }
}

const register = (user, history) => dispatch => {
  dispatch(toggleUserLoading())
  axios.post('/api/users/register', user).then(result => {
    dispatch(toggleUserLoading());
    localStorage.setItem('loginMessage', 'Successfully registered, now you can log in!')
    history.push('/login')
  })
    .catch(error => {
      dispatch(setErrors(error.response.data))
      dispatch(toggleUserLoading())
    })
}

const login = user => dispatch => {
  dispatch(toggleUserLoading())
  axios('/api/users/login', user).then(result => {
    dispatch(resetPost())
    localStorage.setItem('jwtToken' result.data.token)
    setAuthToken(result.data.token)
    const decodedToken = jwt_decode(result.data.token)
    dispatch(setCurrentUser(decodedToken))
    dispatch(toggleUserLoading())
  })
    .catch(error => {
      dispatch(setErrors(error.response.data))
      dispatch(toggleUserLoading())
    })
}

const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser())
}