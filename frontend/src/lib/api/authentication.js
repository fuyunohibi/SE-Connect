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

  static loginWithIdentifier(email) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/login/identifier?email=${encodeURIComponent(email)}`,
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

  static loginWithPassword(email, password) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/login/password`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email,
        password: password,
      },
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
}

export default Authentication;