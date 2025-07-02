// src/api/pointApi.js
import apiClient, { API_ENDPOINTS } from './apiConfig';

export const pointApi = {
  // 포인트 조회
  getPoints: async (userId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.POINTS}/search`, {
        params: { userId, isSubscription: false }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '포인트 조회 중 오류가 발생했습니다.' };
    }
  },

  // 포인트 충전
  chargePoints: async (userId, amount) => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.POINTS}/charge`, {
        userId,
        amount
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '포인트 충전 중 오류가 발생했습니다.' };
    }
  },

  // 포인트 사용
  usePoints: async (userId, amount, isSubscription = false) => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.POINTS}/use`, {
        userId,
        amount,
        isSubscription
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '포인트 사용 중 오류가 발생했습니다.' };
    }
  }
};