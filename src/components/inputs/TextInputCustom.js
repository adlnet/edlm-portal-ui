'use strict'

import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import Image from 'next/image';

export default function TextInputCustom({ 
    label,
    required = false,
    value,
    onChange,
    placeholder = "",
    disabled = false,
    showError = false,
    errorMessage = "",
}){

    const inputStyle = () => {
        if (showError) {
            return `text-sm border rounded-lg px-3 py-2.5 mt-1 bg-red-50 border-dark-red focus:outline-none focus:ring-2 focus:ring-dark-red ${value ? 'text-dark-red' : 'placeholder-dark-red'} `;
        }
        return `text-sm border rounded-lg px-3 py-2.5 mt-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-700 ${value ? 'text-gray-900' : ''}`;
    }

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <p>{label}</p>
                {required && <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />}
            </div>
            <input
                className={`${inputStyle()} ${disabled ? 'opacity-50' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
            {showError && (
                <p className="text-[#993033] text-sm mt-1">{errorMessage}</p>
            )}
        </>
    );
}