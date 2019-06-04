import axios from "axios";

import { getRequestHeaders } from "../helpers/apiHelpers";

import tokenHelpers from "../helpers/tokenHelpers";

export class StreamService {
  constructor(axios) {
    const accessToken = tokenHelpers.read();
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 5000,
      headers: getRequestHeaders(accessToken),
    });
  }

  getStreams = () => this.api.get("/streams");
  getStream = slug => this.api.get(`/streams/slug/${slug}`);
  updateStream = data => this.api.post("/stream", data);
}

export default new StreamService(axios);
