import axios from "axios";

import { getRequestHeaders } from "../helpers/apiHelpers";

import tokenHelpers from "../helpers/tokenHelpers";

export class UserService {
  constructor(axios) {
    const accessToken = tokenHelpers.read();
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 5000,
      headers: getRequestHeaders(accessToken)
    });
  }

  getProfile = () => this.api.get("/profile");
  login = data => this.api.post("/auth/login", data);
  register = data => this.api.post("/auth/register", data);
}

export default new UserService(axios);
