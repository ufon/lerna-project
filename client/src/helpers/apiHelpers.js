export const CONTENT_TYPE_JSON = "application/json";

export const getRequestHeaders = accessToken => ({
  "Content-Type": CONTENT_TYPE_JSON,
  Authorization: `Bearer ${accessToken}`
});

export default getRequestHeaders;
