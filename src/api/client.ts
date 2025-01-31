
const BASE_URL = "https://679788b9c2c861de0c6d12f2.mockapi.io/vue-project";


type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null,
): Promise<T | void> {

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(BASE_URL + url, options);

  if (response.status === 204) {
    return;
  }

  return await response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: any) => request<T>(url, "PATCH", data),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};