// src/api/bookApi.js
import apiClient, { API_ENDPOINTS } from './apiConfig';

// 임시 더미 데이터 (백엔드 API 준비 전까지 사용)
const dummyBooks = [
  { id: 1, title: '보라공주와 일곱 난쟁이', author: '곽보라', price: 1100, views: 13240, image: '/assets/sample1.png', category: '로맨스' },
  { id: 2, title: '해리포터', author: '조하민', price: 1100, views: 15420, image: '/assets/sample1.png', category: '스릴러' },
  { id: 3, title: '미움받을용기', author: '이원준', price: 1100, views: 8830, image: '/assets/sample1.png', category: 'SF' },
  { id: 4, title: '하하엄마처럼 하하하', author: '장우진', price: 1100, views: 12650, image: '/assets/sample1.png', category: '에세이' },
  { id: 5, title: '정준하장가가기40일대작전', author: '김영진', price: 1100, views: 6420, image: '/assets/sample1.png', category: '자기계발' },
  { id: 6, title: '이기적유전자', author: '조은형', price: 1100, views: 21100, image: '/assets/sample1.png', category: '로맨스' },
  { id: 7, title: '20대 투자에 미쳐라', author: '정병찬', price: 1100, views: 18750, image: '/assets/sample1.png', category: '스릴러' },
  { id: 8, title: '개미', author: '이승환', price: 1100, views: 9340, image: '/assets/sample1.png', category: 'SF' },
  { id: 9, title: '수박은 장마철 이전이 맛있다', author: '윤성열', price: 1100, views: 7890, image: '/assets/sample1.png', category: '에세이' },
  { id: 10, title: '명탐정코난', author: '한기영', price: 1100, views: 24680, image: '/assets/sample1.png', category: '자기계발' },
];

export const bookApi = {
  // 도서 목록 조회 (카테고리별)
  getBooks: async (category = null) => {
    try {
      // TODO: 백엔드 API 연결
      // const response = await apiClient.get(`${API_ENDPOINTS.BOOKS}`, {
      //   params: category ? { category } : {}
      // });
      // return response.data;

      // 임시 더미 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 300)); // 네트워크 지연 시뮬레이션
      
      if (category) {
        return dummyBooks.filter(book => book.category === category);
      }
      return dummyBooks;
    } catch (error) {
      throw error.response?.data || { message: '도서 목록 조회 중 오류가 발생했습니다.' };
    }
  },

  // 특정 도서 조회
  getBook: async (bookId) => {
    try {
      // TODO: 백엔드 API 연결
      // const response = await apiClient.get(`${API_ENDPOINTS.BOOKS}/${bookId}`);
      // return response.data;

      // 임시 더미 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 200));
      const book = dummyBooks.find(b => b.id === parseInt(bookId));
      if (!book) {
        throw { message: '도서를 찾을 수 없습니다.' };
      }
      return {
        ...book,
        summary: '평범한 소년 해리가 마법의 세계에 발을 들이면서 시작되는 모험 이야기입니다. 호그와트 마법학교에서 친구들과 함께 성장하며, 어둠의 마법사와 맞서 싸우는 용기와 우정의 서사시입니다. 마법과 현실이 만나는 환상적인 세계에서 펼쳐지는 감동적인 성장담을 만나보세요.'
      };
    } catch (error) {
      throw error.response?.data || { message: '도서 조회 중 오류가 발생했습니다.' };
    }
  },

  // 도서 대여 신청
  rentBook: async (userId, bookId) => {
    try {
      // ApplySubscription 이벤트 발행
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