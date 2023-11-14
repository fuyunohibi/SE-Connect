import { request } from "./index";
import { HTTP_METHODS } from "./const";

class Authentication {
  static registerWithIdentifier(email) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/register/identifier?email=${encodeURIComponent(email)}`,
    };

    return request(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  static registerWithPassword(password) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/register/password?password=${encodeURIComponent(password)}`,
    };

    return request(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static registerUserDetails(options) {
    const formData = new FormData();

    formData.append("firstname", options.firstname);
    formData.append("lastname", options.lastname);
    formData.append("ID", options.ID);
    formData.append("year_of_study", options.year_of_study);
    formData.append("profile_picture", options.profile_picture);

    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/register/user-details`,
      body: formData, 
    };

    return request(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        throw { ...error.response.data, ok: false };
      });
  }

  static loginWithIdentifier(options) {
    const { email } = options;

    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/login/identifier?email=${encodeURIComponent(email)}`,
      body: options.body,
      token: options.token,
    };

    return request(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        throw { ...error.response.data, ok: false };
      });
  }

  static loginWithPassword(options) {
    const { password } = options;

    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/login/password?password=${encodeURIComponent(password)}`,
      body: options.body,
      token: options.token,
    };

    return request(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
        throw { ...error.response.data, ok: false };
      });
  }
}

export default Authentication;