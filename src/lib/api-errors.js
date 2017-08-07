export default function handleApiErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}
