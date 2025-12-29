import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Input = ({
    type = 'text',
    label,
    error,
    icon: Icon,
    className = '',
    containerClassName = '',
    required,
    options = [], // For select
    ...props
}) => {
    const baseInputStyles = `
    block w-full rounded-lg border border-gray-300 dark:border-slate-600 shadow-sm
    focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/20 focus:bg-white dark:focus:bg-slate-800
    disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-500 disabled:cursor-not-allowed
    text-sm px-4 py-3 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200
    bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 hover:border-gray-400 dark:hover:border-slate-500 outline-none
  `;

    const errorStyles = 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20';
    const iconPadding = Icon ? 'pl-10' : '';

    const renderField = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    className={`${baseInputStyles} ${error ? errorStyles : ''} ${className} min-h-[120px] resize-y`}
                    {...props}
                />
            );
        }

        if (type === 'select') {
            return (
                <select
                    className={`${baseInputStyles} ${error ? errorStyles : ''} ${className}`}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200 py-2">
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="text-gray-400 dark:text-slate-500" size={20} />
                    </div>
                )}
                <input
                    type={type}
                    className={`${baseInputStyles} ${iconPadding} ${error ? errorStyles : ''} ${className}`}
                    {...props}
                />
            </div>
        );
    };

    return (
        <div className={`mb-4 ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
                    {label} {required && <span className="text-danger-500 ml-0.5">*</span>}
                </label>
            )}
            {renderField()}
            {error && (
                <p className="mt-1 text-xs text-danger-600 dark:text-danger-400 flex items-center animate-fade-in">
                    <FaExclamationCircle className="mr-1" /> {error}
                </p>
            )}
        </div>
    );
};

export default Input;
