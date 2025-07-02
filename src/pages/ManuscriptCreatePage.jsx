import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ManuscriptCreatePage = () => {
  const navigate = useNavigate();
  const [manuscript, setManuscript] = useState({
    title: '',
    author: '',
    content: ''
  });
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const [generatedCover, setGeneratedCover] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
    
    // AI 북커버 생성 시뮬레이션
    setTimeout(() => {
      setGeneratedCover({
        url: '/assets/sample1.png', // 임시 이미지
        prompt: `"${manuscript.title}" 도서 커버 디자인`,
        createdAt: new Date().toLocaleString()
      });
      setIsGeneratingCover(false);
      alert('AI 북커버가 생성되었습니다! 🎨');
    }, 3000);
  };

  const handleSave = async (type) => {
    if (!manuscript.title || !manuscript.author || !manuscript.content) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSaving(true);

    // 저장 시뮬레이션
    setTimeout(() => {
      setIsSaving(false);
      if (type === 'temp') {
        alert('임시 저장이 완료되었습니다! 💾');
      } else {
        alert('출판 신청이 완료되었습니다! 📚\n검토 후 연락드리겠습니다.');
      }
      navigate('/main');
    }, 2000);
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.titleIcon}>✍️</span>
            새 원고 작성
          </h1>
          <p style={styles.subtitle}>나만의 이야기를 세상과 공유해보세요</p>
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
                  placeholder="매력적인 제목을 입력하세요"
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
                  placeholder="작가명을 입력하세요"
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* AI 북커버 생성 섹션 */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>🎨</span>
                AI 북커버 생성
              </h3>
              <button
                onClick={handleGenerateCover}
                disabled={isGeneratingCover || !manuscript.title}
                style={{
                  ...styles.generateButton,
                  ...(isGeneratingCover || !manuscript.title ? styles.disabledButton : {})
                }}
              >
                {isGeneratingCover ? (
                  <>
                    <span style={styles.spinner}>🎨</span>
                    생성 중...
                  </>
                ) : (
                  <>
                    <span style={styles.buttonIcon}>🤖</span>
                    AI 북커버 생성
                  </>
                )}
              </button>
            </div>
            
            <div style={styles.coverSection}>
              <div style={styles.coverPreview}>
                {generatedCover ? (
                  <div style={styles.coverResult}>
                    <div style={styles.coverImageContainer}>
                      <img 
                        src={generatedCover.url} 
                        alt="생성된 북커버" 
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
                          <div style={styles.loadingText}>AI가 북커버를 생성하고 있습니다...</div>
                          <div style={styles.progressBar}>
                            <div style={styles.progressFill}></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={styles.placeholderIcon}>📖</div>
                        <div style={styles.placeholderText}>
                          AI가 생성한 북커버가 여기에 표시됩니다
                        </div>
                        <div style={styles.placeholderSubtext}>
                          제목을 입력한 후 'AI 북커버 생성' 버튼을 클릭하세요
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 원고 작성 섹션 */}
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
              placeholder="여기에 원고를 작성해주세요...

예시:
제1장 - 시작

어두운 밤, 작은 마을에는 신비로운 일이 벌어지고 있었다.
주인공은 낡은 서재에서 고서를 발견하게 되는데..."
              style={styles.textarea}
            />
          </div>

          {/* 저장 버튼들 */}
          <div style={styles.buttonSection}>
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
                  임시 저장
                </>
              )}
            </button>
            
            <button
              onClick={() => handleSave('publish')}
              disabled={isSaving}
              style={{
                ...styles.saveButton,
                ...styles.publishButton,
                ...(isSaving ? styles.disabledButton : {})
              }}
            >
              {isSaving ? (
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
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    margin: '0 0 1rem 0',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  titleIcon: {
    fontSize: '3rem'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0
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
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500'
  },
  placeholderSubtext: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },
  loadingAnimation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem'
  },
  loadingSpinner: {
    fontSize: '4rem',
    animation: 'spin 2s linear infinite'
  },
  loadingText: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)'
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
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)'
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
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem'
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

// CSS 애니메이션 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes progress {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
  
  .manuscript-input:focus {
    border-color: rgba(142, 36, 170, 0.5);
    box-shadow: 0 0 0 3px rgba(142, 36, 170, 0.1);
  }
  
  .manuscript-textarea:focus {
    border-color: rgba(142, 36, 170, 0.5);
    box-shadow: 0 0 0 3px rgba(142, 36, 170, 0.1);
  }
  
  .save-button:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  .temp-save-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .publish-button:hover:not(:disabled) {
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
  }
  
  .generate-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(142, 36, 170, 0.4);
  }
`;
document.head.appendChild(styleSheet);

export default ManuscriptCreatePage;