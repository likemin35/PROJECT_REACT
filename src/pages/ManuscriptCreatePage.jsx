import React, { useState } from 'react';
import ManuscriptForm from '../components/ManuscriptForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManuscriptCreatePage = () => {
  const [manuscript, setManuscript] = useState({
    title: '',
    content: '',
    authorId: 'author001' // ✨ 임시 테스트용 ID
  });

  const navigate = useNavigate();

  // 임시 저장
  const handleSave = async () => {
    try {
      await axios.post('/manuscripts', manuscript);
      alert('임시 저장 성공!');
      navigate('/');
    } catch (error) {
      console.error('임시 저장 실패', error);
      alert('임시 저장 실패');
    }
  };

  // 출간 요청
  const handlePublish = async () => {
    try {
      await axios.post('/manuscripts', manuscript);

      const getRes = await axios.get('/manuscripts');
      const matched = getRes.data.find(
        (m) => m.title === manuscript.title && m.authorId.id === manuscript.authorId
      );
      if (!matched) throw new Error('등록된 원고를 찾을 수 없습니다.');

      await axios.post(`/manuscripts/${matched.bookId}/request-publish`, {
        summary: '임시 줄거리입니다.'
      });

      alert('출간 요청 성공!');
      navigate('/');
    } catch (error) {
      console.error('출간 요청 실패', error);
      alert('출간 요청 실패');
    }
  };

  return (
    <ManuscriptForm
      manuscript={manuscript}
      setManuscript={setManuscript}
      onSave={handleSave}
      onSubmit={handlePublish}
    />
  );
};

export default ManuscriptCreatePage;