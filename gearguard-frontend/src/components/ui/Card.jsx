import React from 'react';

const Card = ({
    variant = 'base',
    padding = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'bg-white dark:bg-gray-800 transition-all duration-200';

    const variants = {
        base: 'rounded-xl border border-gray-200 dark:border-gray-600 shadow-1 hover:shadow-2 bg-white dark:bg-gray-700 transition-colors duration-200',
        glass: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/40 dark:border-gray-600/50 shadow-xl rounded-xl',
        equipment: 'rounded-2xl border border-gray-200 dark:border-gray-600 shadow-1 hover:-translate-y-1 hover:shadow-3 hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-gray-700 transition-all duration-200',
        kanban: 'rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-1 hover:shadow-2 cursor-grab active:cursor-grabbing bg-white dark:bg-gray-700 transition-colors duration-200',
        stat: 'rounded-2xl shadow-2 border-none bg-gradient-to-br from-primary-50 to-white dark:from-gray-700 dark:to-gray-800'
    };

    const paddings = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
