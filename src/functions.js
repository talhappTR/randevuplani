import { definitions } from "./definitions.json";

export const gR = async (url, token) => {
  try {
    const apiUrl = definitions.api + url;
    const data = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }).then((resp) => resp.json());
    return data;
  } catch (error) {
    return false;
  }
};
