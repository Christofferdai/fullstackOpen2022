import axios from 'axios';

const BaseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  return axios.get(`${BaseURL}all`).then(response => response.data)
}

export default {
  getAll
}