const baseUrl = "https://dspjll-8082.csb.app/api";

export async function get(url) {
  const response = await fetch(baseUrl + url, {
    method: "GET",
    headers: createHeader(),
  });
  return await response.json();
}

export async function post(url, payload) {
  const resposne = await fetch(baseUrl + url, {
    method: "POST",
    headers: createHeader(),
    body: JSON.stringify(payload),
  });
  return await resposne.json();
}

export async function postFile(url, payload) {
  const header = createHeader();
  header.delete("Content-Type");
  const response = await fetch(baseUrl + url, {
    method: "POST",
    headers: header,
    body: payload,
  });
  return await response.json();
}

function createHeader() {
  let header = new Headers();
  header.set("Authorization", "Bearer " + localStorage.getItem("token"));
  header.set("Content-Type", "application/json");
  return header;
}