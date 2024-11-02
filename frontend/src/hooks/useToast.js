import { useContext, useCallback } from 'react';
import { ToastContext } from '../contexts/ToastContext';

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast } = context;

  const showToast = useCallback(({
    type = 'info',
    message,
    title,
    duration = 3000,
    position = 'top-right',
    isClosable = true,
    onClose,
    action
  }) => {
    const id = Math.random().toString(36).substr(2, 9);

    const toast = {
      id,
      type,
      message,
      title,
      duration,
      position,
      isClosable,
      onClose,
      action
    };

    addToast(toast);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
        if (onClose) {
          onClose();
        }
      }, duration);
    }

    return id;
  }, [addToast, removeToast]);

  const updateToast = useCallback((id, updates) => {
    addToast(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, [addToast]);

  const closeToast = useCallback((id) => {
    removeToast(id);
  }, [removeToast]);

  // 미리 정의된 토스트 타입들
  const success = useCallback((message, options = {}) => {
    return showToast({
      type: 'success',
      message,
      icon: 'check_circle',
      ...options
    });
  }, [showToast]);

  const error = useCallback((message, options = {}) => {
    return showToast({
      type: 'error',
      message,
      icon: 'error',
      duration: 5000, // 에러는 좀 더 오래 보여줌
      ...options
    });
  }, [showToast]);

  const warning = useCallback((message, options = {}) => {
    return showToast({
      type: 'warning',
      message,
      icon: 'warning',
      ...options
    });
  }, [showToast]);

  const info = useCallback((message, options = {}) => {
    return showToast({
      type: 'info',
      message,
      icon: 'info',
      ...options
    });
  }, [showToast]);

  const loading = useCallback((message = '로딩 중...', options = {}) => {
    return showToast({
      type: 'loading',
      message,
      icon: 'hourglass_empty',
      duration: 0, // 로딩 토스트는 자동으로 사라지지 않음
      isClosable: false,
      ...options
    });
  }, [showToast]);

  const promise = useCallback((
    promise,
    {
      loading = '처리 중...',
      success = '완료되었습니다.',
      error = '오류가 발생했습니다.',
      ...options
    } = {}
  ) => {
    const toastId = showToast({
      type: 'loading',
      message: loading,
      duration: 0,
      isClosable: false,
      ...options
    });

    promise
      .then(() => {
        updateToast(toastId, {
          type: 'success',
          message: success,
          duration: 3000,
          isClosable: true
        });
      })
      .catch((err) => {
        updateToast(toastId, {
          type: 'error',
          message: typeof error === 'function' ? error(err) : error,
          duration: 5000,
          isClosable: true
        });
      });

    return promise;
  }, [showToast, updateToast]);

  return {
    showToast,
    updateToast,
    closeToast,
    success,
    error,
    warning,
    info,
    loading,
    promise
  };
}; 