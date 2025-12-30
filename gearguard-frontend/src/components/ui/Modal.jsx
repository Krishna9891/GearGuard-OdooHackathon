import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md', // sm, md, lg, xl
    footer
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-3xl',
        xl: 'max-w-5xl'
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
                onClick={onClose}
            >
                <div className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-[4px]" aria-hidden="true"></div>

                {/* Modal Panel */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    className={`inline-block align-bottom bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-[0_20px_25px_rgba(0,0,0,0.4)] transform transition-all sm:my-8 sm:align-middle w-full ${sizes[size]} animate-scale-up border border-gray-200 dark:border-slate-700`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-white dark:bg-slate-800 px-8 py-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center transition-colors duration-200">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100" id="modal-title">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="bg-white dark:bg-slate-800 rounded-lg text-gray-400 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 focus:outline-none p-2 transition-all duration-200"
                        >
                            <span className="sr-only">Close</span>
                            <FaTimes className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="bg-white dark:bg-slate-800 px-8 py-8 max-h-[calc(100vh-200px)] overflow-y-auto transition-colors duration-200 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="bg-gray-50 dark:bg-slate-900 px-8 py-5 border-t border-gray-200 dark:border-slate-700 flex flex-row-reverse gap-3 transition-colors duration-200">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
