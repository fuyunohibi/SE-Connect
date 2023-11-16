import { request } from "./index";
import { HTTP_METHODS } from "./const";

class NewsService {
  static postNews(newsOptions) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/news/post`,
      body: newsOptions.body,
    };

    return request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static getAllNews() {
    const config = {
      method: HTTP_METHODS.get,
      url: `/news/feed`,
    };

    return request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default NewsService;
