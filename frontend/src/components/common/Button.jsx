import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClass = 'button';
  const classes = [
    baseClass,
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? 'button-full' : '',
    loading ? 'button-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="button-spinner" />
      ) : (
        <>
          {icon && <i className="material-icons">{icon}</i>}
          {children}
        </>
      )}

      <style jsx>{`
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-family: 'Noto Sans KR', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .button-primary {
          background-color: var(--burgundy-red);
          color: white;
        }

        .button-secondary {
          background-color: var(--burgundy-gray);
          color: white;
        }

        .button-outline {
          background-color: transparent;
          border: 1px solid var(--burgundy-red);
          color: var(--burgundy-red);
        }

        .button-text {
          background-color: transparent;
          color: var(--burgundy-red);
          padding: 0.5rem;
        }

        .button-small {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        .button-large {
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        }

        .button-full {
          width: 100%;
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .button-loading {
          position: relative;
          color: transparent;
        }

        .button-spinner {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .button:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
}; 