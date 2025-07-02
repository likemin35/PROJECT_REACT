import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ManuscriptEditPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  
  const [manuscript, setManuscript] = useState({
    title: '',
    author: '',
    content: '',
    coverImage: null,
    status: 'draft' // draft, published, pending
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const [generatedCover, setGeneratedCover] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // 원고 데이터 로드 (더미 데이터)
  useEffect(() => {
    setTimeout(() => {
      setManuscript({
        title: '마법의 세계로 떠나는 여행',
        author: '김작가',
        content: `제1장 - 신비로운 시작

어두운 밤, 작은 마을에는 신비로운 일이 벌어지고 있었다.
주인공 아리는 할머니가 남겨주신 낡은 서재에서 고서를 발견하게 된다.

그 책을 펼치는 순간, 온 세상이 변했다.
평범했던 일상이 마법으로 가득한 새로운 세계로 바뀌었고,
아리는 자신도 모르게 모험의 한가운데에 서게 되었다.

제2장 - 첫 번째 만남

마법의 세계에서 아리가 처음 만난 것은 말하는 고양이였다.
"네가 바로 예언에서 말한 그 아이구나!" 고양이가 말했다.

아리는 혼란스러웠지만, 동시에 흥미로웠다.
이제 진짜 모험이 시작되는 것 같았다...`,
        coverImage: '/assets/sample3.png',
        status: 'draft'
      });
      setGeneratedCover({
        url: '/assets/sample3.png',
        prompt: '"마법의 세계로 떠나는 여행" 도서 커버 디자인',
        createdAt: '2025-01-15 14:30:25'
      });
      setIsLoading(false);
    }, 1500);
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManuscript({ ...manuscript, [name]: value });
  };

  const handleGenerateCover = () => {
    if (!manuscript.title) {
      alert('제목을 입력해주세요.');
      return;
    }

    setIsGeneratingCover(true);
    
    setTimeout(() => {
      setGeneratedCover({
        url: '/assets/sample' + (Math.floor(Math.random() * 12) + 1) + '.png',
        prompt: `"${manuscript.title}" 새로운 커버 디자인`,
        createdAt: new Date().toLocaleString()
      });
      setIsGeneratingCover(false);
      alert('새로운 AI 북커버가 생성되었습니다! 🎨');
    }, 3000);
  };

  const handleSave = async (type) => {
    if (!manuscript.title || !manuscript.author || !manuscript.content) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      if (type === 'temp') {
        alert('수정 사항이 임시 저장되었습니다! 💾');
      } else {
        alert('출판 신청이 완료되었습니다! 📚\n검토 후 연락드리겠습니다.');
      }
      navigate('/main');
    }, 2000);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 원고를 삭제하시겠습니까?\n삭제된 원고는 복구할 수 없습니다.')) {
      alert('원고가 삭제되었습니다.');
      navigate('/main');
    }
  };

  if (isLoading) {
    return (
      <div style={styles.pageContainer}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}>📚</div>
          <p style={styles.loadingText}>원고를 불러오는 중...</p>
          <div style={styles.loadingBar}>
            <div style={styles.loadingFill}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>
              <span style={styles.titleIcon}>🔧</span>
              원고 수정
            </h1>
            <div style={styles.statusBadge}>
              <span style={styles.statusIcon}>
                {manuscript.status === 'draft' && '📝'}
                {manuscript.status === 'pending' && '⏳'}
                {manuscript.status === 'published' && '✅'}
              </span>
              <span style={styles.statusText}>
                {manuscript.status === 'draft' && '작성중'}
                {manuscript.status === 'pending' && '심사중'}
                {manuscript.status === 'published' && '출간됨'}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.formContainer}>
          {/* 기본 정보 섹션 */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📝</span>
                기본 정보
              </h3>
            </div>
            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📖</span>
                  제목 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={manuscript.title}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>👤</span>
                  작가명 *
                </label>
                <input
                  type="text"
                  name="author"
                  value={manuscript.author}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* 현재 북커버 & AI 생성 섹션 */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>🎨</span>
                북커버 관리
              </h3>
              <div style={styles.coverActions}>
                <button
                  onClick={handleGenerateCover}
                  disabled={isGeneratingCover}
                  style={{
                    ...styles.generateButton,
                    ...(isGeneratingCover ? styles.disabledButton : {})
                  }}
                >
                  {isGeneratingCover ? (
                    <>
                      <span style={styles.spinner}>🎨</span>
                      생성 중...
                    </>
                  ) : (
                    <>
                      <span style={styles.buttonIcon}>🔄</span>
                      새 커버 생성
                    </>
                  )}
                </button>
                
                {generatedCover && (
                  <button
                    onClick={() => setGeneratedCover(null)}
                    style={styles.removeButton}
                  >
                    <span style={styles.buttonIcon}>🗑️</span>
                    커버 제거
                  </button>
                )}
              </div>
            </div>
            
            <div style={styles.coverSection}>
              <div style={styles.coverPreview}>
                {generatedCover ? (
                  <div style={styles.coverResult}>
                    <div style={styles.coverImageContainer}>
                      <img 
                        src={generatedCover.url} 
                        alt="현재 북커버" 
                        style={styles.coverImage}
                      />
                      <div style={styles.coverGlow}></div>
                    </div>
                    <div style={styles.coverInfo}>
                      <div style={styles.coverPrompt}>
                        <span style={styles.infoIcon}>🎯</span>
                        {generatedCover.prompt}
                      </div>
                      <div style={styles.coverTime}>
                        <span style={styles.infoIcon}>⏰</span>
                        {generatedCover.createdAt}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={styles.coverPlaceholder}>
                    {isGeneratingCover ? (
                      <>
                        <div style={styles.loadingAnimation}>
                          <div style={styles.loadingSpinner}>🎨</div>
                          <div style={styles.loadingText}>새로운 북커버를 생성하고 있습니다...</div>
                          <div style={styles.progressBar}>
                            <div style={styles.progressFill}></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={styles.placeholderIcon}>📖</div>
                        <div style={styles.placeholderText}>현재 설정된 북커버가 없습니다</div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 원고 내용 섹션 */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📚</span>
                원고 내용
              </h3>
              <div style={styles.wordCount}>
                <span style={styles.countIcon}>📊</span>
                {manuscript.content.length.toLocaleString()}자
              </div>
            </div>
            <textarea
              name="content"
              value={manuscript.content}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          {/* 액션 버튼들 */}
          <div style={styles.buttonSection}>
            <div style={styles.leftButtons}>
              <button
                onClick={handleDelete}
                style={styles.deleteButton}
              >
                <span style={styles.buttonIcon}>🗑️</span>
                삭제
              </button>
            </div>
            
            <div style={styles.rightButtons}>
              <button
                onClick={() => handleSave('temp')}
                disabled={isSaving}
                style={{
                  ...styles.saveButton,
                  ...styles.tempSaveButton,
                  ...(isSaving ? styles.disabledButton : {})
                }}
              >
                {isSaving ? (
                  <>
                    <span style={styles.spinner}>💾</span>
                    저장 중...
                  </>
                ) : (
                  <>
                    <span style={styles.buttonIcon}>💾</span>
                    수정 저장
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSave('publish')}
                disabled={isSaving || manuscript.status === 'published'}
                style={{
                  ...styles.saveButton,
                  ...styles.publishButton,
                  ...(isSaving || manuscript.status === 'published' ? styles.disabledButton : {})
                }}
              >
                {manuscript.status === 'published' ? (
                  <>
                    <span style={styles.buttonIcon}>✅</span>
                    출간됨
                  </>
                ) : isSaving ? (
                  <>
                    <span style={styles.spinner}>📤</span>
                    신청 중...
                  </>
                ) : (
                  <>
                    <span style={styles.buttonIcon}>📤</span>
                    출판 신청
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    color: 'white'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: 'sans-serif'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    gap: '1.5rem'
  },
  loadingSpinner: {
    fontSize: '4rem',
    animation: 'spin 2s linear infinite'
  },
  loadingText: {
    fontSize: '1.3rem',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  loadingBar: {
    width: '300px',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  loadingFill: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    animation: 'loading 2s ease-in-out infinite'
  },
  header: {
    marginBottom: '3rem'
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    margin: 0,
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  titleIcon: {
    fontSize: '3rem'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '1rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)'
  },
  statusIcon: {
    fontSize: '1.5rem'
  },
  statusText: {
    fontSize: '1.1rem',
    fontWeight: 'bold'
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '2.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  section: {
    marginBottom: '3rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem'
  },
  sectionIcon: {
    fontSize: '2rem'
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  labelIcon: {
    fontSize: '1.3rem'
  },
  input: {
    width: '100%',
    padding: '1.2rem 1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  },
  coverSection: {
    display: 'flex',
    justifyContent: 'center'
  },
  coverPreview: {
    width: '100%',
    maxWidth: '500px'
  },
  coverActions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  coverPlaceholder: {
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    padding: '3rem 2rem',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.02)',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem'
  },
  placeholderIcon: {
    fontSize: '4rem',
    opacity: 0.7
  },
  placeholderText: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  loadingAnimation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem'
  },
  progressBar: {
    width: '250px',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFill: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    animation: 'progress 2s ease-in-out infinite'
  },
  coverResult: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center'
  },
  coverImageContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '1.5rem'
  },
  coverImage: {
    width: '200px',
    height: 'auto',
    borderRadius: '12px',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
  },
  coverGlow: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    right: '5px',
    bottom: '5px',
    background: 'linear-gradient(135deg, #FFD700 0%, #8E24AA 100%)',
    borderRadius: '12px',
    opacity: 0.3,
    filter: 'blur(15px)',
    zIndex: 0
  },
  coverInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  coverPrompt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  coverTime: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },
  infoIcon: {
    fontSize: '1.1rem'
  },
  generateButton: {
    padding: '1rem 1.5rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)'
  },
  removeButton: {
    padding: '1rem 1.5rem',
    background: 'rgba(220, 53, 69, 0.2)',
    color: '#ff6b6b',
    border: '1px solid rgba(220, 53, 69, 0.3)',
    borderRadius: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease'
  },
  textarea: {
    width: '100%',
    minHeight: '500px',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  wordCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '0.5rem 1rem',
    borderRadius: '20px'
  },
  countIcon: {
    fontSize: '1.1rem'
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  leftButtons: {
    display: 'flex',
    gap: '1rem'
  },
  rightButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  deleteButton: {
    padding: '1.2rem 2rem',
    background: 'rgba(220, 53, 69, 0.2)',
    color: '#ff6b6b',
    border: '1px solid rgba(220, 53, 69, 0.3)',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    transition: 'all 0.3s ease'
  },
  saveButton: {
    padding: '1.3rem 2.5rem',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem'
  },
  tempSaveButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  publishButton: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
  },
  disabledButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    cursor: 'not-allowed',
    opacity: 0.6,
    boxShadow: 'none'
  },
  buttonIcon: {
    fontSize: '1.4rem'
  },
  spinner: {
    fontSize: '1.3rem',
    animation: 'spin 1s linear infinite'
  }
};

export default ManuscriptEditPage;

