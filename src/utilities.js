import axios from 'axios';

export const ajax = url => (
  axios.get(url)
    .then((res) => {
      const data = res;
      return data;
    })
);

export function validStateEmail(email) {
  const valid = (/@state.gov\s*$/.test(email));
  return valid;
}

export default ajax;
