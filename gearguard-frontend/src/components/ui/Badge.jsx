import React from 'react';
import { FaStar, FaGem, FaCircle } from 'react-icons/fa';

const Badge = ({
    variant = 'status',
    type = 'info', // info, success, warning, danger, neutral
    icon,
    children,
    className = '',
    ...props
}) => {
    // Status Pill Styles
    const statusStyles = {
        base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border',
        info: 'bg-info-50 text-info-700 border-info-200',
        success: 'bg-success-50 text-success-700 border-success-200',
        warning: 'bg-warning-50 text-warning-700 border-warning-200',
        danger: 'bg-danger-50 text-danger-700 border-danger-200',
        neutral: 'bg-gray-100 text-gray-700 border-gray-200'
    };

    // Priority Square Styles
    const priorityStyles = {
        base: 'inline-flex items-center justify-center p-1.5 rounded-md text-white shadow-sm',
        critical: 'bg-danger-600 animate-pulse-slow',
        high: 'bg-warning-600',
        medium: 'bg-primary-500',
        low: 'bg-gray-400'
    };

    if (variant === 'priority') {
        const priorityConfig = {
            critical: { icon: FaGem, style: priorityStyles.critical },
            high: { icon: FaStar, style: priorityStyles.high },
            medium: { icon: FaCircle, style: priorityStyles.medium },
            low: { icon: null, style: priorityStyles.low } // Minus icon can be added
        };

        const config = priorityConfig[type] || priorityConfig.medium;
        const IconComponent = config.icon;

        return (
            <span className={`${priorityStyles.base} ${config.style} ${className}`} title={`Priority: ${type}`}>
                {IconComponent && <IconComponent className="text-xs" />}
                {!IconComponent && <span className="text-xs font-bold">-</span>}
            </span>
        );
    }

    // Count Badge (Notification/Smart Button)
    if (variant === 'count') {
        return (
            <span className={`absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 bg-danger-500 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm animate-pulse-scale ${className}`}>
                {children}
            </span>
        );
    }

    // Default Status Pill
    return (
        <span className={`${statusStyles.base} ${statusStyles[type]} ${className}`}>
            {icon && <span className="mr-1.5">{icon}</span>}
            {children}
        </span>
    );
};

export default Badge;
