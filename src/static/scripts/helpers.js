export async function getRequest(url) {
  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export async function postRequest(endpoint, formData) {
  const response = await fetch(`http://localhost:3080/api/${endpoint}`, {
    method: 'POST',
    body: new FormData(formData),
  });
  return await response.json();
}
