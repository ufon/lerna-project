import axios from "axios";

export class StreamService {
  constructor(axios) {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 5000
    });
  }

  getStreams = () => this.api.get("/streams");
  getStream = slug => this.api.get(`/streams/slug/${slug}`);
}

export default new StreamService(axios);
