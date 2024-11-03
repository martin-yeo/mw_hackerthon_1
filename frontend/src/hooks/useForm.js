import { useState, useCallback } from 'react';

export const useForm = ({
  initialValues = {},
  validate = {},
  onSubmit = () => {}
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 필드 값 변경 핸들러
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // 해당 필드에 대한 에러 메시지 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // 필드 블러 핸들러
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // 해당 필드에 대한 유효성 검사 실행
    if (validate[name]) {
      const fieldError = validate[name](values[name], values);
      if (fieldError) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldError
        }));
      }
    }
  }, [values, validate]);

  // 전체 폼 유효성 검사
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validate).forEach(key => {
      const fieldError = validate[key](values[key], values);
      if (fieldError) {
        newErrors[key] = fieldError;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validate]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // 모든 필드를 touched로 표시
    const allTouched = Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    // 유효성 검사
    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      // API 에러 처리
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          submit: error.message || '폼 제출 중 오류가 발생했습니다.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  // 특정 필드 값 설정
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // 특정 필드 에러 설정
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // 폼 초기화
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm
  };
};

// 사용 예시:
/*
const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validate: {
    email: (value) => {
      if (!value) return '이메일을 입력해주세요.';
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return '올바른 이메일 형식이 아닙니다.';
      }
    },
    password: (value) => {
      if (!value) return '비밀번호를 입력해주세요.';
      if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
    }
  },
  onSubmit: async (values) => {
    await login(values);
  }
});
*/ 