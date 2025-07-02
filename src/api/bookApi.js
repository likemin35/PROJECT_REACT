// src/api/bookApi.js
import apiClient, { API_ENDPOINTS } from './apiConfig';

export const bookApi = {
  // 도서 목록 조회 (카테고리별)
  getBooks: async (category = null) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BOOKS}`, {
        params: category ? { category } : {}
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '도서 목록 조회 중 오류가 발생했습니다.' };
    }
  },

  // 특정 도서 조회
  getBook: async (bookId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BOOKS}/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '도서 조회 중 오류가 발생했습니다.' };
    }
  },

  // 도서 대여 신청
  rentBook: async (userId, bookId) => {
    try {
      const response = await apiClient.post('/events', {
        eventType: 'ApplySubscription',
        userId,
        bookId
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '도서 대여 신청 중 오류가 발생했습니다.' };
    }
  }
};