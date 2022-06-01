import axios from "axios";
import qs from "qs";
import Toast from "./toast";

const baseUrl = "http://localhost:5000/";
const GET = "GET";
const DELETE = "DELETE";
const POST = "POST";
const PUT = "PUT";
const PATCH = "PATCH";

const ACTION_HANDLERS = {
  [GET]: (url, data, headers) => {
    let queryUrl = url;

    if (data !== undefined) {
      const query = qs.stringify(data);

      queryUrl = `${queryUrl}?${query}`;
    }

    return axios.get(baseUrl + queryUrl, {
      headers,
    });
  },

  [DELETE]: (url, data, headers) =>
    axios.delete(baseUrl + url, { headers, data }),

  [POST]: (url, data, headers) =>
    axios.post(baseUrl + url, data, {
      headers,
    }),

  [PATCH]: (url, data, headers) =>
    axios.patch(baseUrl + url, data, {
      headers,
    }),

  [PUT]: (url, data, headers) =>
    axios.put(baseUrl + url, data, {
      headers,
    }),
};

function setHeaders({ contentType }) {
  // set contentType
  if (contentType) {
    axios.defaults.headers.post["Content-Type"] = contentType;
    axios.defaults.headers.post.Accept = "application/json";
  }
}

function handleError(error) {
  const { response = {} } = error || {};

  const { MESSAGE } = response.data || {};

  MESSAGE && Toast.error(MESSAGE);

  return Promise.reject(error);
}
const fetchUrl = ({ type, url, data = {}, config = {}, hash = "" }) => {
  setHeaders(config);
  const handler = ACTION_HANDLERS[type.toUpperCase()];

  return handler(url, data, config.headers)
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

export default fetchUrl;
