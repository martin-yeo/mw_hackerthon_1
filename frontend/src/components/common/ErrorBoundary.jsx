import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // 에러 로깅 서비스에 에러 보고
    if (process.env.NODE_ENV === 'production') {
      // 예: Sentry, LogRocket 등의 에러 로깅 서비스 호출
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <i className="material-icons error-icon">error_outline</i>
            <h1>앗! 문제가 발생했습니다.</h1>
            
            <p className="error-message">
              예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="error-details">
                <h3>오류 상세:</h3>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <h3>컴포넌트 스택:</h3>
                <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
              </div>
            )}

            <div className="error-actions">
              <button 
                className="retry-button"
                onClick={this.handleRetry}
              >
                <i className="material-icons">refresh</i>
                다시 시도
              </button>
              
              <button 
                className="home-button"
                onClick={() => window.location.href = '/'}
              >
                <i className="material-icons">home</i>
                홈으로 이동
              </button>
            </div>
          </div>

          <style jsx>{`
            .error-boundary {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
              background-color: #f8f9fa;
            }

            .error-content {
              text-align: center;
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              width: 100%;
            }

            .error-icon {
              font-size: 64px;
              color: #dc3545;
              margin-bottom: 20px;
            }

            .error-message {
              color: #666;
              margin: 20px 0;
            }

            .error-details {
              text-align: left;
              margin: 20px 0;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 4px;
              overflow-x: auto;
            }

            .error-details pre {
              margin: 10px 0;
              white-space: pre-wrap;
              word-break: break-word;
            }

            .error-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              margin-top: 24px;
            }

            button {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 12px 24px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              transition: background-color 0.2s;
            }

            .retry-button {
              background-color: #800020;
              color: white;
            }

            .retry-button:hover {
              background-color: #600018;
            }

            .home-button {
              background-color: #6c757d;
              color: white;
            }

            .home-button:hover {
              background-color: #5a6268;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
} 