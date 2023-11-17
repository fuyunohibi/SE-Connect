import { request } from "./index";
import { HTTP_METHODS } from "./const";

class LockerBooking {
  static requestLockerBooking(options) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/reservation/locker/request`,
      body: {
        ...options,
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

  static getAllLockerReservation() {
    const config = {
      method: HTTP_METHODS.get,
      url: `/reservation/locker/all`,
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

export default LockerBooking;
