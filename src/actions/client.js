import axios from 'axios';
import api from '../api';
import { fetchUserToken } from '../utilities';

const fetchClient = clientId =>
  axios.get(`${api}/client/${clientId}/`, { headers: { Authorization: fetchUserToken() } })
    .then(({ data }) => data)
    .then(client => client)
    .catch(error => error);

export default fetchClient;
