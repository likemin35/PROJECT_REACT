import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getManuscriptById, updateManuscript } from '../api/manuscriptApi';
import ManuscriptForm from '../components/ManuscriptForm';

const ManuscriptEditPage = () => {
  const { bookId } = useParams(); 
  const navigate = useNavigate();
  const [manuscript, setManuscript] = useState(null);

  // 원고 불러오기
  useEffect(() => {
    getManuscriptById(bookId)
      .then((res) => setManuscript(res.data)) 
      .catch((err) => {
        alert('원고를 불러오는 데 실패했습니다.');
        console.error(err);
      });
  }, [bookId]);

  // 수정 후 저장 처리
  const handleUpdate = async () => {
    try {
      await updateManuscript(bookId, manuscript);
      alert('수정이 완료되었습니다.');
      navigate('/'); 
    } catch (err) {
      alert('수정 중 오류 발생');
      console.error(err);
    }
  };

  if (!manuscript) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>✏️ 원고 수정</h2>
      <ManuscriptForm
        manuscript={manuscript}
        setManuscript={setManuscript}
        onSubmit={handleUpdate} 
      />
    </div>
  );
};

export default ManuscriptEditPage;