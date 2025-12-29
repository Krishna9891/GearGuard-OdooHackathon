import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon: Icon,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-1 hover:shadow-2 focus:ring-primary-500',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
        success: 'bg-success-600 text-white hover:bg-success-700 shadow-1 hover:shadow-2 focus:ring-success-500',
        danger: 'bg-danger-600 text-white hover:bg-danger-700 shadow-1 hover:shadow-2 focus:ring-danger-500',
        ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 hover:text-primary-700',
        icon: 'p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 rounded-full'
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5 rounded-md',
        md: 'text-sm px-4 py-2 rounded-lg',
        lg: 'text-base px-6 py-3 rounded-lg',
        icon: 'p-2'
    };

    const finalVariant = variants[variant] || variants.primary;
    const finalSize = variant === 'icon' ? sizes.icon : sizes[size];

    return (
        <button
            className={`${baseStyles} ${finalVariant} ${finalSize} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
            ) : Icon ? (
                <Icon className={`${children ? 'mr-2' : ''} ${size === 'lg' ? 'text-lg' : 'text-base'}`} />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
