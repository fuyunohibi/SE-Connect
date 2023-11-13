export const HTTP_METHODS = {
  delete: "DELETE",
  get: "GET",
  patch: "PATCH",
  post: "POST",
  put: "PUT",
};

export const STATUS_CODES = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  tooManyRequest: 429,
  internalError: 500,
  badGateway: 502,
  unavailable: 503,
  timeout: 504,
};

export const ERROR_CODES = {
  timeout: "ECONNABORTED",
};
