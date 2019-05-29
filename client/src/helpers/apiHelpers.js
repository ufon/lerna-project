export const CONTENT_TYPE_JSON = "application/json";

export const getRequestHeaders = accessToken =>
  accessToken
    ? {
        "Content-Type": CONTENT_TYPE_JSON,
        Authorization: `Bearer ${accessToken}`
      }
    : { "Content-Type": CONTENT_TYPE_JSON };

export default getRequestHeaders;
