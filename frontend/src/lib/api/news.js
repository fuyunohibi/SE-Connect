import { request } from "./index";
import { HTTP_METHODS } from "./const";

class NewsService {
  static createNews(newsData) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/create/news`,
      body: newsData,
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
