import axios from "axios";
const baseURL = 'http://localhost:3001/persons/'

const getAll = () => {
  return axios.get(baseURL).then(res => res.data)
}

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then(res => res.data)
}

const update = (id,updatedPerson) => {
  return axios.put(`${baseURL}${id}`, updatedPerson).then(res => res.data)
}

const deletePerson = (id) => {
  console.log('id is', id)
  return axios.delete(`${baseURL}${id}`).then(res => res.data)
}

export default {
  getAll,
  create,
  update,
  deletePerson
}