import { request } from "./index";
import { HTTP_METHODS } from "./const";

class RoomBooking {
  static requestBooking(options) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/reservation/request`,
      body: options.body,
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

  static getAllReservations() {
    const config = {
      method: HTTP_METHODS.get,
      url: `/reservation/all`,
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
  static getLatestUserReservation(firstname,lastname) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/reservation/latest/${firstname}/${lastname}`,
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

export default RoomBooking;
