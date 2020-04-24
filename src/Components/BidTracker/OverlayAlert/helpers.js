export const getBidIdUrl = (id = '', isPublic = false, userId = '') => {
  let url = '/profile/bidtracker';
  if (isPublic && userId) {
    url = `${url}/public/${userId}`;
  }
  if (id) {
    url = `${url}/${id}`;
  }
  return url;
};

export default getBidIdUrl;
