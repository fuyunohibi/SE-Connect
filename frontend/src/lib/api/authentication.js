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
    
    const config = {
      method: HTTP_METHODS.post,
      url: `/auth/signup/user-details`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        registration_id: registration_id,
        firstname: firstname,
        lastname: lastname,
        ID: ID,
        year_of_study: year_of_study,
        profile_picture: profile_picture,
      }
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