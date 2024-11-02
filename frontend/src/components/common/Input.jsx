import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

export const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  icon,
  fullWidth = false,
  required = false,
  disabled = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`input-container ${containerClassName} ${fullWidth ? 'full-width' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div className={`input-wrapper ${error ? 'has-error' : ''} ${icon ? 'has-icon' : ''}`}>
        {icon && (
          <i className="material-icons input-icon">{icon}</i>
        )}
        
        <input
          {...props}
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          disabled={disabled}
          className={`input-field ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      </div>

      {(error || helperText) && (
        <div 
          className={`input-message ${error ? 'error' : ''}`}
          id={error ? `${inputId}-error` : undefined}
        >
          {error || helperText}
        </div>
      )}

      <style jsx>{`
        .input-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .full-width {
          width: 100%;
        }

        .input-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .required-mark {
          color: var(--burgundy-red);
          margin-left: 0.25rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1rem;
          color: var(--text-primary);
          background-color: var(--background-paper);
          transition: all 0.2s;
        }

        .has-icon .input-field {
          padding-left: 2.5rem;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--burgundy-red);
          box-shadow: 0 0 0 2px rgba(var(--burgundy-red-rgb), 0.1);
        }

        .input-field:disabled {
          background-color: var(--background-disabled);
          cursor: not-allowed;
          opacity: 0.7;
        }

        .has-error .input-field {
          border-color: var(--error-color);
        }

        .has-error .input-field:focus {
          box-shadow: 0 0 0 2px rgba(var(--error-color-rgb), 0.1);
        }

        .input-message {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .input-message.error {
          color: var(--error-color);
        }

        /* Input types */
        .input-field[type="date"],
        .input-field[type="time"],
        .input-field[type="datetime-local"] {
          min-height: 2.5rem;
        }

        .input-field[type="number"] {
          -moz-appearance: textfield;
        }

        .input-field[type="number"]::-webkit-outer-spin-button,
        .input-field[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Password visibility toggle */
        .input-wrapper.password {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0;
        }

        .password-toggle:hover {
          color: var(--text-primary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .input-field {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  id: PropTypes.string
};

// Password Input 컴포넌트
export const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="password-input-wrapper">
      <Input
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        icon="lock"
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex="-1"
      >
        <i className="material-icons">
          {showPassword ? 'visibility_off' : 'visibility'}
        </i>
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput'; 