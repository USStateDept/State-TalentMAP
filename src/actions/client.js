import api from '../api';

export const fetchClient = clientId =>
  api().get(`/fsbid/client/${clientId}/`)
    .then(({ data }) => data)
    .then(client => client)
    .catch(error => error);

export const fetchClientWaivers = clientId =>
  api().get(`/fsbid/client/${clientId}/waivers/`)
    .then(({ data }) => data)
    .then(client => client)
    .catch(error => error);

export const fetchClientBids = clientId =>
  api().get(`/fsbid/client/${clientId}/bids/`)
    .then(({ data }) => data)
    .then(client => client)
    .catch(error => error);

// This combines fetchClient, fetchClientWaivers, and fetchClientBids into one response
export const fetchAllClientData = clientId => (
  Promise.all([fetchClient(clientId), fetchClientWaivers(clientId), fetchClientBids(clientId)])
    .then((results) => {
      // if any promise returned with errors, return the error
      let err;
      results.forEach((result) => {
        if (result instanceof Error) {
          err = result;
        }
      });
      if (err) { return err; }
      // object 0 is the main client data
      const client = results[0];
      // object 1 is the results
      client.waivers = results[1].results;
      // object 2 is the bids
      client.bids = results[2].results;
      // return the combined object
      return client;
    })
    .catch(error => error)
);
