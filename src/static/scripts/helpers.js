export async function makeRequest(url) {
  const response = await fetch(url);
  const result = await response.json();

  return result;
}
