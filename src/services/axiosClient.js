import axios from "axios";

const BaseUrl = "http://localhost:5000";
// const BaseUrl = "https://stardy-backend.herokuapp.com"
// const BaseUrl = process.env.REACT_APP_API_HOST

/**
 * デフォルト config の設定
 */
export const axiosClient = axios.create({
  baseURL: BaseUrl,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * リクエスト インターセプター
 */
axiosClient.interceptors.request.use((config) => {
  if (config.headers !== undefined) {
    // --ヘッダにアクセストークンを埋める
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
  }
  return config;
});

/**
 * レスポンス インターセプター
 */
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response?.status) {
      case 401:
        // なにかする
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);
