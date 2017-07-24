// because Fetch doesn't recognize error responses as
// actual errors since it's technically completing the response...
export default function handleApiErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}
