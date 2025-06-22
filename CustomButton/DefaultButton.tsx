import React from 'react';

interface DefaultButtonProps {
    className?: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'large';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    label?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
    className,
    variant = 'primary',
    size,
    onClick,
    label,
    isLoading = false,
    disabled,
}) => {
    if (isLoading) {
        return (
            <button
                type="button"
                aria-label="loadingBtn"
                disabled
                className={`default-btn default-btn--secondary ${size && `default-btn--${size}`} text-center ${className}`}
            >
                <div className="loader" style={{ margin: '20px auto' }} />
            </button>
        );
    }

    return (
        <button
            type="button"
            className={`default-btn ${variant === 'secondary' && 'default-btn--secondary'} ${size && `default-btn--${size}`} text-center ${className} ${disabled && 'btn--disabled'}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default DefaultButton;
