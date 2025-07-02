// src/api/apiConfig.js
import axios from 'axios';

// API Gateway 기본 URL
const API_BASE_URL = 'http://localhost:8088';

// 각 서비스별 base URL
export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/auth`,
  POINTS: `${API_BASE_URL}/points`,
  AUTHORS: `${API_BASE_URL}/authors`,
  MANUSCRIPTS: `${API_BASE_URL}/manuscripts`,
  USERS: `${API_BASE_URL}/users`,
  SUBSCRIPTIONS: `${API_BASE_URL}/subscriptions`,
  BOOKS: `${API_BASE_URL}/books`,
};

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰이 있으면 헤더에 추가)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;