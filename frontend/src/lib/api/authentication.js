import { request } from "./index";
import { HTTP_METHODS } from "./const";

class Authentication {
  static registerWithIdentifier(email) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/signup/identifier`,
      body: { email },
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

  static registerWithPassword(registration_id, password) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/signup/password`,
      body: { registration_id, password },
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

  static registerUserDetails(registration_id, firstname, lastname, ID, year_of_study, profile_picture) {
    const formData = new FormData();
    formData.append("registration_id", registration_id);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("ID", ID);
    formData.append("year_of_study", year_of_study);
    formData.append("profile_picture", profile_picture);

    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/signup/user-details`,
      headers: {
        // No need to set Content-Type for FormData, it will be set automatically
      },
      body: formData,
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

  static logout(email) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/logout?email=${encodeURIComponent(email)}`,
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

  static getUserById(userId) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/users/${encodeURIComponent(userId)}`,
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