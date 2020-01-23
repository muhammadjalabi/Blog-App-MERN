import axios from 'axios';

export const setAuthToken = token => {
  token ? axios.defaults.headers.common['Authorization'] = token : delete axios.defaults.headers.common['Authorization']
}