import { SET_ERRORS } from './types'
const setErrors = error => {
  return { type: SET_ERRORS, payload: error }
}

const clearErrors = () => {
  return { type: SET_ERRORS, payload: {} }
}

export default = { setErrors, clearErrors }