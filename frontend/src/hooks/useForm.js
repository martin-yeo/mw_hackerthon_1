import { useState, useCallback, useEffect } from 'react';

export const useForm = ({
  initialValues = {},
  validate = {},
  onSubmit = () => {},
  validateOnChange = false,
  validateOnBlur = true
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 초기화
  useEffect(() => {
    setValues(initialValues);
  }, [JSON.stringify(initialValues)]);

  // 유효성 검사 실행
  const validateField = useCallback((name, value) => {
    if (!validate[name]) return '';

    const validateFn = validate[name];
    if (typeof validateFn === 'function') {
      return validateFn(value, values);
    }
    return '';
  }, [validate, values]);

  // 전체 폼 유효성 검사
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(validate).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validate, validateField, values]);

  // 입력값 변경 처리
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (validateOnChange) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField, validateOnChange]);

  // blur 이벤트 처리
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    if (validateOnBlur) {
      const error = validateField(name, values[name]);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField, validateOnBlur, values]);

  // 폼 제출 처리
  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitting(true);
    const isValid = validateForm();

    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    setIsSubmitting(false);
  }, [validateForm, values, onSubmit]);

  // 특정 ��드 값 설정
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    if (validateOnChange) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField, validateOnChange]);

  // 특정 필드 에러 설정
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // 특정 필드 터치 상태 설정
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({
      ...prev,
      [name]: isTouched
    }));
  }, []);

  // 폼 초기화
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
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
    setFieldTouched,
    resetForm,
    validateForm,
    validateField
  };
}; 