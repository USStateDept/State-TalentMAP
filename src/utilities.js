import axios from 'axios';

export const ajax = url => (
  axios.get(url)
    .then((res) => {
      const data = res;
      return data;
    })
);

export default ajax;
