import axios from "axios";
var BASE_URL = "http://localhost:5000/api/v1";
async function PostRequestHandler(url: string, data: any) {
  const response = await axios.post(`${BASE_URL}${url}`, data, {
    method: "POST",
    headers: {
      authorization: localStorage.getItem("authorization") || "",
    },
  });
  return response.data;
}

async function SetLocalStorageItems(label: string, value: any) {
  localStorage.setItem(label, value);
}

async function fetchData(url: string) {
  const response = await axios.get(`${BASE_URL}${url}`, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("authorization") || "",
    },
  });
  if (response.status == 200) {
    return response.data;
  } else {
    return [];
  }
}
export { PostRequestHandler, SetLocalStorageItems, fetchData };
