import React, { useState, useEffect } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useToast } from '../../hooks/useToast';
import { api } from '../../utils/api';

export const GOOGLE_CALENDAR_CONFIG = {
  API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  CALENDAR_ID: process.env.REACT_APP_GOOGLE_CALENDAR_ID
};

export const GoogleCalendarSettings = () => {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    clientId: '',
    clientSecret: '',
    redirectUri: '',
    apiKey: ''
  });
  const [loading, setLoading] = useState(false);

  // 기존 설정 불러오기
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api.get('/admin/settings/google-calendar');
        setSettings(response.data);
      } catch (error) {
        showToast({
          type: 'error',
          message: '설정을 불러오는데 실패했습니다.'
        });
      }
    };
    loadSettings();
  }, []);

  // 설정 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/admin/settings/google-calendar', settings);
      showToast({
        type: 'success',
        message: '구글 캘린더 설정이 저장되었습니다.'
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: '설정 저장에 실패했습니다.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-calendar-settings">
      <h2>구글 캘린더 설정</h2>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Client ID"
          value={settings.clientId}
          onChange={(e) => setSettings({...settings, clientId: e.target.value})}
          required
          fullWidth
        />

        <Input
          label="Client Secret"
          type="password"
          value={settings.clientSecret}
          onChange={(e) => setSettings({...settings, clientSecret: e.target.value})}
          required
          fullWidth
        />

        <Input
          label="Redirect URI"
          value={settings.redirectUri}
          onChange={(e) => setSettings({...settings, redirectUri: e.target.value})}
          required
          fullWidth
          helperText="예: http://your-domain/auth/google/callback"
        />

        <Input
          label="API Key"
          value={settings.apiKey}
          onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
          required
          fullWidth
        />

        <div className="button-group">
          <Button
            type="submit"
            loading={loading}
            fullWidth
          >
            설정 저장
          </Button>
        </div>
      </form>

      <div className="help-text">
        <h3>설정 방법</h3>
        <ol>
          <li>Google Cloud Console에서 새 프로젝트를 생성합니다.</li>
          <li>Google Calendar API를 활성화합니다.</li>
          <li>사용자 인증 정보를 생성하여 위 정보들을 얻습니다.</li>
          <li>승인된 리디렉션 URI에 위 Redirect URI를 추가합니다.</li>
        </ol>
      </div>

      <style jsx>{`
        .google-calendar-settings {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        h2 {
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .button-group {
          margin-top: 1rem;
        }

        .help-text {
          background-color: var(--background-paper);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .help-text h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .help-text ol {
          margin: 0;
          padding-left: 1.5rem;
          color: var(--text-secondary);
        }

        .help-text li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}; 